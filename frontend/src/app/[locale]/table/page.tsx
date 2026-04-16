import { getDictionary } from "@/shared/i18n/dictionaries";
import { kffTablePublicUrl, getPremierStandingsWithLogos } from "@/shared/lib/kff-standings";
import type { AppLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export const revalidate = 1800;

export default async function TablePage({ params }: { params: { locale: string } }) {
  const locale: AppLocale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);
  const rows = await getPremierStandingsWithLogos(locale);
  const sourceHref = kffTablePublicUrl(locale);

  return (
    <>
      <PageIntro {...dict.intros.table} />

      <section className="section section--table-kpl">
        <Container>
          <div className="kpl-standings-wrap">
            <SectionHeading variant="ribbon" title={dict.nav.table} align="center" />
            <div className="standings standings--kpl">
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
                  <tr key={`${row.pos}-${row.team}`} className={row.isClub ? "standings-row--club" : undefined}>
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
            <p className="standings-source">
              {dict.standings.sourcePrefix}{" "}
              <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                {dict.standings.sourceLinkLabel}
              </a>
            </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
