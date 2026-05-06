/** Пути без префикса локали — в ссылках использовать withLocale(locale, path). */

export type NavItem = {
  href: string;
  labelKey: keyof import("@/shared/i18n/dictionaries").Dictionary["nav"];
};

export const navigation: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/club", labelKey: "club" },
  { href: "/news", labelKey: "news" },
  { href: "/matches#schedule", labelKey: "schedule" },
  { href: "/matches#results", labelKey: "results" },
  { href: "/table", labelKey: "table" },
  { href: "/team", labelKey: "squad" },
  { href: "/club/contacts", labelKey: "contacts" }
];

export const secondaryNav: NavItem[] = [
  { href: "/media", labelKey: "media" },
  { href: "/partners", labelKey: "partners" },
  { href: "/documents", labelKey: "documents" },
  { href: "/admin", labelKey: "admin" }
];

/** Подразделы «О клубе» (ТЗ п.8–11). */
export const clubAboutLinks: { href: string; labelKey: keyof import("@/shared/i18n/dictionaries").Dictionary["clubAbout"] }[] = [
  { href: "/club/history", labelKey: "history" },
  { href: "/club/region-football-history", labelKey: "regionFootballHistory" },
  { href: "/club/achievements", labelKey: "achievements" },
  { href: "/club/infrastructure", labelKey: "infrastructure" },
  { href: "/club/contacts", labelKey: "contacts" }
];

/** Спортивные направления клуба (ТЗ п.3–7). */
export const clubTeamLinks: { href: string; labelKey: keyof import("@/shared/i18n/dictionaries").Dictionary["clubTeams"] }[] = [
  { href: "/club/main", labelKey: "main" },
  { href: "/club/reserve", labelKey: "reserve" },
  { href: "/club/women", labelKey: "women" },
  { href: "/club/qj-league", labelKey: "qj" },
  { href: "/club/center", labelKey: "center" }
];

/** Раздел «Команда» (ТЗ п.12–13). */
export const teamSectionLinks: {
  href: string;
  labelKey: keyof import("@/shared/i18n/dictionaries").Dictionary["teamSection"];
}[] = [
  { href: "/team", labelKey: "roster" },
  { href: "/team/administration", labelKey: "administration" },
  { href: "/team/coaching", labelKey: "coaching" }
];
