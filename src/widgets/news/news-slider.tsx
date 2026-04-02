"use client";

import { useEffect, useState } from "react";

type Slide = {
  title: string;
  excerpt: string;
  dateShort: string;
  imageGradient: string;
  /** Уже локализованная подпись категории (готовится на сервере). */
  categoryLabel: string;
};

type NewsSliderProps = {
  slides: Slide[];
};

export function NewsSlider({ slides }: NewsSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <div className="news-slider">
      <div className="news-slider__viewport">
        <div
          className="news-slider__slide-media"
          style={{ backgroundImage: slide.imageGradient }}
        />
        <div className="news-slider__overlay">
          <span className="pill">{slide.categoryLabel}</span>
          <p className="news-slider__date">{slide.dateShort}</p>
          <h3 className="news-slider__title">{slide.title}</h3>
          <p className="news-slider__excerpt">{slide.excerpt}</p>
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
    </div>
  );
}
