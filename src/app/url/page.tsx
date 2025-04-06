"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

// Define the form schema
const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type UrlFormValues = z.infer<typeof urlSchema>;

export default function UrlPage() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use tRPC query to fetch URL list
  const urlList = trpc.urlList.useQuery();
  console.log("🚀 ~ UrlPage ~ urlList:", urlList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UrlFormValues>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: UrlFormValues) => {
    setIsLoading(true);
    setError(null);
    setShortUrl(null);

    try {
      const response = await fetch("/api/url/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to shorten URL");
      }

      setShortUrl(result.shortUrl);
      reset(); // Clear the form
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter URL to shorten
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("url")}
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <span className="font-mono bg-gray-100 p-2 rounded break-all">
              {`${window.location.origin}/${shortUrl}`}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/${shortUrl}`
                );
              }}
              className="ml-2 p-2 text-blue-500 hover:text-blue-700"
              title="Copy to clipboard"
            >
              📋
            </button>
          </div>
        </div>
      )}

      {/* Display the URL list from tRPC */}
      {urlList.data && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Your URLs</h2>
          <ul className="space-y-2">
            {urlList.data.map((url) => (
              <li key={url.id} className="p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">{url.shortUrl}</div>
                <div className="text-sm truncate">{url.url}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
