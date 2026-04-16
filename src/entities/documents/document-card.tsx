import Link from "next/link";

type DocumentCardProps = {
  title: string;
  description: string;
  format: string;
  pdfUrl: string;
  downloadLabel?: string;
};

export function DocumentCard({ title, description, format, pdfUrl, downloadLabel }: DocumentCardProps) {
  return (
    <article className="glass-card document-card">
      <div className="document-card__meta">
        <span className="pill">{format}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={pdfUrl} className="document-card__action" target="_blank" rel="noopener noreferrer">
        {downloadLabel ?? "Скачать PDF"}
      </Link>
    </article>
  );
}
