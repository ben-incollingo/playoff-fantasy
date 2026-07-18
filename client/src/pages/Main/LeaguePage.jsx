import { PageHeader } from "../../components/PageHeader";

const panelClasses =
  "flex h-[640px] min-h-0 flex-col rounded-[14px] border border-slate-400/15 bg-slate-900/75 p-[18px] shadow-panel backdrop-blur-[10px] max-[900px]:h-auto max-[900px]:min-h-[420px]";

export default function LeagueDashboard() {
  return (
    <div>
      <PageHeader />

      <div className="mx-auto flex max-w-[1200px] items-start gap-[18px] px-6 pb-6 pt-[100px] max-[900px]:flex-col">
        <div className={`${panelClasses} min-w-[340px] flex-[1.35] max-[900px]:w-full max-[900px]:min-w-0`}>
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-base tracking-[0.12em] text-gray-200/85">LEADERBOARD</h2>
          </div>
          <hr className="mb-3.5 mt-3 w-full border-0 border-t border-slate-400/15" />

          <div className="min-h-0 flex-1 overflow-auto">
            <p className="m-0 text-gray-200/70">
              This will be the leaderboard with each team in order of score
            </p>
          </div>
        </div>

        <div className={`${panelClasses} min-w-[300px] flex-1 max-[900px]:w-full max-[900px]:min-w-0`}>
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-base tracking-[0.12em] text-gray-200/85">BEN'S TEAM</h2>
          </div>
          <hr className="mb-3.5 mt-3 w-full border-0 border-t border-slate-400/15" />

          <div className="min-h-0 flex-1 overflow-auto">
            <p className="m-0 text-gray-200/70">
              This will be a list of everyone on the selected team (selected on the right...)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
