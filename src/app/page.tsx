"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Copy,
  LinkIcon,
  ArrowRight,
  Check,
  BarChart3,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";
import { authClient } from "@/lib/auth-client";
import CreateShortUrl from "@/components/CreateShortUrl/CreateShortUrl";

export default function UrlShortener() {
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <CreateShortUrl />

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 mx-auto md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Powerful features for your links
              </h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                Everything you need to manage, track, and optimize your
                shortened URLs.
              </p>
            </div>

            <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 text-center bg-background rounded-xl shadow-sm border">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Advanced Analytics</h3>
                <p className="mt-2 text-muted-foreground">
                  Track clicks, locations, devices, and referrers in real-time.
                </p>
              </div>

              <div className="p-6 text-center bg-background rounded-xl shadow-sm border">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Lightning Fast</h3>
                <p className="mt-2 text-muted-foreground">
                  Global CDN ensures your links redirect instantly from
                  anywhere.
                </p>
              </div>

              <div className="p-6 text-center bg-background rounded-xl shadow-sm border">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Secure & Reliable</h3>
                <p className="mt-2 text-muted-foreground">
                  99.9% uptime and enterprise-grade security for your links.
                </p>
              </div>

              <div className="p-6 text-center bg-background rounded-xl shadow-sm border">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Custom Domains</h3>
                <p className="mt-2 text-muted-foreground">
                  Use your own branded domain for all your shortened links.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <p className="text-4xl font-bold text-primary">10M+</p>
                <p className="mt-2 text-muted-foreground">Links shortened</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">5B+</p>
                <p className="mt-2 text-muted-foreground">Clicks tracked</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">50K+</p>
                <p className="mt-2 text-muted-foreground">Happy customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container px-4 mx-auto text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to supercharge your links?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Join thousands of marketers, content creators, and businesses who
              trust ShortLink.
            </p>
            <div className="flex flex-col gap-4 mt-8 md:flex-row md:justify-center">
              <Button size="lg" className="gap-2">
                Get started for free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                View pricing
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">ShortLink</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ShortLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
