import type { MatchItem } from "@/shared/content/site-content";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import type { AppLocale } from "@/shared/lib/locale-path";
import { toProxiedLogoSrc } from "@/shared/lib/kff-standings";
import { MatchCenterPanel } from "@/widgets/matches/match-center-panel";
import { Container } from "@/shared/ui/container";

type HomeMatchHeroProps = {
  locale: AppLocale;
  dict: Dictionary;
  match: MatchItem;
};

export function HomeMatchHero({ locale, dict, match }: HomeMatchHeroProps) {
  const homeSrc = toProxiedLogoSrc(match.homeLogoUrl);
  const awaySrc = toProxiedLogoSrc(match.awayLogoUrl);

  return (
    <section className="home-match-hero">
      <div className="home-match-hero__watermarks" aria-hidden>
        {homeSrc ? (
          <div
            className="home-match-hero__watermark home-match-hero__watermark--left"
            style={{ backgroundImage: `url("${homeSrc.replace(/"/g, "%22")}")` }}
          />
        ) : null}
        {awaySrc ? (
          <div
            className="home-match-hero__watermark home-match-hero__watermark--right"
            style={{ backgroundImage: `url("${awaySrc.replace(/"/g, "%22")}")` }}
          />
        ) : null}
      </div>
      <Container className="home-match-hero__container">
        <MatchCenterPanel
          match={match}
          dict={dict}
          locale={locale}
          titleHeading="h1"
          showScheduleMoreLink
        />
      </Container>
    </section>
  );
}
