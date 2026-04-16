import { clubHistoryTimeline, fcEnrollmentHotline } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function ClubHistoryPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.clubHistory} />

      <section className="section section--tight-after-intro">
        <Container>
          <div className="history-timeline">
            {clubHistoryTimeline.map((item) => (
              <article key={item.year} className="timeline-block glass-card">
                <header className="timeline-block__header">
                  <span className="timeline-block__year">{item.year}</span>
                  <h2 className="timeline-block__title">{item.title}</h2>
                </header>
                <div className="timeline-block__body history-prose content-prose">
                  {item.paragraphs.map((p, i) => (
                    <p key={`${item.year}-${i}`}>{p}</p>
                  ))}
                </div>
              </article>
            ))}

            <aside className="enrollment-hotline-card glass-card">
              <p className="enrollment-hotline-card__label">{dict.clubUnit.fcEnrollmentHotline}</p>
              <a href={fcEnrollmentHotline.phoneTel} className="enrollment-hotline-card__phone">
                {fcEnrollmentHotline.phoneDisplay}
              </a>
              <p className="enrollment-hotline-card__hint">{dict.clubUnit.fcEnrollmentHotlineLead}</p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
