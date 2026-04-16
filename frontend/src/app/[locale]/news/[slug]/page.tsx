import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsItemBySlug, allNewsItems } from "@/shared/content/site-content";
import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { LOCALES, withLocale } from "@/shared/lib/locale-path";
import { newsCategoryLabel } from "@/shared/lib/news-labels";
import { Container } from "@/shared/ui/container";
import { NewsArticleHero } from "@/widgets/news/news-article-hero";
import { NewsArticleInstagram } from "@/widgets/news/news-article-instagram";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allNewsItems.map((item) => ({ locale, slug: item.slug }))
  );
}

export default function NewsArticlePage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  const locale: AppLocale = params.locale === "kk" ? "kk" : "ru";
  const item = getNewsItemBySlug(params.slug);
  if (!item) notFound();

  const dict = getDictionary(locale);
  const text = item.body ?? item.excerpt;

  return (
    <section className="section">
      <Container className="news-article">
        <Link href={withLocale(locale, "/news")} className="news-article__back">
          {dict.news.backToNews}
        </Link>
        <NewsArticleHero
          title={item.title}
          coverImageSrc={item.coverImageSrc}
          coverImageAlt={item.coverImageAlt}
          instagramPermalink={item.instagramPermalink}
          imageGradient={item.imageGradient}
        />
        <p className="news-article__meta">
          <span className="pill pill--compact">{newsCategoryLabel(dict, item.category)}</span>
          <span className="news-article__date">{item.date}</span>
        </p>
        <h1 className="news-article__title">{item.title}</h1>
        <div className="news-article__text">{text}</div>
        {item.instagramPermalink ? (
          <NewsArticleInstagram permalink={item.instagramPermalink} dict={dict} />
        ) : null}
      </Container>
    </section>
  );
}
