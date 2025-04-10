"use client";

import CreateShortUrl from "@/components/CreateShortUrl/CreateShortUrl";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Globe,
  LinkIcon,
  Shield,
  Zap,
} from "lucide-react";

export default function UrlShortener() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero Section */}
        <CreateShortUrl />

        {/* Features Section */}
        <div className="py-20 bg-background">
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
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-muted/30">
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
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-primary/5">
          <div className="container px-4 mx-auto text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to supercharge your links?
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
              Join thousands of marketers, content creators, and businesses who
              trust Petite Links.
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
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Petite Links</span>
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
              © {new Date().getFullYear()} Petite Links. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
