import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** the base url of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
});

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const resetPassword = authClient.resetPassword;
export const verifyEmail = authClient.verifyEmail;
