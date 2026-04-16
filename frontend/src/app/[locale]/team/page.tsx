import { getDictionary } from "@/shared/i18n/dictionaries";
import { mainTeamCaptains, mainTeamRosterSections } from "@/shared/content/site-content";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";
import { RosterBlock } from "@/widgets/team/roster-block";

export default function TeamPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.team} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.roster} align="center" />
          <div style={{ marginTop: 32 }}>
            <RosterBlock sections={mainTeamRosterSections} />
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.captains} align="center" />
          <div className="grid grid--three" style={{ marginTop: 28 }}>
            {mainTeamCaptains.map((c) => (
              <article key={c.name} className="glass-card staff-card">
                <h3>
                  {c.order}. {c.name}
                </h3>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
