import "./LeagueCard.css";

export function LeagueCard({ league, isActive = false, onClick }) {
  // league example:
  // {
  //   name: "Temple Playoff League",
  //   playersCount: 12,
  //   yourPlace: 3
  // }

  return (
    <button
      type="button"
      className={`league-card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="league-card-top">
        <div className="league-card-name">{league.name}</div>

        {typeof league.yourPlace === "number" && (
          <div className="league-card-place">
            #{league.yourPlace}
          </div>
        )}
      </div>

      <div className="league-card-meta">
        <span>{league.playersCount} players</span>
        <span className="dot">•</span>
        <span>Playoffs</span>
      </div>
    </button>
  );
}
