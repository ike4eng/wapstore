import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireEnv } from "@/lib/env";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { folder?: string }
    | null;

  cloudinary.config({
    cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET")
  });

  const timestamp = Math.round(Date.now() / 1000);
  const folder = body?.folder ?? "wapstore";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    requireEnv("CLOUDINARY_API_SECRET")
  );

  return NextResponse.json({
    timestamp,
    signature,
    folder,
    apiKey: requireEnv("CLOUDINARY_API_KEY"),
    cloudName: requireEnv("CLOUDINARY_CLOUD_NAME")
  });
}

