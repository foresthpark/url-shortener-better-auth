import { appRouter } from "@/server/index";

// Create a server-side caller with empty context
export const serverClient = appRouter.createCaller({});
