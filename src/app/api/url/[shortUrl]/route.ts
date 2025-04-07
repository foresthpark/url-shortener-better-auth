import { db } from "@/db/db";
import { url } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    shortUrl: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { shortUrl } = (await params).params;

    if (!shortUrl) {
      return NextResponse.json(
        { error: "Short URL not provided" },
        { status: 400 }
      );
    }

    // Get the User-Agent header to detect device type
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    // Look up the original URL in the database
    const urlRecord = await db.query.url.findFirst({
      where: eq(url.shortUrl, shortUrl),
    });

    if (!urlRecord) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    // Increment the click count and update mobile clicks if applicable
    await db
      .update(url)
      .set({
        clicks: (urlRecord.clicks || 0) + 1,
        mobileClicks: isMobile
          ? (urlRecord.mobileClicks || 0) + 1
          : urlRecord.mobileClicks || 0,
        lastClickedAt: new Date(),
      })
      .where(eq(url.shortUrl, shortUrl));

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
