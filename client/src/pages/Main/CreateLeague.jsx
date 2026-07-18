import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";

export default function CreateLeague() {
  //This page will need to call/update the database with everyone in this new league...
  //People will have to accept the invite on their end?
  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState("");

  const [showConfirm, setShowConfirm] = useState(false); // controls popup

  const addMember = () => {
    setMsg("");
    const name = usernameInput.trim();

    if (!name) {
      setMsg("Enter a username before adding.");
      return;
    }

    const exists = members.some((m) => m.toLowerCase() === name.toLowerCase());
    if (exists) {
      setMsg("That username is already added.");
      return;
    }

    setMembers((prev) => [name, ...prev]);
    setUsernameInput("");
  };

  const removeMember = (name) => {
    setMembers((prev) => prev.filter((m) => m !== name));
  };

  const openConfirm = (e) => {
    e.preventDefault();
    setMsg("");

    if (!leagueName.trim()) {
      setMsg("League name is required.");
      return;
    }

    // open the confirmation popup
    setShowConfirm(true);
  };

  const confirmAndContinue = () => {
    // later: send to DB here
    setShowConfirm(false);
    navigate("/"); // for now, just go back home
  };

  return (
    <div>
      <PageHeader />

      <div className="flex justify-center px-6 pb-6 pt-[100px]">
        <div className="flex min-h-[520px] w-[1000px] max-w-[95vw] flex-col rounded-[14px] border border-slate-400/15 bg-slate-900/75 p-[22px] shadow-panel backdrop-blur-[10px]">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-base tracking-[0.12em] text-gray-200/85">CREATE LEAGUE</h2>
          </div>

          <hr className="mb-[18px] mt-3.5 w-full border-0 border-t border-slate-400/15" />

          <form className="flex flex-col gap-4" onSubmit={openConfirm}>
            {/* League name */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] tracking-[0.02em] text-gray-200/80">League Name</label>
              <input
                className="w-full rounded-[10px] border border-slate-400/20 bg-slate-950/35 px-3 py-[11px] text-gray-200 outline-none transition duration-[120ms] placeholder:text-gray-200/50 focus:border-green-500/55 focus:ring-4 focus:ring-green-500/20"
                placeholder="Ex: Temple Playoff League"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </div>

            {/* Add members row */}
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] tracking-[0.02em] text-gray-200/80">Add Members (by username)</label>

              <div className="flex gap-2.5">
                <input
                  className="w-full rounded-[10px] border border-slate-400/20 bg-slate-950/35 px-3 py-[11px] text-gray-200 outline-none transition duration-[120ms] placeholder:text-gray-200/50 focus:border-green-500/55 focus:ring-4 focus:ring-green-500/20"
                  placeholder="Enter a username..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMember();
                    }
                  }}
                />

                <button type="button" className="shrink-0 cursor-pointer rounded-[10px] border border-green-500/45 bg-green-500/15 px-3.5 py-2.5 font-bold text-gray-200/95 transition duration-[120ms] hover:bg-green-500/25 hover:brightness-105 active:scale-[0.98]" onClick={addMember}>
                  Add
                </button>
              </div>
            </div>

            {/* Embedded widget: member list */}
            <div className="rounded-xl border border-slate-400/15 bg-slate-950/30 p-3">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="text-sm font-bold text-gray-200/90">Invited Users</div>
                <div className="rounded-full border border-slate-400/15 bg-slate-400/10 px-2.5 py-1 text-xs text-gray-200/70">{members.length}</div>
              </div>

              {members.length === 0 ? (
                <div className="px-1.5 py-2.5 text-sm text-gray-200/70">No users added yet.</div>
              ) : (
                <div className="flex max-h-[180px] flex-col gap-2 overflow-y-auto pr-1.5">
                  {members.map((name) => (
                    <div key={name} className="flex items-center justify-between rounded-[10px] border border-slate-400/15 bg-slate-900/55 p-2.5">
                      <span className="font-semibold text-gray-200/90">{name}</span>
                      <button
                        type="button"
                        className="cursor-pointer rounded-lg border-0 bg-transparent px-1.5 py-1 text-base text-gray-200/70 hover:bg-slate-400/10 hover:text-gray-200/95"
                        onClick={() => removeMember(name)}
                        aria-label={`Remove ${name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit -> opens modal */}
            <button type="submit" className="mt-1.5 w-full cursor-pointer rounded-xl border-0 bg-gradient-to-b from-green-500 to-green-600 px-3.5 py-3 font-extrabold text-[#06120c] hover:brightness-105">
              Create League
            </button>

            {msg && <p className="m-0 text-center text-[0.92rem] text-red-500">{msg}</p>}
          </form>
        </div>
      </div>

      {/* =========================
          Confirmation Modal Popup
          ========================= */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[999] grid place-items-center bg-black/55 p-[18px]"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-[620px] max-w-[95vw] rounded-[14px] border border-slate-400/20 bg-slate-900/90 p-[18px] shadow-modal backdrop-blur-[10px]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h3 className="mb-1.5 mt-0 text-gray-200/95">Confirm League Details</h3>
            <p className="mb-3.5 mt-0 text-gray-200/70">
              Make sure everything looks right before continuing.
            </p>

            <div className="mb-3 rounded-xl border border-slate-400/15 bg-slate-950/35 p-3">
              <div className="mb-1.5 text-xs tracking-[0.04em] text-gray-200/70">League Name</div>
              <div className="font-bold text-gray-200/90">{leagueName}</div>
            </div>

            <div className="mb-3 rounded-xl border border-slate-400/15 bg-slate-950/35 p-3">
              <div className="mb-1.5 text-xs tracking-[0.04em] text-gray-200/70">Invited Users</div>

              {members.length === 0 ? (
                <div className="font-semibold text-gray-200/70">None</div>
              ) : (
                <div className="mt-1 flex flex-wrap gap-2">
                  {members.map((m) => (
                    <div key={m} className="rounded-full border border-slate-400/15 bg-slate-400/10 px-2.5 py-1.5 text-[0.85rem] font-semibold text-gray-200/90">
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3.5 flex justify-end gap-2.5">
              <button
                type="button"
                className="cursor-pointer rounded-xl border border-slate-400/20 bg-slate-400/10 px-3.5 py-3 font-extrabold text-gray-200 hover:brightness-105"
                onClick={() => setShowConfirm(false)}
              >
                Back
              </button>

              <button
                type="button"
                className="mt-1.5 w-full cursor-pointer rounded-xl border-0 bg-gradient-to-b from-green-500 to-green-600 px-3.5 py-3 font-extrabold text-[#06120c] hover:brightness-105"
                onClick={confirmAndContinue}
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
