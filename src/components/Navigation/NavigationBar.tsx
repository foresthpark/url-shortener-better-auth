"use client";
import { LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginButton from "../auth/LoginButton";
import { Button } from "../ui/button";
export default function NavigationBar() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold">ShortLink</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Link href="/my-urls">My Urls</Link>
          </Button>
          {/* <Button variant="ghost" size="sm">
            Pricing
          </Button> */}
          {/* <Button variant="ghost" size="sm">
            Docs
          </Button>
          <Button variant="outline" size="sm">
            Log in
          </Button> */}
          {/* <Button size="sm">Sign up</Button> */}
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
