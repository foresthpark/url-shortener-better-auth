"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { Check, Copy, LinkIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateShortUrl() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session } = authClient.useSession();

  const isLoggedIn = !!session?.user;

  const createUrlMutation = trpc.createUrl.useMutation({
    onSuccess: (data) => {
      setShortUrl(data.shortUrl);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    setIsLoading(true);

    // Mock shortening - just for UI demonstration
    setTimeout(() => {
      const shortCode = Math.random().toString(36).substring(2, 8);
      setShortUrl(`short.link/${shortCode}`);
      setIsLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Short URL copied to clipboard");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 -z-10" />
      <div className="container px-4 py-20 mx-auto text-center md:py-32 md:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Shorten your links,{" "}
          <span className="text-primary">expand your reach</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-xl text-muted-foreground">
          Create short, memorable links in seconds. Track clicks, analyze data,
          and optimize your online presence.
        </p>

        {/* URL Shortener Form */}
        <div className="max-w-3xl p-4 mx-auto mt-10 bg-background rounded-xl shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:flex-row"
          >
            <div className="relative flex-1">
              <LinkIcon className="absolute w-5 h-5 text-muted-foreground left-3 top-3" />
              <Input
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 h-12"
                required
              />
            </div>
            <Button type="submit" className="h-12" disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>
          </form>

          {/* Result */}
          {shortUrl && (
            <div className="p-4 mt-4 border rounded-lg bg-muted/30">
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Your shortened URL:
                  </p>
                  <p className="text-lg font-medium">{shortUrl}</p>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
