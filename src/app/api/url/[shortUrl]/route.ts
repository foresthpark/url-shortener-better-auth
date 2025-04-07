import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { url } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  try {
    const { shortUrl } = await params;

    if (!shortUrl) {
      return NextResponse.json(
        { error: "Short URL not provided" },
        { status: 400 }
      );
    }

    // Look up the original URL in the database
    const urlRecord = await db.query.url.findFirst({
      where: eq(url.shortUrl, shortUrl),
    });

    if (!urlRecord) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    // Redirect to the original URL
    return NextResponse.redirect(urlRecord.url);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
