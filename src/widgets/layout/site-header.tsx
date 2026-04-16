"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) panelCloseRef.current?.focus();
  }, [menuOpen]);

  const pathOnly = stripLocalePath(pathname);
  const hrefKk = `${withLocale("kk", pathOnly)}${hash}`;
  const hrefRu = `${withLocale("ru", pathOnly)}${hash}`;

  const isPureTeamZone = pathOnly === "/team" || pathOnly.startsWith("/team/");

  const contextLinkClass = (href: string) =>
    `subnav__link subnav__link--compact${
      contextSubLinkActive(pathOnly, href) ? " subnav__link--chip-active" : ""
    }`.trim();

  const mobileSubLinkClass = (href: string) =>
    `mobile-nav__sublink${contextSubLinkActive(pathOnly, href) ? " mobile-nav__sublink--active" : ""}`;

  const closeMenu = () => setMenuOpen(false);

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
        <div className="site-header__brand-row site-header__brand-row--toolbar">
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
          <button
            type="button"
            className={`mobile-nav__toggle${menuOpen ? " mobile-nav__toggle--open" : ""}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? dict.nav.menuCloseAria : dict.nav.menuOpenAria}
          >
            <span className="mobile-nav__toggle-bars" aria-hidden>
              <span className="mobile-nav__toggle-bar" />
              <span className="mobile-nav__toggle-bar" />
              <span className="mobile-nav__toggle-bar" />
            </span>
          </button>
        </div>

        <nav
          className="site-nav site-nav--primary site-nav--desktop"
          aria-label={dict.nav.mainNavAria}
        >
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

      {menuOpen ? (
        <>
          <div className="mobile-nav__backdrop" aria-hidden onClick={closeMenu} />
          <div
            id="site-mobile-nav"
            className="mobile-nav__panel"
            role="dialog"
            aria-modal="true"
            aria-label={dict.nav.menuTitle}
          >
            <div className="mobile-nav__panel-head">
              <span className="mobile-nav__panel-title">{dict.nav.menuTitle}</span>
              <button
                ref={panelCloseRef}
                type="button"
                className="mobile-nav__close"
                onClick={closeMenu}
                aria-label={dict.nav.menuCloseAria}
              >
                ×
              </button>
            </div>
            <div className="mobile-nav__scroll">
              <nav className="mobile-nav__nav" aria-label={dict.nav.mainNavAria}>
                {navigation.map((item) => {
                  if (item.labelKey === "club") {
                    return (
                      <div key={item.href} className="mobile-nav__block">
                        <details className="mobile-nav__details">
                          <summary className="mobile-nav__summary">{dict.nav.club}</summary>
                          <div className="mobile-nav__details-body">
                            <Link
                              href={withLocale(locale, "/club")}
                              className={
                                pathOnly === "/club"
                                  ? "mobile-nav__link mobile-nav__link--active"
                                  : "mobile-nav__link"
                              }
                              onClick={closeMenu}
                            >
                              {dict.nav.clubHub}
                            </Link>
                            <p className="mobile-nav__group-label">{dict.clubPortal.sportsTitle}</p>
                            <div className="mobile-nav__sublinks">
                              {clubTeamLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={withLocale(locale, sub.href)}
                                  className={mobileSubLinkClass(sub.href)}
                                  onClick={closeMenu}
                                >
                                  {dict.clubTeams[sub.labelKey]}
                                </Link>
                              ))}
                            </div>
                            <p className="mobile-nav__group-label">{dict.clubPortal.aboutTitle}</p>
                            <div className="mobile-nav__sublinks">
                              {clubAboutLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={withLocale(locale, sub.href)}
                                  className={mobileSubLinkClass(sub.href)}
                                  onClick={closeMenu}
                                >
                                  {dict.clubAbout[sub.labelKey]}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </details>
                      </div>
                    );
                  }

                  const isActive = navItemIsActive(pathname, hash, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={withLocale(locale, item.href)}
                      className={
                        isActive ? "mobile-nav__link mobile-nav__link--active" : "mobile-nav__link"
                      }
                      onClick={closeMenu}
                    >
                      {dict.nav[item.labelKey]}
                    </Link>
                  );
                })}
              </nav>

              <div className="mobile-nav__divider" />

              <nav className="mobile-nav__extras" aria-label={dict.nav.extrasAria}>
                {secondaryNav.map((item) => {
                  const isActive = navItemIsActive(pathname, hash, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={withLocale(locale, item.href)}
                      className={
                        isActive ? "mobile-nav__link mobile-nav__link--active" : "mobile-nav__link"
                      }
                      onClick={closeMenu}
                    >
                      {dict.nav[item.labelKey]}
                    </Link>
                  );
                })}
              </nav>

              <div className="mobile-nav__divider" />

              <div className="mobile-nav__lang" role="group" aria-label={dict.langAria}>
                <Link
                  href={hrefKk}
                  className={locale === "kk" ? "lang-chip lang-chip--active" : "lang-chip"}
                  scroll={false}
                  onClick={closeMenu}
                >
                  KZ
                </Link>
                <Link
                  href={hrefRu}
                  className={locale === "ru" ? "lang-chip lang-chip--active" : "lang-chip"}
                  scroll={false}
                  onClick={closeMenu}
                >
                  RU
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}

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
