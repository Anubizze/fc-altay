import { getDictionary } from "@/shared/i18n/dictionaries";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { MatchesBoard } from "@/widgets/matches/matches-board";

export default function MatchesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro {...dict.intros.matches} />

      <section className="section">
        <Container>
          <MatchesBoard dict={dict} locale={locale} />
        </Container>
      </section>
    </>
  );
}
