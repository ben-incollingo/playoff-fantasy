import { useEffect, useState } from "react";
import { supabase } from "../../clients/supabaseClient";

export default function Home() {
  const [profile, setProfile] = useState(null);

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Homepage</h1>
      <p><b>Username:</b> {profile.username}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Created:</b> {new Date(profile.created_at).toLocaleString()}</p>
    </div>
  );
}
