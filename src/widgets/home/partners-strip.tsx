import { PARTNERS_BANNER_SRC } from "@/shared/content/site-content";

type PartnersStripProps = {
  title: string;
};

export function PartnersStrip({ title }: PartnersStripProps) {
  return (
    <section className="partners-strip">
      <h3 className="partners-strip__title">{title}</h3>
      <div className="partners-banner">
        <div className="partners-banner__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PARTNERS_BANNER_SRC}
            alt={title}
            className="partners-banner__img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
