import { PARTNERS_BANNER_SRC } from "@/shared/content/site-content";

type PartnersStripProps = {
  title: string;
};

export function PartnersStrip({ title }: PartnersStripProps) {
  return (
    <div className="partners-strip">
      <div className="container">
        <h3 className="partners-strip__title">{title}</h3>
        <div className="partners-strip__visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PARTNERS_BANNER_SRC}
            alt={title}
            className="partners-strip__img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
