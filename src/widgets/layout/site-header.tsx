"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";

import { SITE_LOGO_SRC } from "@/shared/content/site-content";
import {
  clubAboutLinks,
  clubTeamLinks,
  navigation,
  secondaryNav,
  teamSectionLinks
} from "@/shared/config/navigation";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { stripLocalePath, withLocale } from "@/shared/lib/locale-path";
import { Container } from "@/shared/ui/container";

function navItemIsActive(pathname: string, hash: string, href: string) {
  const pathOnly = stripLocalePath(pathname);
  const [itemPath, fragment] = href.split("#");
  if (itemPath === "/") {
    return pathOnly === "/" && (!fragment || hash === `#${fragment}`);
  }
  const pathMatch = pathOnly === itemPath || pathOnly.startsWith(`${itemPath}/`);
  if (!fragment) {
    return pathMatch;
  }
  return pathMatch && hash === `#${fragment}`;
}

function contextSubLinkActive(pathOnly: string, href: string) {
  const base = href.split("#")[0];
  if (pathOnly === base) return true;
  if (base !== "/" && pathOnly.startsWith(`${base}/`)) return true;
  return false;
}

function SubnavCluster({ title, children }: { title: string; children: ReactNode }) {
  const titleId = useId();
  return (
    <div className="subnav-cluster">
      <span id={titleId} className="subnav-cluster__title">
        {title}
      </span>
      <nav className="subnav-cluster__links" aria-labelledby={titleId}>
        {children}
      </nav>
    </div>
  );
}

type SiteHeaderProps = {
  locale: AppLocale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  const pathOnly = stripLocalePath(pathname);
  const hrefKk = `${withLocale("kk", pathOnly)}${hash}`;
  const hrefRu = `${withLocale("ru", pathOnly)}${hash}`;

  const isPureTeamZone = pathOnly === "/team" || pathOnly.startsWith("/team/");

  const contextLinkClass = (href: string) =>
    `subnav__link subnav__link--compact${
      contextSubLinkActive(pathOnly, href) ? " subnav__link--chip-active" : ""
    }`.trim();

  return (
    <header className="site-header">
      <div className="top-bar">
        <Container className="top-bar__inner">
          <span className="top-bar__location">
            <span className="top-bar__pin" aria-hidden="true" />
            {dict.location}
          </span>
          <nav className="top-bar__extras" aria-label={dict.nav.extrasAria}>
            {secondaryNav.map((item) => {
              const isActive = navItemIsActive(pathname, hash, item.href);
              return (
                <Link
                  key={item.href}
                  href={withLocale(locale, item.href)}
                  className={
                    isActive ? "top-bar__extra top-bar__extra--active" : "top-bar__extra"
                  }
                >
                  {dict.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>
          <div className="top-bar__lang" role="group" aria-label={dict.langAria}>
            <Link
              href={hrefKk}
              className={locale === "kk" ? "lang-chip lang-chip--active" : "lang-chip"}
              scroll={false}
            >
              KZ
            </Link>
            <Link
              href={hrefRu}
              className={locale === "ru" ? "lang-chip lang-chip--active" : "lang-chip"}
              scroll={false}
            >
              RU
            </Link>
          </div>
        </Container>
      </div>

      <Container className="site-header__main">
        <div className="site-header__brand-row">
          <Link href={withLocale(locale, "/")} className="brandmark brandmark--hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_LOGO_SRC}
              alt={dict.brandSubtitle}
              className="brandmark__logo-img brandmark__logo-img--header"
              width={160}
              height={160}
            />
            <div className="brandmark__block">
              <strong className="brandmark__title">{dict.brandTitle}</strong>
              <span className="brandmark__subtitle">{dict.brandSubtitle}</span>
            </div>
          </Link>
        </div>

        <nav className="site-nav site-nav--primary" aria-label="Главная навигация">
          {navigation.map((item) => {
            if (item.labelKey === "club") {
              const isClubActive =
                pathOnly === "/club" || pathOnly.startsWith("/club/");
              return (
                <div key={item.href} className="site-nav__item site-nav__item--mega">
                  <Link
                    href={withLocale(locale, item.href)}
                    className={
                      isClubActive ? "site-nav__link site-nav__link--active" : "site-nav__link"
                    }
                    aria-haspopup="true"
                  >
                    {dict.nav[item.labelKey]}
                  </Link>
                  <div
                    className="site-nav__mega"
                    role="navigation"
                    aria-label={`${dict.nav.club}: ${dict.clubPortal.sportsTitle}, ${dict.clubPortal.aboutTitle}`}
                  >
                    <div className="site-nav__mega-panel">
                      <div className="site-nav__mega-row">
                        <span className="subnav-cluster__title site-nav__mega-group-label">
                          {dict.clubPortal.sportsTitle}
                        </span>
                        <div className="site-nav__mega-pills">
                          {clubTeamLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={withLocale(locale, sub.href)}
                              className={contextLinkClass(sub.href)}
                            >
                              {dict.clubTeams[sub.labelKey]}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="site-nav__mega-row">
                        <span className="subnav-cluster__title site-nav__mega-group-label">
                          {dict.clubPortal.aboutTitle}
                        </span>
                        <div className="site-nav__mega-pills">
                          {clubAboutLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={withLocale(locale, sub.href)}
                              className={contextLinkClass(sub.href)}
                            >
                              {dict.clubAbout[sub.labelKey]}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = navItemIsActive(pathname, hash, item.href);
            return (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                className={isActive ? "site-nav__link site-nav__link--active" : "site-nav__link"}
              >
                {dict.nav[item.labelKey]}
              </Link>
            );
          })}
        </nav>
      </Container>

      {isPureTeamZone ? (
        <div className="subnav-strip">
          <Container className="subnav-strip__inner">
            <SubnavCluster title={dict.nav.squad}>
              {teamSectionLinks.map((item) => (
                <Link
                  key={item.href}
                  href={withLocale(locale, item.href)}
                  className={contextLinkClass(item.href)}
                >
                  {dict.teamSection[item.labelKey]}
                </Link>
              ))}
            </SubnavCluster>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
