import {
  PARTNERS_BANNER_SRC,
  partnerLogos,
  partnerTiers
} from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function PartnersPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.partners} />

      <section className="section section--tight-top">
        <Container>
          <div className="partners-banner">
            <div className="partners-banner__inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PARTNERS_BANNER_SRC}
                alt={dict.home.partners}
                className="partners-banner__img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            variant="ribbon"
            title={dict.partnersPage.logoGridTitle}
            align="center"
            description={
              locale === "kk"
                ? "Бриф бойынша: әр серіктестің логотипі мен серіктестік форматының қысқаша сипаттамасы."
                : "По брифу: логотип партнёра и краткое описание формата сотрудничества."
            }
          />
          <div className="grid grid--three partners-showcase" style={{ marginTop: 28 }}>
            {partnerLogos.map((p) => (
              <article key={p.name} className="glass-card partners-showcase__card">
                <div
                  className="partners-showcase__logo"
                  style={{ backgroundImage: p.gradient }}
                  aria-hidden="true"
                >
                  <span>{p.initials}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.partnersPage.tiersTitle} align="center" />
          <div className="grid grid--three" style={{ marginTop: 28 }}>
            {partnerTiers.map((item) => (
              <article key={item.title} className="glass-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
