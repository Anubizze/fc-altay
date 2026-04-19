import Link from "next/link";

import type { LeagueTableId } from "@/shared/config/league-tables";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";

const ORDER: LeagueTableId[] = ["pl", "2l", "women", "qj"];

type LeagueTableTabsProps = {
  locale: AppLocale;
  dict: Dictionary;
  active: LeagueTableId;
};

export function LeagueTableTabs({ locale, dict, active }: LeagueTableTabsProps) {
  return (
    <nav className="league-table-tabs" aria-label={dict.standings.leagueTabsNav}>
      {ORDER.map((id) => (
        <Link
          key={id}
          href={withLocale(locale, `/table?league=${encodeURIComponent(id)}`)}
          className={`league-table-tabs__link${active === id ? " league-table-tabs__link--active" : ""}`}
        >
          {dict.standings.leagueTabs[id]}
        </Link>
      ))}
    </nav>
  );
}
