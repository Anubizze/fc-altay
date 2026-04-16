"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useInstagramThumbnail } from "@/shared/lib/use-instagram-thumbnail";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { InstagramPostDialog } from "@/shared/ui/instagram-post-dialog";

type Slide = {
  slug: string;
  title: string;
  excerpt: string;
  dateShort: string;
  imageGradient: string;
  categoryLabel: string;
  instagramPermalink?: string;
  coverImageSrc?: string;
};

type NewsSliderProps = {
  slides: Slide[];
  locale: AppLocale;
  dialogCloseLabel: string;
  dialogOpenHint: string;
  readMoreLabel: string;
};

export function NewsSlider({
  slides,
  locale,
  dialogCloseLabel,
  dialogOpenHint,
  readMoreLabel
}: NewsSliderProps) {
  const [index, setIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPermalink, setDialogPermalink] = useState<string | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index] ?? slides[0];
  const slideThumb = useInstagramThumbnail(slide?.instagramPermalink, slide?.coverImageSrc);

  if (!slide) return null;

  const articleHref = withLocale(locale, `/news/${slide.slug}`);

  const openInstagram = (permalink: string) => {
    setDialogPermalink(permalink);
    setDialogOpen(true);
  };

  return (
    <div className="news-slider">
      <div className="news-slider__viewport">
        <div
          className={`news-slider__slide-media${slideThumb ? " news-slider__slide-media--photo" : ""}`.trim()}
          style={{
            backgroundImage: slideThumb
              ? `url("${slideThumb.replace(/"/g, "%22")}")`
              : slide.imageGradient,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="news-slider__overlay">
          <span className="pill">{slide.categoryLabel}</span>
          <p className="news-slider__date">{slide.dateShort}</p>
          <h3 className="news-slider__title">{slide.title}</h3>
          <p className="news-slider__excerpt">{slide.excerpt}</p>
          <div className="news-slider__actions">
            <Link href={articleHref} className="news-slider__more">
              {readMoreLabel}
            </Link>
            {slide.instagramPermalink ? (
              <button
                type="button"
                className="news-slider__ig"
                onClick={() => openInstagram(slide.instagramPermalink!)}
              >
                {dialogOpenHint}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="news-slider__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === index ? "news-slider__dot news-slider__dot--active" : "news-slider__dot"}
            onClick={() => setIndex(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
      {dialogPermalink ? (
        <InstagramPostDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setDialogPermalink(null);
          }}
          permalink={dialogPermalink}
          closeLabel={dialogCloseLabel}
        />
      ) : null}
    </div>
  );
}
