import { router } from "./trpc";
import { urlRouter } from "./routes/urls";

// Define the router with your procedures
export const appRouter = router({
  url: urlRouter,
  // Add other routers here
});

// Export type router type signature,
// NOT the router itself
export type AppRouter = typeof appRouter;
