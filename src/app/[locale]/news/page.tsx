import { newsCategories, newsItems } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { newsCategoryLabel } from "@/shared/lib/news-labels";
import { Container } from "@/shared/ui/container";
import { PageIntro } from "@/shared/ui/page-intro";
import { SectionHeading } from "@/shared/ui/section-heading";
import { NewsExplorer } from "@/widgets/news/news-explorer";

export default function NewsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);
  const categoryOptions = newsCategories.map((c) => ({
    value: c,
    label: newsCategoryLabel(dict, c)
  }));
  const lead = newsItems[0];

  return (
    <>
      <PageIntro {...dict.intros.news} />

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.intros.newsFeed.title} align="center" />
          <div className="headline-banner" style={{ marginTop: 28 }}>
            <div>
              <span className="eyebrow">{dict.intros.newsFeed.eyebrow}</span>
              <h2>{lead?.title}</h2>
              <p>{lead?.excerpt}</p>
            </div>
            {lead ? (
              <span className="pill">{newsCategoryLabel(dict, lead.category)}</span>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.nav.news} align="center" />
          <div style={{ marginTop: 28 }}>
            <NewsExplorer categoryOptions={categoryOptions} dict={dict} />
          </div>
        </Container>
      </section>
    </>
  );
}
