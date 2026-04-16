"use client";

import Link from "next/link";
import { useState } from "react";

import { useInstagramThumbnail } from "@/shared/lib/use-instagram-thumbnail";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { InstagramPostDialog } from "@/shared/ui/instagram-post-dialog";

type NewsCardProps = {
  slug: string;
  locale: AppLocale;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel?: string;
  date: string;
  dateShort?: string;
  tag: string;
  imageGradient?: string;
  coverImageSrc?: string;
  coverImageAlt?: string;
  instagramPermalink?: string;
  dialogCloseLabel?: string;
  dialogOpenHint?: string;
  readMoreLabel: string;
};

export function NewsCard({
  slug,
  locale,
  title,
  excerpt,
  category,
  categoryLabel,
  date,
  dateShort,
  tag,
  imageGradient,
  coverImageSrc,
  coverImageAlt,
  instagramPermalink,
  dialogCloseLabel = "Закрыть",
  dialogOpenHint = "Открыть пост Instagram",
  readMoreLabel
}: NewsCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const resolvedCover = useInstagramThumbnail(instagramPermalink, coverImageSrc);
  const gradient =
    imageGradient ??
    "linear-gradient(145deg, #121a30 0%, #1e2d4a 45%, #050a18 100%)";
  const articleHref = withLocale(locale, `/news/${slug}`);

  return (
    <article className="glass-card news-card news-card--cover">
      <Link href={articleHref} className="news-card__media-link" aria-label={readMoreLabel}>
        <div
          className={`news-card__media${resolvedCover ? " news-card__media--photo" : ""}`.trim()}
          style={resolvedCover ? undefined : { backgroundImage: gradient }}
        >
          {resolvedCover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolvedCover}
              alt={coverImageAlt ?? title}
              className="news-card__media-img"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
      </Link>
      <div className="news-card__body">
        <span className="news-card__date">{(dateShort ?? date).toUpperCase()}</span>
        <Link href={articleHref} className="news-card__title-link">
          <h3>{title}</h3>
        </Link>
        <p className="news-card__excerpt">{excerpt}</p>
        <div className="news-card__footer">
          <span className="pill pill--compact">{categoryLabel ?? category}</span>
          <div className="news-card__actions">
            <Link href={articleHref} className="news-card__more">
              {readMoreLabel}
            </Link>
            {instagramPermalink ? (
              <button
                type="button"
                className="news-card__ig-link"
                onClick={() => setDialogOpen(true)}
              >
                {dialogOpenHint} · {tag}
              </button>
            ) : (
              <span className="news-card__tag-muted">{tag}</span>
            )}
          </div>
        </div>
      </div>
      {instagramPermalink ? (
        <InstagramPostDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          permalink={instagramPermalink}
          closeLabel={dialogCloseLabel}
        />
      ) : null}
    </article>
  );
}
