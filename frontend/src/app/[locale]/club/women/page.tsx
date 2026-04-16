import { PlayerCard } from "@/entities/team/player-card";
import { womenStandings, womenSquad } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubWomenPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.clubWomen} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={womenSquad.title} align="center" />
          <p style={{ textAlign: "center", color: "var(--muted)", maxWidth: 720, margin: "16px auto 0" }}>
            {womenSquad.tournament}
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.calendar} align="center" />
          <div className="grid grid--three" style={{ marginTop: 28 }}>
            {womenSquad.calendar.map((row) => (
              <article key={row.date} className="glass-card">
                <span className="pill">{row.date}</span>
                <h3>{row.label}</h3>
                <p>{row.vs}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.standings} align="center" />
          <div className="standings" style={{ marginTop: 28 }}>
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
                </tr>
              </thead>
              <tbody>
                {[...womenStandings].sort((a, b) => a.pos - b.pos).map((row) => (
                  <tr key={row.team} className={row.isClub ? "standings-row--club" : undefined}>
                    <td>{row.pos}</td>
                    <td>{row.team}</td>
                    <td>{row.played}</td>
                    <td>{row.wins}</td>
                    <td>{row.draws}</td>
                    <td>{row.losses}</td>
                    <td>
                      {row.goalsFor}:{row.goalsAgainst}
                    </td>
                    <td className="standings__pts">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.roster} align="center" />
          <div className="grid grid--four" style={{ marginTop: 28 }}>
            {womenSquad.players.map((player) => (
              <PlayerCard key={player.name} {...player} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
