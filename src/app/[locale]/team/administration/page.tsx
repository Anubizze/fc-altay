import { getDictionary } from "@/shared/i18n/dictionaries";
import { administrationStaff } from "@/shared/content/site-content";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function TeamAdministrationPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.teamAdministration} />

      <section className="section">
        <Container>
          <div className="admin-grid">
            {administrationStaff.map((person) => (
              <article key={person.name} className="glass-card admin-card staff-card">
                <div
                  className="admin-staff__photo"
                  style={{ backgroundImage: person.photoGradient }}
                  role="img"
                  aria-label={`${person.name}, ${person.role}`}
                />
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
