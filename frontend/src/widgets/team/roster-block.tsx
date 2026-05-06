import type { RosterSection } from "@/shared/content/site-content";

type RosterBlockProps = {
  sections: RosterSection[];
};

export function RosterBlock({ sections }: RosterBlockProps) {
  return (
    <div className="roster-stack">
      {sections.map((section) => (
        <section key={section.title} className="roster-block">
          <header className="roster-block__head">{section.title}</header>
          <div className="roster-block__grid">
            {section.players.map((player) => (
              <div key={`${section.title}-${player.number}-${player.name}`} className="roster-row">
                <span className="roster-row__num">{player.number}</span>
                <div className="roster-row__meta">
                  <strong>{player.name}</strong>
                  <span>{player.age === "—" ? "—" : `${player.age} лет`}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
