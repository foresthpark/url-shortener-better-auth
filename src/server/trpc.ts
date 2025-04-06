import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
// Create context for tRPC requests
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    // You can add user session, headers, etc. here
  };
};

// Initialize tRPC
const t = initTRPC.context<typeof createTRPCContext>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
