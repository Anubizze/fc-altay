import { leagueStandings } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function TablePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.table} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.nav.table} align="center" />
          <div className="standings" style={{ marginTop: 32 }}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Команда</th>
                  <th>И</th>
                  <th>В</th>
                  <th>Н</th>
                  <th>П</th>
                  <th>Мячи</th>
                  <th>О</th>
                  <th>Форма</th>
                </tr>
              </thead>
              <tbody>
                {[...leagueStandings].sort((a, b) => a.pos - b.pos).map((row) => (
                  <tr key={row.team} className={row.isClub ? "standings-row--club" : undefined}>
                    <td>{row.pos}</td>
                    <td>
                      <div className="standings__team">
                        <span className="standings__logo">{row.short}</span>
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
                        {row.form.map((f, i) => (
                          <span
                            key={`${row.team}-f-${i}`}
                            className={`form-dot form-dot--${f === "W" ? "w" : f === "D" ? "d" : "l"}`}
                            title={f === "W" ? "Победа" : f === "D" ? "Ничья" : "Поражение"}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
