import Image from "next/image";
import Link from "next/link";

import { getPremierStandingsWithLogos } from "@/shared/lib/kff-standings";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";

type StandingsPreviewProps = {
  locale: AppLocale;
  title: string;
  moreLabel: string;
};

export async function StandingsPreview({ locale, title, moreLabel }: StandingsPreviewProps) {
  const withLogos = await getPremierStandingsWithLogos(locale);
  const sorted = [...withLogos].sort((a, b) => a.pos - b.pos);
  const clubIdx = sorted.findIndex((r) => r.isClub);
  const rows =
    clubIdx >= 0
      ? sorted.slice(Math.max(0, clubIdx - 1), Math.min(sorted.length, clubIdx + 3))
      : sorted.slice(0, 6);

  return (
    <div className="standings-preview glass-card">
      <div className="standings-preview__head">
        <h3>{title}</h3>
        <Link href={withLocale(locale, "/table?league=pl")} className="standings-preview__link">
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
            <tr key={`${r.pos}-${r.team}`} className={r.isClub ? "standings-preview__club" : undefined}>
              <td>{r.pos}</td>
              <td>
                <span className="standings-preview__team-cell">
                  {r.logoUrl ? (
                    <Image
                      className="standings-preview__logo-img"
                      src={r.logoUrl}
                      alt=""
                      width={22}
                      height={22}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="standings-preview__logo-fallback">{r.short}</span>
                  )}
                  {r.team}
                </span>
              </td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
