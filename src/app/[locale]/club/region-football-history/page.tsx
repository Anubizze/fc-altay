import { regionFootballHistorySections } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function ClubRegionFootballHistoryPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === "kk" ? "kk" : "ru") as AppLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.clubRegionFootballHistory} />

      <section className="section section--tight-after-intro">
        <Container>
          <div className="history-timeline">
            {regionFootballHistorySections.map((section) => {
              const title = section.title[locale];
              const paragraphs = section.paragraphs[locale];
              const bulletTitle = section.bulletTitle?.[locale];
              const bullets = section.bullets?.[locale];

              return (
                <article key={section.id} className="timeline-block glass-card">
                  <header className="timeline-block__header">
                    <h2 className="timeline-block__title">{title}</h2>
                  </header>
                  <div className="timeline-block__body history-prose content-prose">
                    {paragraphs.map((p, i) => (
                      <p key={`${section.id}-p-${i}`}>{p}</p>
                    ))}
                    {bulletTitle && bullets?.length ? (
                      <>
                        <p>
                          <strong>{bulletTitle}</strong>
                        </p>
                        <ul>
                          {bullets.map((item, i) => (
                            <li key={`${section.id}-b-${i}`}>{item}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
