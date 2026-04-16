import { infrastructure } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function ClubInfrastructurePage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.clubInfrastructure} />

      <section className="section">
        <Container className="grid grid--three">
          {infrastructure.map((item) => (
            <article key={item.title} className="glass-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
