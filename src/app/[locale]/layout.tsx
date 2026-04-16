import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getDictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { LOCALES } from "@/shared/lib/locale-path";
import { SiteFooter } from "@/widgets/layout/site-footer";
import { SiteHeader } from "@/widgets/layout/site-header";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale === "kk" ? "kk" : "ru";
  const titles: Record<AppLocale, string> = {
    ru: "ФК «Алтай Өскемен» | Өскемен",
    kk: "«Алтай Өскемен» ФК | Өскемен"
  };
  const descriptions: Record<AppLocale, string> = {
    ru:
      "ФК «Алтай Өскемен» (Өскемен): новости по категориям, команды клуба, расписание и результаты с протоколами, таблица Премьер-лиги, медиа, партнёры, документы PDF, CMS.",
    kk:
      "«Алтай Өскемен» ФК (Өскемен): санаттар бойынша жаңалықтар, клуб командалары, кесте мен хаттамалы нәтижелер, Премьер-лига кестесі, медиа, серіктестер, PDF құжаттар."
  };
  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords:
      locale === "kk"
        ? [
            "Алтай Өскемен",
            "Өскемен",
            "футбол",
            "жаңалықтар",
            "кесте",
            "серіктестер",
            "құжаттар"
          ]
        : [
            "ФК Алтай Өскемен",
            "Өскемен",
            "футбол",
            "новости",
            "расписание",
            "таблица",
            "партнёры",
            "документы",
            "QJ League"
          ],
    alternates: {
      languages: {
        ru: "/ru",
        kk: "/kk"
      }
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      locale: locale === "kk" ? "kk_KZ" : "ru_RU",
      type: "website"
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!LOCALES.includes(params.locale as AppLocale)) {
    notFound();
  }

  const locale = params.locale as AppLocale;
  const dict = getDictionary(locale);

  return (
    <div className="page-shell">
      <SiteHeader locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </div>
  );
}
