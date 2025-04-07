import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      {session ? (
        <Button className="cursor-pointer" onClick={() => authClient.signOut()}>
          Sign Out
        </Button>
      ) : (
        <Button className="cursor-pointer">
          <Link href="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
}
