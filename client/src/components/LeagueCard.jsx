export function LeagueCard({ league, isActive = false, onClick }) {
  return (
    <button
      type="button"
      className={`w-full cursor-pointer rounded-xl border px-3 py-3 text-left text-gray-200 transition duration-[120ms] hover:-translate-y-px hover:border-green-500/35 hover:bg-green-500/[0.08] ${
        isActive
          ? "border-green-500/50 bg-green-500/10"
          : "border-slate-400/15 bg-slate-950/35"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2.5">
        <div className="text-[0.98rem] font-bold leading-[1.2]">{league.name}</div>

        {typeof league.yourPlace === "number" && (
          <div className="rounded-full border border-slate-400/20 bg-slate-400/10 px-2.5 py-1.5 text-sm font-bold text-gray-200/90">
            #{league.yourPlace}
          </div>
        )}
      </div>

      <div className="mt-1.5 flex items-center gap-2 text-[0.85rem] text-gray-200/70">
        <span>{league.playersCount} players</span>
        <span className="opacity-60">•</span>
        <span>Playoffs</span>
      </div>
    </button>
  );
}
