import { getDictionary } from "@/shared/i18n/dictionaries";
import { coachesByTeam } from "@/shared/content/site-content";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function TeamCoachingPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.teamCoaching} />

      <section className="section">
        <Container className="stack-xl">
          {coachesByTeam.map((block) => (
            <div key={block.team} className="stack-md">
              <SectionHeading eyebrow={dict.teamSection.coaching} title={block.team} />
              <div className="grid grid--four">
                {block.staff.map((person) => (
                  <article key={`${block.team}-${person.name}`} className="glass-card staff-card">
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
