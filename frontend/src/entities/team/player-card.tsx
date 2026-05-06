type PlayerCardProps = {
  name: string;
  role: string;
  number: string;
  age?: string;
};

export function PlayerCard({ name, role, number, age }: PlayerCardProps) {
  return (
    <article className="glass-card player-card">
      <span className="player-card__number">{number}</span>
      <h3>{name}</h3>
      <p>
        {role}
        {age ? <span className="player-card__age"> · {age} лет</span> : null}
      </p>
    </article>
  );
}
