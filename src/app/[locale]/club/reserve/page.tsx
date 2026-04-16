import { MatchCard } from "@/entities/matches/match-card";
import { PlayerCard } from "@/entities/team/player-card";
import { reserveResults, squadGroups } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubReservePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");
  const reserve = squadGroups[1];

  return (
    <>
      <PageIntro {...dict.intros.clubReserve} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.roster} align="center" />
          {reserve ? (
            <div className="grid grid--four" style={{ marginTop: 28 }}>
              {reserve.players.map((player) => (
                <PlayerCard key={player.name} {...player} />
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.results} align="center" />
          <div className="grid grid--four" style={{ marginTop: 28 }}>
            {reserveResults.map((m) => (
              <MatchCard
                key={`${m.date}-${m.away}`}
                date={m.date}
                tournament={m.tournament}
                home={m.home}
                away={m.away}
                score={m.score}
                venue={m.venue}
                protocolPdf={m.protocolPdf}
                protocolLinkLabel={dict.clubUnit.protocolPdf}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
