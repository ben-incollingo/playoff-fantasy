export default function PlayerCard({ player, onClick }) {
  return (
    <button
      type="button"
      className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-400/15 bg-slate-900/60 px-3.5 py-3 text-left text-gray-200 transition duration-[120ms] hover:-translate-y-px hover:border-slate-400/30 hover:bg-slate-400/[0.08]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <div className="text-[0.95rem] font-bold">{player.name}</div>
        <div className="text-xs text-gray-200/70">
          {player.team} • {player.position}
        </div>
      </div>

      <div className="text-[0.85rem] font-bold text-gray-200/85">
        #{player.jersey}
      </div>
    </button>
  );
}
