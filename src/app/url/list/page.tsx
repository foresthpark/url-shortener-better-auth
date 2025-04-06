import React from "react";
import { serverClient } from "@/app/_trpc/serverClient";

export default async function UrlListPage() {
  const urls = await serverClient.urlList();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">URL List</h1>

      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <ul className="space-y-4">
          {urls.map((url) => (
            <li key={url.id} className="border p-4 rounded-md">
              <p>
                <span className="font-semibold">Short URL:</span> {url.shortUrl}
              </p>
              <p>
                <span className="font-semibold">Original URL:</span> {url.url}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
