function crestLabel(name: string) {
  const parts = name.replace("FC ", "").trim().split(/\s+/);
  return parts
    .map((p) => p[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

type FeaturedMatchProps = {
  date: string;
  score: string;
  tournament: string;
  home: string;
  away: string;
  venue: string;
};

export function FeaturedMatch({ date, score, tournament, home, away, venue }: FeaturedMatchProps) {
  return (
    <article className="match-feature">
      <div className="match-feature__meta">
        {date} · {venue} · {score}
      </div>
      <div className="match-feature__teams">
        <div className="match-feature__team">
          <div className="match-feature__crest">{crestLabel(home)}</div>
          <strong>{home}</strong>
          <span>Дома</span>
        </div>
        <div className="match-feature__vs">—</div>
        <div className="match-feature__team">
          <div className="match-feature__crest">{crestLabel(away)}</div>
          <strong>{away}</strong>
          <span>В гостях</span>
        </div>
      </div>
      <div className="match-feature__divider" />
      <div className="match-feature__league">{tournament}</div>
    </article>
  );
}
