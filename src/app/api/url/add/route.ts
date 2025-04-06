import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { url } from "@/db/schema";
import { nanoid } from "nanoid";
import { z } from "zod";

// Schema for validating the URL input
const addUrlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate the input
    const result = addUrlSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 }
      );
    }

    const { url: longUrl } = result.data;

    // Generate a short URL identifier
    const shortId = nanoid(8); // 8 character unique ID

    // Insert the URL into the database
    await db.insert(url).values({
      id: nanoid(),
      url: longUrl,
      shortUrl: shortId,
    });

    // Return the shortened URL
    return NextResponse.json({
      success: true,
      shortUrl: shortId,
    });
  } catch (error) {
    console.error("Error adding URL:", error);
    return NextResponse.json({ error: "Failed to add URL" }, { status: 500 });
  }
}
