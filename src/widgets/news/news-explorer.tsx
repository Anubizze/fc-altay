"use client";

import { useMemo, useState } from "react";

import { NewsCard } from "@/entities/news/news-card";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { NewsCategory, NewsItem } from "@/shared/content/site-content";
import type { AppLocale } from "@/shared/lib/locale-path";
import { allNewsItems } from "@/shared/content/site-content";
import { newsCategoryLabel } from "@/shared/lib/news-labels";

type FilterOption = {
  value: NewsCategory;
  label: string;
};

function matchesCategory(item: NewsItem, active: NewsCategory) {
  if (active === "Все") return true;
  return item.category === active;
}

type NewsExplorerProps = {
  categoryOptions: FilterOption[];
  dict: Dictionary;
  locale: AppLocale;
};

export function NewsExplorer({ categoryOptions, dict, locale }: NewsExplorerProps) {
  const [active, setActive] = useState<NewsCategory>("Все");

  const filtered = useMemo(
    () => allNewsItems.filter((item) => matchesCategory(item, active)),
    [active]
  );

  return (
    <div className="stack-lg">
      <div className="filter-row">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={
              opt.value === active ? "filter-chip filter-chip--active" : "filter-chip"
            }
            onClick={() => setActive(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid grid--news-four">
        {filtered.map((item) => (
          <NewsCard
            key={item.slug}
            slug={item.slug}
            locale={locale}
            title={item.title}
            excerpt={item.excerpt}
            category={item.category}
            categoryLabel={newsCategoryLabel(dict, item.category)}
            date={item.date}
            dateShort={item.dateShort}
            tag={item.tag}
            imageGradient={item.imageGradient}
            coverImageSrc={item.coverImageSrc}
            coverImageAlt={item.coverImageAlt}
            instagramPermalink={item.instagramPermalink}
            dialogCloseLabel={dict.news.closePost}
            dialogOpenHint={dict.news.openPostHint}
            readMoreLabel={dict.news.readMore}
          />
        ))}
      </div>
    </div>
  );
}
