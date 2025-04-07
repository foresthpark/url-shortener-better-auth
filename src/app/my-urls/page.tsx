"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { Copy } from "lucide-react";
import { toast } from "sonner";
// Define the form schema

export default function UrlPage() {
  // Use tRPC query to fetch URL list
  const { data: session } = authClient.useSession();

  const { data: userUrls } = trpc.urlList.useQuery();

  const isLoggedIn = !!session?.user;

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md w-full h-full">
      <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>

      {isLoggedIn && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Your Shortened URLs</CardTitle>
            <CardDescription>
              All your shortened URLs in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userUrls?.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                You haven&apos;t created any short URLs yet.
              </p>
            )}
            <div className="space-y-3">
              {userUrls?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{item.shortUrl}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.url}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/api/url/${item.shortUrl}`
                        );
                        toast.success("URL copied to clipboard");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              {!isLoggedIn
                ? "Log in to save your shortened URLs."
                : "Your URLs are saved to your account."}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
