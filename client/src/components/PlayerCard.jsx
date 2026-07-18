import "./PlayerCard.css";

export default function PlayerCard({ player, onClick }) {
  return (
    <button
      type="button"
      className="playerCard"
      onClick={onClick}
    >
      <div className="playerCard-main">
        <div className="playerCard-name">{player.name}</div>
        <div className="playerCard-team">
          {player.team} • {player.position}
        </div>
      </div>

      <div className="playerCard-meta">
        #{player.jersey}
      </div>
    </button>
  );
}
