import { z } from "zod";
import { nanoid } from "nanoid";
import { db } from "@/db/db";
import { url } from "@/db/schema";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "../trpc";

export const urlRouter = router({
  urlList: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    // Assuming your schema has a 'url' table
    const urls = await db
      .select()
      .from(url)
      .where(userId ? eq(url.userId, userId) : undefined);

    return urls;
  }),
  deleteUrl: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new Error("User not found");
      }

      await db.delete(url).where(eq(url.id, input.id));
    }),

  updateUrl: publicProcedure
    .input(z.object({ shortUrl: z.string(), url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new Error("User not found");
      }

      await db
        .update(url)
        .set({ url: input.url })
        .where(eq(url.shortUrl, input.shortUrl));
    }),

  createUrl: publicProcedure
    .input(
      z.object({
        url: z.string().url("Please enter a valid URL"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const shortId = nanoid(8);
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new Error("User not found");
      }

      // Insert the URL into the database
      await db.insert(url).values({
        id: nanoid(),
        url: input.url,
        shortUrl: shortId,
        userId,
      });

      return {
        success: true,
        shortUrl: shortId,
      };
    }),
});
