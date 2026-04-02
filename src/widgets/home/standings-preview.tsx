import Link from "next/link";

import { leagueStandings } from "@/shared/content/site-content";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";

type StandingsPreviewProps = {
  locale: AppLocale;
  title: string;
  moreLabel: string;
};

export function StandingsPreview({ locale, title, moreLabel }: StandingsPreviewProps) {
  const rows = [...leagueStandings].sort((a, b) => a.pos - b.pos).slice(0, 6);

  return (
    <div className="standings-preview glass-card">
      <div className="standings-preview__head">
        <h3>{title}</h3>
        <Link href={withLocale(locale, "/table")} className="standings-preview__link">
          {moreLabel}
        </Link>
      </div>
      <table className="standings-preview__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Клуб</th>
            <th>О</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.team} className={r.isClub ? "standings-preview__club" : undefined}>
              <td>{r.pos}</td>
              <td>{r.team}</td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
