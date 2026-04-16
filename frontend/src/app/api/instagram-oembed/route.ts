import type { NextRequest } from "next/server";

import {
  instagramServerFetch,
  resolveInstagramThumbnailUrl
} from "@/shared/lib/instagram-thumbnail-server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !url.includes("instagram.com")) {
    return Response.json({ error: "invalid_url" }, { status: 400 });
  }

  try {
    const oembedJson = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(url)}`;
    const r = await instagramServerFetch(oembedJson, "application/json");
    if (r.ok) {
      const data = (await r.json()) as { thumbnail_url?: string; title?: string };
      if (data.thumbnail_url) {
        return Response.json({ thumbnail_url: data.thumbnail_url, title: data.title });
      }
    }
  } catch {
    /* fall through */
  }

  const thumbnail_url = await resolveInstagramThumbnailUrl(url);
  if (thumbnail_url) {
    return Response.json({ thumbnail_url });
  }

  return Response.json({ error: "thumbnail_unavailable" }, { status: 404 });
}
