import Link from "next/link";

import { coachStaff, mainTeamRosterSections, matchItems } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";
import { StandingsPreview } from "@/widgets/home/standings-preview";
import { RosterBlock } from "@/widgets/team/roster-block";

export default function ClubMainPage({ params }: { params: { locale: string } }) {
  const locale = (params.locale === "kk" ? "kk" : "ru") as AppLocale;
  const dict = getDictionary(locale);
  const upcoming = matchItems.filter((m) => m.status === "upcoming").slice(0, 4);

  return (
    <>
      <PageIntro {...dict.intros.clubMain} />

      <section className="section" id="squad">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.roster} align="center" />
          <div style={{ marginTop: 28 }}>
            <RosterBlock sections={mainTeamRosterSections} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Link href={withLocale(locale, "/team")} className="button button--ghost">
              {dict.teamSection.roster}
            </Link>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.coaches} align="center" />
          <div className="grid grid--four" style={{ marginTop: 28 }}>
            {coachStaff.map((person) => (
              <article key={person.name} className="glass-card staff-card">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.clubUnit.calendar} align="center" />
          <div className="grid grid--matches" style={{ marginTop: 28 }}>
            {upcoming.map((m) => (
              <article key={`${m.date}-${m.away}`} className="glass-card match-card">
                <div className="match-card__top">
                  <span>{m.date}</span>
                  <span>{m.tournament}</span>
                </div>
                <div className="match-card__teams">
                  <strong>{m.home}</strong>
                  <span>{m.score}</span>
                  <strong>{m.away}</strong>
                </div>
                <p>{m.venue}</p>
              </article>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Link href={withLocale(locale, "/matches#schedule")} className="button button--ghost">
              {dict.nav.schedule}
            </Link>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <StandingsPreview locale={locale} title={dict.home.tableBlock} moreLabel={dict.home.fullTable} />
        </Container>
      </section>
    </>
  );
}
