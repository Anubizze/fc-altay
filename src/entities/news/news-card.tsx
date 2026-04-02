type NewsCardProps = {
  title: string;
  excerpt: string;
  category: string;
  /** Локализованная подпись категории для отображения (по умолчанию — значение category). */
  categoryLabel?: string;
  date: string;
  dateShort?: string;
  tag: string;
  imageGradient?: string;
};

export function NewsCard({
  title,
  excerpt,
  category,
  categoryLabel,
  date,
  dateShort,
  tag,
  imageGradient
}: NewsCardProps) {
  const gradient =
    imageGradient ??
    "linear-gradient(145deg, #121a30 0%, #1e2d4a 45%, #050a18 100%)";

  return (
    <article className="glass-card news-card news-card--cover">
      <div className="news-card__media" style={{ backgroundImage: gradient }} />
      <div className="news-card__body">
        <span className="news-card__date">{(dateShort ?? date).toUpperCase()}</span>
        <h3>{title}</h3>
        <p className="news-card__excerpt">{excerpt}</p>
        <div className="news-card__footer">
          <span className="pill pill--compact">{categoryLabel ?? category}</span>
          <span className="news-card__link">{tag}</span>
        </div>
      </div>
    </article>
  );
}
