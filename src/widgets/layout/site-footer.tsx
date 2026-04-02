import Link from "next/link";

import { navigation, secondaryNav } from "@/shared/config/navigation";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { withLocale } from "@/shared/lib/locale-path";
import { contacts, SITE_LOGO_SRC } from "@/shared/content/site-content";
import { Container } from "@/shared/ui/container";

type SiteFooterProps = {
  locale: AppLocale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div>
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
              <strong>FC ALTAI</strong>
              <small>{dict.footer.brandTagline}</small>
            </span>
          </Link>
          <p className="site-footer__lead">{dict.footer.lead}</p>
        </div>

        <div>
          <h3>{dict.footer.navTitle}</h3>
          <div className="site-footer__links">
            {navigation.map((item) => (
              <Link key={item.href} href={withLocale(locale, item.href)}>
                {dict.nav[item.labelKey]}
              </Link>
            ))}
            {secondaryNav.map((item) => (
              <Link key={item.href} href={withLocale(locale, item.href)}>
                {dict.nav[item.labelKey]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>{dict.footer.contactsTitle}</h3>
          <div className="site-footer__contacts">
            {contacts.map((item) => (
              <div key={item.title}>
                <strong>{item.title}</strong>
                <span>
                  {item.valueHref ? (
                    <a href={item.valueHref} className="site-footer__contact-link">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
