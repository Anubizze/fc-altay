import Link from "next/link";

import { contacts, socialLinks } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubContactsPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.clubContacts} />

      <section className="section">
        <Container className="grid grid--three">
          {contacts.map((item) => (
            <article key={item.title} className="glass-card contact-card">
              <h3>{item.title}</h3>
              <strong
                className={
                  item.valueLine2
                    ? "contact-card__value contact-card__value--multiline"
                    : "contact-card__value"
                }
              >
                {item.valueHref ? (
                  <a href={item.valueHref} className="contact-card__value-link">
                    {item.value}
                  </a>
                ) : item.valueLine2 ? (
                  <>
                    <span className="contact-card__value-line">{item.value}</span>
                    <span className="contact-card__value-line">{item.valueLine2}</span>
                  </>
                ) : (
                  item.value
                )}
              </strong>
              <p className="contact-card__hint">{item.hint}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.contactsPage.socialTitle} align="center" />
          <div className="social-row" style={{ justifyContent: "center" }}>
            {socialLinks.map((s) => (
              <Link key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="map-placeholder">
          <div>
            <span className="eyebrow">{dict.contactsPage.mapEyebrow}</span>
            <h2>{dict.contactsPage.mapTitle}</h2>
            <p>{dict.contactsPage.mapHint}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
