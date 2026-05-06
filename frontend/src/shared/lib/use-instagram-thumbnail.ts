"use client";

import { useEffect, useState } from "react";

/**
 * Превью поста: явный URL из контента или запрос к /api/instagram-oembed (без CORS в браузере).
 */
export function useInstagramThumbnail(
  instagramPermalink: string | undefined,
  staticCoverSrc: string | undefined
): string | null {
  const [thumb, setThumb] = useState<string | null>(staticCoverSrc ?? null);

  useEffect(() => {
    if (staticCoverSrc) {
      setThumb(staticCoverSrc);
      return;
    }
    if (!instagramPermalink) {
      setThumb(null);
      return;
    }
    let cancelled = false;
    setThumb(null);
    void (async () => {
      try {
        const r = await fetch(
          `/api/instagram-oembed?url=${encodeURIComponent(instagramPermalink)}`
        );
        if (!r.ok) return;
        const data = (await r.json()) as { thumbnail_url?: string };
        if (!cancelled && data.thumbnail_url) setThumb(data.thumbnail_url);
      } catch {
        /* остаётся градиент в карточке */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [instagramPermalink, staticCoverSrc]);

  return thumb;
}
