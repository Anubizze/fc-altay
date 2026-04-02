import Link from "next/link";

import {
  fcEnrollmentHotline,
  footballCenter,
  footballCenterEnrollment
} from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";

export default function ClubCenterPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === "kk" ? "kk" : "ru") as AppLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.clubCenter} />

      <section className="section fc-page-section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.fcAbout} align="center" />
          <div className="glass-card fc-page-card fc-center-prose content-prose">
            {footballCenter.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="section fc-page-section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.fcMethodNote} align="center" />
          <p className="glass-card fc-page-card fc-lead-text">{footballCenter.methodNote}</p>
          <div className="grid grid--four fc-page-grid">
            {footballCenter.coaches.map((person) => (
              <article key={person.name} className="glass-card staff-card">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section fc-page-section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.groups} align="center" />
          <div className="grid grid--three fc-page-grid">
            {footballCenter.groups.map((g) => (
              <article key={g.title} className="glass-card fc-age-group-card">
                <h3>{g.title}</h3>
                <p>{g.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section fc-page-section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.fcContingent} align="center" />
          <div className="glass-card fc-page-card">
            <p className="fc-contingent-intro">{footballCenter.contingentIntro}</p>
            <ul className="fc-contingent-list">
              {footballCenter.contingentLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section fc-page-section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.fcBranch} align="center" />
          <p className="glass-card fc-page-card fc-lead-text">{footballCenter.branch2025}</p>
        </Container>
      </section>

      <section className="section fc-page-section">
        <Container>
          <div className="glass-card fc-page-card fc-recruitment-block">
            <SectionHeading variant="ribbon" title={dict.clubUnit.recruitment} align="center" />
            <p className="fc-recruitment-block__text">{footballCenter.recruitment}</p>
            <div className="fc-recruitment-block__actions">
              <Link href={withLocale(locale, "/club/contacts")} className="button button--ghost">
                {dict.nav.contacts}
              </Link>
              <Link
                href={withLocale(locale, "/club/center#fc-enrollment")}
                className="button button--ghost"
              >
                {dict.clubUnit.fcEnrollmentTable}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section fc-page-section" id="fc-enrollment">
        <Container>
          <div className="fc-enrollment-banner">
            <h2 className="fc-enrollment-banner__title">
              {locale === "kk"
                ? "«АЛТАЙ ӨСКЕМЕН» ФУТБОЛ ОРТАЛЫҒЫНЫҢ КОНТАКТІЛЕРІ"
                : dict.clubUnit.fcEnrollmentTable}
            </h2>
            <p className="fc-enrollment-banner__sub">
              {locale === "kk"
                ? "Іріктеу — тренерлердің тікелей нөмірлері"
                : "Набор в группы: прямые телефоны тренеров по году рождения"}
            </p>
          </div>

          <aside className="enrollment-hotline-card glass-card enrollment-hotline-card--inline">
            <p className="enrollment-hotline-card__label">{dict.clubUnit.fcEnrollmentHotline}</p>
            <a href={fcEnrollmentHotline.phoneTel} className="enrollment-hotline-card__phone">
              {fcEnrollmentHotline.phoneDisplay}
            </a>
            <p className="enrollment-hotline-card__hint">{dict.clubUnit.fcEnrollmentHotlineLead}</p>
          </aside>

          <div className="fc-enrollment-table-wrap glass-card">
            <table className="fc-enrollment-table">
              <thead>
                <tr>
                  <th>{dict.clubUnit.fcCategory}</th>
                  <th>{dict.clubUnit.fcCoach}</th>
                  <th>{dict.clubUnit.fcPhone}</th>
                </tr>
              </thead>
              <tbody>
                {footballCenterEnrollment.map((row) => (
                  <tr key={`${row.category}-${row.phone}`}>
                    <td>{row.category}</td>
                    <td>{row.coach}</td>
                    <td>
                      <a href={`tel:${row.phone.replace(/\s/g, "")}`}>{row.phone}</a>
                    </td>
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
