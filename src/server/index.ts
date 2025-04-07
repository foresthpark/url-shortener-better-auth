import { db } from "@/db/db";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { url } from "@/db/schema";
import { eq } from "drizzle-orm";
// Define the router with your procedures
export const appRouter = router({
  urlList: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    // Assuming your schema has a 'url' table
    const urls = await db
      .select()
      .from(url)
      .where(userId ? eq(url.userId, userId) : undefined);

    return urls;
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

// Export type router type signature,
// NOT the router itself
export type AppRouter = typeof appRouter;
