"use client";

import { useMemo, useState } from "react";

import { NewsCard } from "@/entities/news/news-card";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { NewsCategory } from "@/shared/content/site-content";
import { newsItems } from "@/shared/content/site-content";
import { newsCategoryLabel } from "@/shared/lib/news-labels";

type FilterOption = {
  value: NewsCategory;
  label: string;
};

type Pack = (typeof newsItems)[number];

function matchesCategory(item: Pack, active: NewsCategory) {
  if (active === "Все") return true;
  return item.category === active;
}

type NewsExplorerProps = {
  categoryOptions: FilterOption[];
  dict: Dictionary;
};

export function NewsExplorer({ categoryOptions, dict }: NewsExplorerProps) {
  const [active, setActive] = useState<NewsCategory>("Все");

  const filtered = useMemo(
    () => newsItems.filter((item) => matchesCategory(item, active)),
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
            key={`${item.title}-${item.date}`}
            {...item}
            categoryLabel={newsCategoryLabel(dict, item.category)}
          />
        ))}
      </div>
    </div>
  );
}
