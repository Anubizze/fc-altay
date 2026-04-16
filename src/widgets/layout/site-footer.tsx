import Link from "next/link";

import { navigation, secondaryNav, type NavItem } from "@/shared/config/navigation";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { contacts, SITE_LOGO_SRC } from "@/shared/content/site-content";

type SiteFooterProps = {
  locale: AppLocale;
  dict: Dictionary;
};

function pickNav(...keys: NavItem["labelKey"][]): NavItem[] {
  return keys
    .map((k) => navigation.find((i) => i.labelKey === k))
    .filter((x): x is NavItem => Boolean(x));
}

function footerNavGroups(dict: Dictionary): { title: string; items: NavItem[] }[] {
  return [
    { title: dict.footer.navGroupMain, items: pickNav("home", "news", "club") },
    { title: dict.footer.navGroupSeason, items: pickNav("schedule", "results", "table") },
    { title: dict.footer.navGroupTeam, items: pickNav("squad", "contacts") },
    { title: dict.footer.navGroupMore, items: [...secondaryNav] }
  ];
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const groups = footerNavGroups(dict);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__col site-footer__col--brand">
            <Link href={withLocale(locale, "/")} className="brandmark brandmark--footer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_LOGO_SRC}
                alt={dict.brandSubtitle}
                className="brandmark__logo-img brandmark__logo-img--footer"
                width={96}
                height={96}
              />
              <span className="brandmark__text">
                <strong>{dict.brandTitle}</strong>
                <small>{dict.footer.brandTagline}</small>
              </span>
            </Link>
            <p className="site-footer__lead">{dict.footer.lead}</p>
          </div>

          <nav className="site-footer__col site-footer__col--nav" aria-label={dict.footer.navTitle}>
            <div className="site-footer__nav-columns">
              {groups.map((group) => (
                <div key={group.title} className="site-footer__nav-group">
                  <h3 className="site-footer__nav-group-title">{group.title}</h3>
                  <ul className="site-footer__nav-list">
                    {group.items.map((item) => (
                      <li key={`${group.title}-${item.href}`}>
                        <Link href={withLocale(locale, item.href)} className="site-footer__nav-link">
                          {dict.nav[item.labelKey]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div className="site-footer__col site-footer__col--contacts">
            <h3 className="site-footer__contacts-heading">{dict.footer.contactsTitle}</h3>
            <ul className="site-footer__contacts-list site-footer__contacts-grid">
              {contacts.map((item) => (
                <li key={item.title} className="site-footer__contact-item">
                  <span className="site-footer__contact-label">{item.title}</span>
                  <span
                    className={
                      item.valueLine2
                        ? "site-footer__contact-value site-footer__contact-value--multiline"
                        : "site-footer__contact-value"
                    }
                  >
                    {item.valueHref ? (
                      <a href={item.valueHref} className="site-footer__contact-link">
                        {item.value}
                      </a>
                    ) : item.valueLine2 ? (
                      <>
                        <span className="site-footer__contact-line">{item.value}</span>
                        <span className="site-footer__contact-line">{item.valueLine2}</span>
                      </>
                    ) : (
                      item.value
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
