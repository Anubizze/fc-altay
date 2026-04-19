import Link from "next/link";

import type { MatchItem } from "@/shared/content/site-content";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { toProxiedLogoSrc } from "@/shared/lib/kff-standings";

function crestLetters(name: string) {
  const parts = name.replace("FC ", "").trim().split(/\s+/);
  return parts
    .map((p) => p[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function resolveDateLong(m: MatchItem, locale: AppLocale): string {
  if (!m.dateLong) return m.date;
  if (typeof m.dateLong === "string") return m.dateLong;
  return locale === "kk" ? m.dateLong.kk : m.dateLong.ru;
}

export type MatchCenterPanelProps = {
  match: MatchItem;
  dict: Dictionary;
  locale: AppLocale;
  /** Заголовок матча: h1 на главной, h3 на странице матчей (рядом с h2 секции). */
  titleHeading: "h1" | "h3";
  /** Показывать ссылку на раздел «Расписание» (главная). */
  showScheduleMoreLink: boolean;
};

export function MatchCenterPanel({
  match,
  dict,
  locale,
  titleHeading,
  showScheduleMoreLink
}: MatchCenterPanelProps) {
  const isUpcoming = match.status === "upcoming";
  const dateLine = resolveDateLong(match, locale);
  const tourLabel =
    match.tour != null ? dict.home.matchHeroTour.replace("{n}", String(match.tour)) : null;
  const leagueLine = [dict.home.heroLeague, tourLabel].filter(Boolean).join(", ");
  const homeSrc = toProxiedLogoSrc(match.homeLogoUrl);
  const awaySrc = toProxiedLogoSrc(match.awayLogoUrl);
  const TitleTag = titleHeading;

  return (
    <div className="match-center">
      <div className="match-center__card">
        <TitleTag className="match-center__title">
          {match.home} — {match.away}
        </TitleTag>

        <div className="match-center__meta">
          <span className="match-center__meta-league">{leagueLine}</span>
          <div className="match-center__meta-center">
            <span className="match-center__meta-date">{dateLine}</span>
            <span className="match-center__meta-time">{match.score}</span>
          </div>
          <div className="match-center__meta-right">
            {match.kffYoutubeUrl ? (
              <a
                className="match-center__meta-yt"
                href={match.kffYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.home.matchHeroKffYoutube}
              </a>
            ) : null}
            {match.weather ? (
              <span className="match-center__meta-weather">{match.weather}</span>
            ) : null}
          </div>
        </div>

        <div className="match-center__board">
          <div className="match-center__team">
            <div className="match-center__crest">
              {homeSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={homeSrc} alt="" className="match-center__crest-img" />
              ) : (
                <span className="match-center__crest-fallback">{crestLetters(match.home)}</span>
              )}
            </div>
            <span className="match-center__team-name">{match.home}</span>
          </div>

          <div className="match-center__score" aria-label={match.score}>
            {isUpcoming ? (
              <>
                <span className="match-center__dash">—</span>
                <span className="match-center__dash">—</span>
              </>
            ) : (
              <span className="match-center__score-text">{match.score}</span>
            )}
          </div>

          <div className="match-center__team match-center__team--away">
            <div className="match-center__crest">
              {awaySrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={awaySrc} alt="" className="match-center__crest-img" />
              ) : (
                <span className="match-center__crest-fallback">{crestLetters(match.away)}</span>
              )}
            </div>
            <span className="match-center__team-name">{match.away}</span>
          </div>
        </div>

        <div className="match-center__divider" />

        <div className="match-center__footer">
          <div className="match-center__ko">
            <span className="match-center__ko-label">KO</span>
            <div className="match-center__ko-logos" aria-hidden>
              {homeSrc ? (
                <div
                  className="match-center__ko-dot"
                  style={{ backgroundImage: `url("${homeSrc.replace(/"/g, "%22")}")` }}
                />
              ) : null}
              {awaySrc ? (
                <div
                  className="match-center__ko-dot"
                  style={{ backgroundImage: `url("${awaySrc.replace(/"/g, "%22")}")` }}
                />
              ) : null}
            </div>
          </div>
          <div className="match-center__links">
            {match.kffMatchUrl ? (
              <a
                className="match-center__kff-link"
                href={match.kffMatchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.home.matchHeroKffMatchCard}
              </a>
            ) : null}
            <span className="match-center__venue">
              {dict.home.matchHeroStadium}: {match.venue}
            </span>
            {showScheduleMoreLink ? (
              <Link href={withLocale(locale, "/matches")} className="match-center__schedule-link">
                {dict.nav.schedule}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
