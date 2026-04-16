import type { NextRequest } from "next/server";

import {
  instagramServerFetch,
  resolveInstagramThumbnailUrl,
  resolveInstagramThumbnailUrlFromShortcode
} from "@/shared/lib/instagram-thumbnail-server";

/**
 * Прокси превью поста: отдаём JPEG с нашего домена (меньше проблем с Referrer / истекающими URL).
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const url = req.nextUrl.searchParams.get("url");

  const thumbUrl = url
    ? await resolveInstagramThumbnailUrl(url)
    : code
      ? await resolveInstagramThumbnailUrlFromShortcode(code)
      : null;

  if (!thumbUrl) {
    return new Response("Preview unavailable", { status: 404 });
  }

  try {
    const img = await instagramServerFetch(thumbUrl, "image/*,*/*");
    if (!img.ok) {
      return new Response("Upstream image error", { status: 502 });
    }
    const buf = await img.arrayBuffer();
    const ct = img.headers.get("content-type") ?? "image/jpeg";
    return new Response(buf, {
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400"
      }
    });
  } catch {
    return new Response("Fetch failed", { status: 502 });
  }
}
