import { achievements } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";

export default function ClubAchievementsPage({ params }: { params: { locale: string } }) {
  const dict = getDictionary(params.locale === "kk" ? "kk" : "ru");

  return (
    <>
      <PageIntro {...dict.intros.clubAchievements} />

      <section className="section">
        <Container className="grid grid--four">
          {achievements.map((item) => (
            <article key={item.label} className="glass-card stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
