import Link from "next/link";

import { NewsCard } from "@/entities/news/news-card";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { newsCategoryLabel } from "@/shared/lib/news-labels";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import {
  clubHighlights,
  matchItems,
  allNewsItems,
  seasonStatsCards
} from "@/shared/content/site-content";
import { Container } from "@/shared/ui/container";
import { SectionHeading } from "@/shared/ui/section-heading";
import { PartnersStrip } from "@/widgets/home/partners-strip";
import { StandingsPreview } from "@/widgets/home/standings-preview";
import { FeaturedMatch } from "@/widgets/matches/featured-match";
import { NewsSlider } from "@/widgets/news/news-slider";

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale: AppLocale = params.locale === "kk" ? "kk" : "ru";
  const dict = getDictionary(locale);
  const next = matchItems.find((m) => m.status === "upcoming");
  const sliderSlides = allNewsItems.slice(0, 5).map((n) => ({
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    dateShort: n.dateShort ?? n.date,
    imageGradient: n.imageGradient ?? "",
    categoryLabel: newsCategoryLabel(dict, n.category),
    instagramPermalink: n.instagramPermalink,
    coverImageSrc: n.coverImageSrc
  }));

  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero-ref">
            <div className="hero-ref__inner">
              <div className="hero-ref__tags">
                <span className="hero-ref__tag">{dict.home.heroSeason}</span>
                <span className="hero-ref__tag">{dict.home.heroPromo}</span>
                <span className="hero-ref__tag">{dict.home.heroLeague}</span>
                <span className="hero-ref__tag">Қазақстан</span>
              </div>
              <h1>
                {locale === "kk" ? "«Алтай Өскемен» футбол клубы" : "Футбольный клуб «Алтай Өскемен»"}
              </h1>
              <p>
                {locale === "kk"
                  ? "Ресми сайт: жаңалықтар, алдағы ойын, слайдер, Премьер-лига кестесі, серіктестер — қазақ және орыс тілдерінде."
                  : "Официальный сайт клуба: слайдер новостей, ближайший матч, последние новости, турнирная таблица Премьер-лиги, партнёры — на русском и казахском."}
              </p>
              <div className="hero-ref__actions">
                <Link href={withLocale(locale, "/club")} className="button">
                  {dict.home.aboutClub}
                </Link>
                <Link href={withLocale(locale, "/matches#schedule")} className="button button--ghost">
                  {dict.home.nextMatch}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="home-tz-top">
            <div>
              <SectionHeading variant="ribbon" title={dict.home.newsSlider} align="center" />
              <div style={{ marginTop: 24 }}>
                <NewsSlider
                  slides={sliderSlides}
                  locale={locale}
                  dialogCloseLabel={dict.news.closePost}
                  dialogOpenHint={dict.news.openPostHint}
                  readMoreLabel={dict.news.readMore}
                />
              </div>
            </div>
            <div>
              <SectionHeading variant="ribbon" title={dict.home.nextMatch} align="center" />
              <div style={{ marginTop: 24 }}>
                {next ? (
                  <FeaturedMatch
                    date={next.date}
                    score={next.score}
                    tournament={next.tournament}
                    home={next.home}
                    away={next.away}
                    venue={next.venue}
                  />
                ) : null}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                  <Link href={withLocale(locale, "/matches")} className="button button--ghost">
                    {dict.nav.schedule}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading variant="ribbon" title={dict.home.latestNews} align="center" />
          <div className="grid grid--news-four" style={{ marginTop: 28 }}>
            {allNewsItems.slice(0, 4).map((item) => (
              <NewsCard
                key={item.slug}
                slug={item.slug}
                locale={locale}
                title={item.title}
                excerpt={item.excerpt}
                category={item.category}
                categoryLabel={newsCategoryLabel(dict, item.category)}
                date={item.date}
                dateShort={item.dateShort}
                tag={item.tag}
                imageGradient={item.imageGradient}
                coverImageSrc={item.coverImageSrc}
                coverImageAlt={item.coverImageAlt}
                instagramPermalink={item.instagramPermalink}
                dialogCloseLabel={dict.news.closePost}
                dialogOpenHint={dict.news.openPostHint}
                readMoreLabel={dict.news.readMore}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <Link href={withLocale(locale, "/news")} className="button button--ghost">
              {dict.home.allNews}
            </Link>
          </div>
        </Container>
      </section>

      <section className="section section--before-partners-strip">
        <Container>
          <div className="home-tz-mid">
            <StandingsPreview
              locale={locale}
              title={dict.home.tableBlock}
              moreLabel={dict.home.fullTable}
            />
            <div>
              <SectionHeading variant="ribbon" title={dict.home.statsSeason} align="center" />
              <div className="season-stats" style={{ marginTop: 24 }}>
                {seasonStatsCards.map((card) => (
                  <article
                    key={card.label}
                    className={`season-stat-card${card.accent ? " season-stat-card--accent" : ""}`.trim()}
                  >
                    <span className="season-stat-card__label">{card.label}</span>
                    <span className="season-stat-card__value">{card.value}</span>
                    <span className="season-stat-card__sub">{card.sub}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--partners-strip">
        <PartnersStrip title={dict.home.partners} />
      </section>

      <section className="section section--after-partners-strip">
        <Container>
          <SectionHeading
            variant="ribbon"
            title={dict.home.aboutClub}
            align="center"
            description={
              locale === "kk"
                ? "Клубтың философиясы және құрылымы."
                : "Блок «О клубе» — кратко о философии; детали — в подразделах истории, достижений и инфраструктуры."
            }
          />
          <div className="grid grid--three" style={{ marginTop: 28 }}>
            {clubHighlights.map((item) => (
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
