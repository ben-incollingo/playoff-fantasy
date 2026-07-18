import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeader";
import "./CreateLeague.css";

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

      <div className="centerPage">
        <div className="centerWidget">
          <div className="centerWidget-header">
            <h2 className="centerWidget-title">CREATE LEAGUE</h2>
          </div>

          <hr className="centerWidget-divider" />

          <form className="createForm" onSubmit={openConfirm}>
            {/* League name */}
            <div className="formGroup">
              <label className="formLabel">League Name</label>
              <input
                className="formInput"
                placeholder="Ex: Temple Playoff League"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </div>

            {/* Add members row */}
            <div className="formGroup">
              <label className="formLabel">Add Members (by username)</label>

              <div className="addRow">
                <input
                  className="formInput"
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

                <button type="button" className="addBtn" onClick={addMember}>
                  Add
                </button>
              </div>
            </div>

            {/* Embedded widget: member list */}
            <div className="membersWidget">
              <div className="membersHeader">
                <div className="membersTitle">Invited Users</div>
                <div className="membersCount">{members.length}</div>
              </div>

              {members.length === 0 ? (
                <div className="membersEmpty">No users added yet.</div>
              ) : (
                <div className="membersList">
                  {members.map((name) => (
                    <div key={name} className="memberItem">
                      <span className="memberName">{name}</span>
                      <button
                        type="button"
                        className="removeBtn"
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
            <button type="submit" className="primaryAction">
              Create League
            </button>

            {msg && <p className="formMsg">{msg}</p>}
          </form>
        </div>
      </div>

      {/* =========================
          Confirmation Modal Popup
          ========================= */}
      {showConfirm && (
        <div
          className="modalOverlay"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="modalCard"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h3 className="modalTitle">Confirm League Details</h3>
            <p className="modalMuted">
              Make sure everything looks right before continuing.
            </p>

            <div className="confirmBlock">
              <div className="confirmLabel">League Name</div>
              <div className="confirmValue">{leagueName}</div>
            </div>

            <div className="confirmBlock">
              <div className="confirmLabel">Invited Users</div>

              {members.length === 0 ? (
                <div className="confirmValue muted">None</div>
              ) : (
                <div className="confirmList">
                  {members.map((m) => (
                    <div key={m} className="confirmPill">
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modalActions">
              <button
                type="button"
                className="secondaryAction"
                onClick={() => setShowConfirm(false)}
              >
                Back
              </button>

              <button
                type="button"
                className="primaryAction"
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
