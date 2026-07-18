import { PageHeader } from "../../components/PageHeader";
import PlayerCard from "../../components/PlayerCard";
import "./PickTeam.css";

export default function PickTeam() {
  // Dummy test data (replace with DB later)
  const players = [
    { id: 1, name: "Patrick Mahomes", team: "KC", position: "QB", jersey: 15 },
    { id: 2, name: "Christian McCaffrey", team: "SF", position: "RB", jersey: 23 },
    { id: 3, name: "Tyreek Hill", team: "MIA", position: "WR", jersey: 10 },
    { id: 4, name: "Travis Kelce", team: "KC", position: "TE", jersey: 87 },
    { id: 5, name: "Josh Allen", team: "BUF", position: "QB", jersey: 17 },
  ];

  return (
    <div>
      <PageHeader />

      <div className="leagueDash">
        {/* LEFT PANEL */}
        <div className="leagueDash-panel leagueDash-left">
          <div className="leagueDash-panelHeader">
            <h2 className="leagueDash-title">PLAYERS</h2>
          </div>
          <hr className="leagueDash-divider" />

          <div className="leagueDash-body leagueDash-list">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() =>
                  alert(
                    `${player.name}\n${player.position} • ${player.team}`
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="leagueDash-panel leagueDash-right">
          <div className="leagueDash-panelHeader">
            <h2 className="leagueDash-title">ROSTER</h2>
          </div>
          <hr className="leagueDash-divider" />

          <div className="leagueDash-body">
            <p className="leagueDash-muted">
              Selected players will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
