"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UrlRow from "@/components/url/UrlRow";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
// Define the form schema

export default function UrlPage() {
  // Use tRPC query to fetch URL lis
  const { data: session } = authClient.useSession();

  const { data: userUrls, isLoading } = trpc.url.urlList.useQuery();

  const isLoggedIn = !!session?.user;

  return (
    <div className="mt-10 p-6 bg-white rounded-lg w-full">
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
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border rounded-md gap-4"
                  >
                    <div className="overflow-hidden flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {userUrls?.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    You haven&apos;t created any short URLs yet.
                  </p>
                )}
                <div className="space-y-3">
                  {userUrls?.map((item) => (
                    <UrlRow
                      key={item.id}
                      id={item.id}
                      shortUrl={item.shortUrl}
                      url={item.url}
                      clicks={item.clicks ?? 0}
                      mobileClicks={item.mobileClicks ?? 0}
                    />
                  ))}
                </div>
              </>
            )}
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
