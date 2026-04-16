/** Короткий код и тип поста из ссылки /p/, /reel/ или /tv/. */
export function instagramPermalinkToEmbedPath(permalink: string): string | null {
  try {
    const u = new URL(permalink.trim());
    const m = u.pathname.match(/\/(p|reel|tv)\/([^/]+)/);
    if (!m) return null;
    return `${m[1]}/${m[2]}`;
  } catch {
    return null;
  }
}

/** URL встраивания для iframe (официальный embed Instagram). */
export function instagramPermalinkToEmbedSrc(permalink: string): string | null {
  const path = instagramPermalinkToEmbedPath(permalink);
  if (!path) return null;
  return `https://www.instagram.com/${path}/embed`;
}
