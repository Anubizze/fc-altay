import Link from "next/link";

import { clubAboutLinks, clubTeamLinks } from "@/shared/config/navigation";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === "kk" ? "kk" : "ru") as AppLocale;
  const dict = getDictionary(locale);
  const { blurb } = dict.clubPortal;

  return (
    <>
      <PageIntro {...dict.intros.club}>
        <div className="hero__actions">
          <Link href={withLocale(locale, "/club/main")} className="button">
            {dict.clubTeams.main}
          </Link>
          <Link href={withLocale(locale, "/club/history")} className="button button--ghost">
            {dict.clubAbout.history}
          </Link>
        </div>
      </PageIntro>

      <section className="section">
        <Container>
          <SectionHeading
            variant="ribbon"
            title={dict.clubPortal.sportsTitle}
            align="center"
            description={dict.clubPortal.sportsLead}
          />
          <div className="grid grid--three club-portal-grid" style={{ marginTop: 28 }}>
            {clubTeamLinks.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className="glass-card club-portal-card"
              >
                <h3>{dict.clubTeams[item.labelKey]}</h3>
                <p>{blurb[item.labelKey]}</p>
                <span className="club-portal-card__cta">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            variant="ribbon"
            title={dict.clubPortal.aboutTitle}
            align="center"
            description={dict.clubPortal.aboutLead}
          />
          <div className="grid grid--four club-portal-grid" style={{ marginTop: 28 }}>
            {clubAboutLinks.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className="glass-card club-portal-card"
              >
                <h3>{dict.clubAbout[item.labelKey]}</h3>
                <p>{blurb[item.labelKey]}</p>
                <span className="club-portal-card__cta">→</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
