import { PlayerCard } from "@/entities/team/player-card";
import { qjStandings, squadGroups } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubQjLeaguePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");
  const qj = squadGroups[3];

  return (
    <>
      <PageIntro {...dict.intros.clubQj} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.roster} align="center" />
          {qj ? (
            <div className="grid grid--four" style={{ marginTop: 28 }}>
              {qj.players.map((player) => (
                <PlayerCard key={player.name} {...player} />
              ))}
            </div>
          ) : null}
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
                  <th>О</th>
                </tr>
              </thead>
              <tbody>
                {[...qjStandings].sort((a, b) => a.pos - b.pos).map((row) => (
                  <tr key={row.team} className={row.isClub ? "standings-row--club" : undefined}>
                    <td>{row.pos}</td>
                    <td>{row.team}</td>
                    <td>{row.played}</td>
                    <td className="standings__pts">{row.points}</td>
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
