import { AppRouter } from "@/server/index";
import { createTRPCProxyClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
// Create a server-side caller with empty context

export const serverClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});
