import type { LeagueTableId } from "@/shared/config/league-tables";
import { getDictionary } from "@/shared/i18n/dictionaries";
import {
  getStandingsWithLogosForLeague,
  leaguePublicTableUrl
} from "@/shared/lib/kff-standings";
import type { AppLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";
import { LeagueTableTabs } from "@/widgets/table/league-table-tabs";

export const revalidate = 1800;

const LEAGUE_IDS = new Set<LeagueTableId>(["pl", "2l", "women", "qj"]);

function parseLeagueParam(raw: string | string[] | undefined): LeagueTableId {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v && LEAGUE_IDS.has(v as LeagueTableId)) return v as LeagueTableId;
  return "pl";
}

export default async function TablePage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams?: { league?: string | string[] };
}) {
  const locale: AppLocale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);
  const league = parseLeagueParam(searchParams?.league);
  const rows = await getStandingsWithLogosForLeague(league, locale);
  const localeKey = locale === "kk" ? "kk" : "ru";
  const sourceHref = leaguePublicTableUrl(localeKey, league);
  const sourceLabel = dict.standings.sourceLinkByLeague[league];

  return (
    <>
      <PageIntro {...dict.intros.table} />

      <section className="section section--table-kpl">
        <Container>
          <div className="matches-schedule-skin">
            <div className="match-center">
              <div className="match-center__card table-kpl-card">
                <SectionHeading variant="ribbon" title={dict.nav.table} align="center" />
                <LeagueTableTabs locale={locale} dict={dict} active={league} />
                <div className="standings standings--kpl">
                  {rows.length === 0 ? (
                    <p className="standings-empty">{dict.standings.emptyTable}</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>{dict.standings.colRank}</th>
                          <th>{dict.standings.colTeam}</th>
                          <th>{dict.standings.colPlayed}</th>
                          <th>{dict.standings.colWins}</th>
                          <th>{dict.standings.colDraws}</th>
                          <th>{dict.standings.colLosses}</th>
                          <th>{dict.standings.colGoals}</th>
                          <th>{dict.standings.colPoints}</th>
                          <th>{dict.standings.colForm}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...rows].sort((a, b) => a.pos - b.pos).map((row) => (
                          <tr
                            key={`${row.pos}-${row.team}`}
                            className={row.isClub ? "standings-row--club" : undefined}
                          >
                            <td>{row.pos}</td>
                            <td>
                              <div className="standings__team">
                                {row.logoUrl ? (
                                  <img
                                    className="standings__logo-img"
                                    src={row.logoUrl}
                                    alt=""
                                    width={28}
                                    height={28}
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <span className="standings__logo">{row.short}</span>
                                )}
                                {row.team}
                              </div>
                            </td>
                            <td>{row.played}</td>
                            <td>{row.wins}</td>
                            <td>{row.draws}</td>
                            <td>{row.losses}</td>
                            <td>
                              {row.goalsFor}:{row.goalsAgainst}
                            </td>
                            <td className="standings__pts">{row.points}</td>
                            <td>
                              <div className="form-cells">
                                {row.form.length ? (
                                  row.form.map((f, i) => (
                                    <span
                                      key={`${row.team}-f-${i}`}
                                      className={`form-dot form-dot--${f === "W" ? "w" : f === "D" ? "d" : "l"}`}
                                      title={
                                        f === "W"
                                          ? locale === "kk"
                                            ? "Жеңіс"
                                            : "Победа"
                                          : f === "D"
                                            ? locale === "kk"
                                              ? "Тең"
                                              : "Ничья"
                                            : locale === "kk"
                                              ? "Жеңіліс"
                                              : "Поражение"
                                      }
                                    />
                                  ))
                                ) : (
                                  <span className="standings-form--empty">—</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <p className="standings-source">
                    {dict.standings.sourcePrefix}{" "}
                    <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                      {sourceLabel}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
