import { useEffect, useState } from "react";
import { supabase } from "../../clients/supabaseClient";
import { PageHeader } from "../../components/PageHeader";
import { LeagueCard } from "../../components/LeagueCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
//This funciton is going to have to make a call to the database to find some basic infomration about all the leagues the user is in (dummy data below to test how things look)
  const navigate = useNavigate();
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

  if (!profile) return <div className="grid min-h-screen place-items-center px-4 py-8">Loading...</div>;

  //temporary function to handle leauge clicks - 
  //will eventually go to another page that describes the league and your team (and other teams)
  const handleLeagueClick = (league) => { 
    alert(
      `League: ${league.name}\nPlayers: ${league.playersCount}\nYour Place: #${league.yourPlace}`
    );
  };

  const handleCreateClick = () => {
    navigate("/createleague");
  }

  return (
    <div>
      <PageHeader />

      <div className="mx-auto flex max-w-[1200px] items-start justify-center gap-[18px] px-6 pb-6 pt-[100px] max-[900px]:flex-col">
        <div className="flex h-[640px] min-h-[520px] w-[640px] max-w-[92vw] flex-col rounded-[14px] border border-slate-400/15 bg-slate-900/75 p-[18px] shadow-panel backdrop-blur-[10px]">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-base tracking-[0.12em] text-gray-200/85">LEAGUES</h2>

            <button
              type="button"
              className="cursor-pointer rounded-full border border-green-500/45 bg-green-500/15 px-3.5 py-1.5 text-[0.85rem] font-semibold tracking-[0.02em] text-gray-200/95 transition duration-[120ms] hover:border-green-500/70 hover:bg-green-500/20 active:scale-[0.97]"
              onClick={() => handleCreateClick()}
            >
              + Create
            </button>
          </div>
          <hr className="my-3.5 w-full border-0 border-t border-slate-400/15" />

          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1.5 [scrollbar-color:rgba(148,163,184,0.25)_transparent] [scrollbar-width:thin]">
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
