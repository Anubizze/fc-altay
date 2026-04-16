type MatchCardProps = {
  date: string;
  tournament: string;
  home: string;
  away: string;
  score: string;
  venue: string;
  outcome?: "win" | "draw" | "loss";
  resultHighlight?: boolean;
  protocolPdf?: string;
  protocolLinkLabel?: string;
};

const outcomeCopy: Record<NonNullable<MatchCardProps["outcome"]>, { label: string; className: string }> = {
  win: { label: "Победа", className: "result-badge result-badge--win" },
  draw: { label: "Ничья", className: "result-badge result-badge--draw" },
  loss: { label: "Поражение", className: "result-badge result-badge--loss" }
};

export function MatchCard({
  date,
  tournament,
  home,
  away,
  score,
  venue,
  outcome,
  resultHighlight,
  protocolPdf,
  protocolLinkLabel
}: MatchCardProps) {
  const badge = outcome ? outcomeCopy[outcome] : null;

  return (
    <article
      className={`glass-card match-card${resultHighlight ? " match-card--result-highlight" : ""}`.trim()}
    >
      <div className="match-card__top">
        <span>{date}</span>
        <span>{tournament}</span>
      </div>
      <div className="match-card__teams">
        <strong>{home}</strong>
        <span>{score}</span>
        <strong>{away}</strong>
      </div>
      <p>{venue}</p>
      {badge ? <span className={badge.className}>{badge.label}</span> : null}
      {protocolPdf ? (
        <a
          href={protocolPdf}
          className="match-card__protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          {protocolLinkLabel ?? "Протокол матча (PDF)"}
        </a>
      ) : null}
    </article>
  );
}
