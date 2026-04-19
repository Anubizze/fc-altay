/**
 * Источники турнирных таблиц (KFF / QJL) — синхронно с публичными URL лиг.
 * Параметры query для kffleague.kz: `/ru/table` и `/kz/table`.
 */

export type LeagueTableId = "pl" | "2l" | "women" | "qj";

/** KFF: query-string (pathname фиксирован: /ru/table или /kz/table). */
export const KFF_TABLE_QUERIES: Record<Exclude<LeagueTableId, "qj">, Record<string, string>> = {
  /** Премьер-лига · основная команда ФК «Алтай Өскемен». */
  pl: { tournament: "pl", season: "200" },
  /** Вторая лига · ФК «Алтай Өскемен Жастар». */
  "2l": {
    tournament: "2l",
    season: "203",
    tour_to: "26",
    phase: "groupB"
  },
  /** ЖФК (тот же турнирный контур на KFF, что и во 2L в брифе). */
  women: {
    tournament: "2l",
    season: "203",
    tour_to: "26",
    phase: "groupB"
  }
};

/** QJL: страница турнира с вкладкой «таблица» — парсинг __NEXT_DATA__. */
export const QJL_STANDINGS_PAGE =
  "https://qjl.kz/ru/tournaments?tournament_ids=36&tab=table&from_tour=337&to_tour=354";

/** Публичные страницы для ссылок «подробнее». */
export const LEAGUE_PUBLIC_URLS: Record<LeagueTableId, { ru: string; kk?: string }> = {
  pl: { ru: "https://kffleague.kz/ru/table?tournament=pl&season=200" },
  "2l": {
    ru: "https://kffleague.kz/ru/table?tournament=2l&season=203&tour_to=26&phase=groupB"
  },
  women: {
    ru: "https://kffleague.kz/ru/table?tournament=2l&season=203&tour_to=26&phase=groupB"
  },
  qj: {
    ru: "https://qjl.kz/ru/tournaments?tournament_ids=36&tab=table&from_tour=337&to_tour=354",
    kk: "https://qjl.kz/kz/tournaments?tournament_ids=36&tab=table&from_tour=337&to_tour=354"
  }
};

export function leaguePublicTableUrl(locale: "ru" | "kk", id: LeagueTableId): string {
  if (id === "qj") {
    if (locale === "kk" && LEAGUE_PUBLIC_URLS.qj.kk) return LEAGUE_PUBLIC_URLS.qj.kk;
    return LEAGUE_PUBLIC_URLS.qj.ru;
  }
  const base = locale === "kk" ? "https://kffleague.kz/kz/table" : "https://kffleague.kz/ru/table";
  const q = new URLSearchParams(KFF_TABLE_QUERIES[id]).toString();
  return `${base}?${q}`;
}
