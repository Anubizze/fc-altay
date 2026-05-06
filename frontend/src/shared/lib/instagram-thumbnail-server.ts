/**
 * Только для сервера (Route Handlers): получение URL превью поста Instagram.
 */

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export const instagramServerFetch = (input: string, accept = "text/html,application/json;q=0.9,*/*;q=0.8") =>
  fetch(input, {
    headers: {
      "User-Agent": UA,
      Accept: accept,
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      Referer: "https://www.instagram.com/"
    },
    cache: "no-store"
  });

function shortcodeFromInstagramUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const m = u.pathname.match(/\/(p|reel|tv)\/([^/]+)/);
    return m?.[2] ?? null;
  } catch {
    return null;
  }
}

function decodeJsonUrl(raw: string): string {
  return raw.replace(/\\u0026/g, "&").replace(/&amp;/g, "&");
}

function pickOgImage(html: string): string | null {
  const patterns = [
    /<meta\s+property="og:image"\s+content="([^"]+)"/i,
    /<meta\s+content="([^"]+)"\s+property="og:image"/i,
    /<meta\s+property='og:image'\s+content='([^']+)'/i
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return decodeJsonUrl(m[1]);
  }
  return null;
}

function pickDisplayUrl(html: string): string | null {
  const m = html.match(/"display_url"\s*:\s*"([^"]+)"/);
  if (m?.[1]) return decodeJsonUrl(m[1]);
  const m2 = html.match(/"thumbnail_src"\s*:\s*"([^"]+)"/);
  if (m2?.[1]) return decodeJsonUrl(m2[1]);
  return null;
}

function pickCdnPostImage(html: string): string | null {
  const post1 = html.match(
    /alt="Instagram post[^"]*"[^>]*\ssrc="(https:\/\/[^"]+cdninstagram\.com[^"]+)"/i
  );
  if (post1?.[1]) return decodeJsonUrl(post1[1]);
  const post2 = html.match(
    /src="(https:\/\/[^"]+cdninstagram\.com[^"]+)"[^>]*alt="Instagram post[^"]*"/i
  );
  if (post2?.[1]) return decodeJsonUrl(post2[1]);

  const candidates = [
    ...html.matchAll(
      /https:\/\/scontent[^"'\\\s>]+\.cdninstagram\.com\/[^"'\\\s<>]+\.jpg(?:\?[^"'\\\s<>]*)?/gi
    )
  ];
  let best: string | null = null;
  for (const c of candidates) {
    const u = decodeJsonUrl(c[0]);
    if (u.includes("s150x150") || u.includes("s240x240")) continue;
    if (u.includes("p1080") || u.includes("e35_p1080") || u.includes("1080x1080")) return u;
    if (!/\/t51\.82787-19\//.test(u)) best = u;
  }
  return best;
}

export function thumbnailFromEmbedHtml(html: string): string | null {
  return pickOgImage(html) ?? pickDisplayUrl(html) ?? pickCdnPostImage(html);
}

/** Публичный permalink или https://www.instagram.com/p/{shortcode}/ */
export async function resolveInstagramThumbnailUrl(postUrl: string): Promise<string | null> {
  if (!postUrl.includes("instagram.com")) return null;

  const oembedJson = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(postUrl)}`;
  try {
    const r = await instagramServerFetch(oembedJson, "application/json");
    if (r.ok) {
      const data = (await r.json()) as { thumbnail_url?: string };
      if (data.thumbnail_url) return data.thumbnail_url;
    }
  } catch {
    /* fall through */
  }

  const code = shortcodeFromInstagramUrl(postUrl);
  if (!code) return null;

  let pathPrefix = `p/${code}`;
  try {
    const u = new URL(postUrl.trim());
    const km = u.pathname.match(/\/(p|reel|tv)\//);
    if (km?.[1] === "reel") pathPrefix = `reel/${code}`;
    else if (km?.[1] === "tv") pathPrefix = `tv/${code}`;
  } catch {
    /* keep */
  }

  const embedUrls = [
    `https://www.instagram.com/${pathPrefix}/embed/captioned/`,
    `https://www.instagram.com/${pathPrefix}/embed/`
  ];
  for (const embedUrl of embedUrls) {
    try {
      const r2 = await instagramServerFetch(embedUrl);
      if (!r2.ok) continue;
      const html = await r2.text();
      const thumb = thumbnailFromEmbedHtml(html);
      if (thumb) return thumb;
    } catch {
      /* next */
    }
  }
  return null;
}

export async function resolveInstagramThumbnailUrlFromShortcode(shortcode: string): Promise<string | null> {
  if (!/^[\w-]+$/.test(shortcode)) return null;
  return resolveInstagramThumbnailUrl(`https://www.instagram.com/p/${shortcode}/`);
}
