import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface SignUpWithEmailParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useSignUpWithEmail() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpWithEmail = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignUpWithEmailParams) => {
    await signUp.email({
      email,
      password,
      name: `${firstName} ${lastName}`,
      callbackURL: "/url",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          router.push("/url");
        },
      },
    });
  };

  return { signUpWithEmail, loading };
}
