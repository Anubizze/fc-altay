"use client";

import { useEffect } from "react";

import { MatchCard } from "@/entities/matches/match-card";
import { matchItems } from "@/shared/content/site-content";
import type { Dictionary } from "@/shared/i18n/dictionaries";
import { SectionHeading } from "@/shared/ui/section-heading";
import { FeaturedMatch } from "@/widgets/matches/featured-match";

type MatchesBoardProps = {
  dict: Dictionary;
};

export function MatchesBoard({ dict }: MatchesBoardProps) {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id === "results" || id === "schedule") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const upcoming = matchItems.filter((m) => m.status === "upcoming");
  const results = matchItems.filter((m) => m.status === "result");
  const next = upcoming[0];
  const restUpcoming = upcoming.slice(1);
  const pastPreview = results.slice(0, 4);

  return (
    <div className="stack-xl">
      <section id="schedule" className="matches-section scroll-mt">
        <SectionHeading variant="ribbon" title={dict.matchesBoard.schedule} align="center" />

        <div className="stack-md" style={{ marginTop: 24 }}>
          <p
            className="eyebrow"
            style={{ textAlign: "center", marginBottom: 8, letterSpacing: "0.12em" }}
          >
            {dict.matchesBoard.next}
          </p>
          {next ? (
            <FeaturedMatch
              date={next.date}
              score={next.score}
              tournament={next.tournament}
              home={next.home}
              away={next.away}
              venue={next.venue}
            />
          ) : null}
        </div>

        {restUpcoming.length > 0 ? (
          <div className="stack-md" style={{ marginTop: 28 }}>
            <h3 className="matches-subheading">{dict.matchesBoard.upcoming}</h3>
            <div className="grid grid--matches">
              {restUpcoming.map((m) => (
                <MatchCard
                  key={`${m.home}-${m.away}-${m.date}`}
                  date={m.date}
                  tournament={m.tournament}
                  home={m.home}
                  away={m.away}
                  score={m.score}
                  venue={m.venue}
                />
              ))}
            </div>
          </div>
        ) : null}

        {pastPreview.length > 0 ? (
          <div className="stack-md" style={{ marginTop: 32 }}>
            <h3 className="matches-subheading">{dict.matchesBoard.pastInSchedule}</h3>
            <div className="grid grid--matches">
              {pastPreview.map((m) => (
                <MatchCard
                  key={`past-${m.home}-${m.away}-${m.date}`}
                  date={m.date}
                  tournament={m.tournament}
                  home={m.home}
                  away={m.away}
                  score={m.score}
                  venue={m.venue}
                  outcome={m.outcome}
                  resultHighlight={m.resultHighlight}
                  protocolPdf={"protocolPdf" in m ? m.protocolPdf : undefined}
                  protocolLinkLabel={dict.clubUnit.protocolPdf}
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section id="results" className="matches-section scroll-mt">
        <SectionHeading
          variant="ribbon"
          title={dict.matchesBoard.results}
          align="center"
          description={dict.matchesBoard.resultsLead}
        />
        <div className="grid grid--four" style={{ marginTop: 28 }}>
          {results.map((m) => (
            <MatchCard
              key={`${m.home}-${m.away}-${m.date}-result`}
              date={m.date}
              tournament={m.tournament}
              home={m.home}
              away={m.away}
              score={m.score}
              venue={m.venue}
              outcome={m.outcome}
              resultHighlight={m.resultHighlight}
              protocolPdf={"protocolPdf" in m ? m.protocolPdf : undefined}
              protocolLinkLabel={dict.clubUnit.protocolPdf}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
