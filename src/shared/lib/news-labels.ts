import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { NewsCategory } from "@/shared/content/site-content";

const keyByCategory: Record<NewsCategory, keyof Dictionary["news"]> = {
  Все: "all",
  "Основная команда": "main",
  Дубль: "reserve",
  "Женская команда": "women",
  "QJ League": "qj",
  "Футбольный центр": "center"
};

export function newsCategoryLabel(dict: Dictionary, category: NewsCategory): string {
  return dict.news[keyByCategory[category]];
}
