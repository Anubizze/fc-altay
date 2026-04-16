"use client";

import { useInstagramThumbnail } from "@/shared/lib/use-instagram-thumbnail";

type NewsArticleHeroProps = {
  title: string;
  coverImageSrc?: string;
  coverImageAlt?: string;
  instagramPermalink?: string;
  imageGradient?: string;
};

const FALLBACK_GRADIENT =
  "linear-gradient(145deg, #121a30 0%, #1e2d4a 45%, #050a18 100%)";

export function NewsArticleHero({
  title,
  coverImageSrc,
  coverImageAlt,
  instagramPermalink,
  imageGradient
}: NewsArticleHeroProps) {
  const resolved = useInstagramThumbnail(instagramPermalink, coverImageSrc);
  const gradient = imageGradient ?? FALLBACK_GRADIENT;

  if (resolved) {
    return (
      <div className="news-article__hero news-article__hero--photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolved}
          alt={coverImageAlt ?? title}
          className="news-article__hero-img"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className="news-article__hero news-article__hero--gradient"
      style={{ backgroundImage: gradient }}
      role="img"
      aria-label={coverImageAlt ?? title}
    />
  );
}
