import { useEffect, useState } from "react";
import { supabase } from "../../clients/supabaseClient";
import { PageHeader } from "../../components/PageHeader";
import { LeagueCard } from "../../components/LeagueCard";
import "./Home.css"; //look here for styling

export default function Home() {
  const [profile, setProfile] = useState(null);

  const leagues = [
    { id: "1", name: "Temple Playoff League", playersCount: 12, yourPlace: 3 },
    { id: "2", name: "Roommates League", playersCount: 8, yourPlace: 1 },
    { id: "3", name: "Work League", playersCount: 10, yourPlace: 6 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },
    { id: "4", name: "Another League", playersCount: 10, yourPlace: 2 },

  ];

  useEffect(() => {
    const run = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      const { data } = await supabase
        .from("profiles")
        .select("username, email, created_at")
        .eq("id", user.id)
        .single();

      setProfile(data);
    };

    run();
  }, []);

  if (!profile) return <div className="login-container">Loading...</div>;

  //temporary function to handle leauge clicks - 
  //will eventually go to another page that describes the league and your team (and other teams)
  const handleLeagueClick = (league) => { 
    alert(
      `League: ${league.name}\nPlayers: ${league.playersCount}\nYour Place: #${league.yourPlace}`
    );
  };

  return (
    <div>
      <PageHeader />

      <div className="dashboard">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">LEAGUES</h2>

            <button
              type="button"
              className="create-league-btn"
              onClick={() => alert("Coming Soon!")}
            >
              + Create
            </button>
          </div>
          <hr className="panel-divider" />

          <div className="league-list">
            {leagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onClick={() => handleLeagueClick(league)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
