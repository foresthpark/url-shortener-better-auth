import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { auth } from "@/lib/auth";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
// Create context for tRPC requests
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  return {
    session,
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
