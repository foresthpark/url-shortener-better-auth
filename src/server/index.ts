import { db } from "@/db/db";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import { url } from "@/db/schema";

// Define the router with your procedures
export const appRouter = router({
  urlList: publicProcedure.query(async () => {
    // Assuming your schema has a 'url' table
    const urls = await db.select().from(url);

    return urls;
  }),

  addUrl: publicProcedure
    .input(
      z.object({
        url: z.string().url("Please enter a valid URL"),
      })
    )
    .mutation(async ({ input }) => {
      const shortId = nanoid(8);

      // Insert the URL into the database
      await db.insert(url).values({
        id: nanoid(),
        url: input.url,
        shortUrl: shortId,
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
