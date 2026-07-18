import { PageHeader } from "../../components/PageHeader";
import "./LeaguePage.css";

export default function LeagueDashboard() {

  //This page is going to need to call the database to get a list of all the teams in the league in order of score
  //This page is also going to need to have a function to call the database and get everyone on the selected players team.
  return (
    <div>
      <PageHeader />

      <div className="leagueDash">
        <div className="leagueDash-panel leagueDash-left">
          <div className="leagueDash-panelHeader">
            <h2 className="leagueDash-title">LEADERBOARD</h2>
          </div>
          <hr className="leagueDash-divider" />

          <div className="leagueDash-body">
            <p className="leagueDash-muted">
              This will be the leaderboard with each team in order of score
            </p>
          </div>
        </div>

        <div className="leagueDash-panel leagueDash-right">
          <div className="leagueDash-panelHeader">
            <h2 className="leagueDash-title">BEN'S TEAM</h2>
          </div>
          <hr className="leagueDash-divider" />

          <div className="leagueDash-body">
            <p className="leagueDash-muted">
              This will be a list of everyone on the selected team (selected on the right...)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
