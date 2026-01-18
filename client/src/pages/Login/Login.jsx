import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => { //function to handle login
    e.preventDefault(); //prevents defaul browser behavior - which would be refreshing the screen after submitting
    setMsg("");
    setLoading(true); //when the user submits their credentials the loading state will be set to true

    const { data, error } = await supabase.auth.signInWithPassword({ //using supabase to login
      email,
      password,
    });

    setLoading(false); //once supabase starts users session or fails, end loading

    if (error) { // if error, display error message
      setMsg(error.message);
      return;
    }

    const user = data?.user; //create variable to hold user information - gets this data from signInWithPassword function call

    localStorage.setItem("pending_verify_email", email);   // keep email around so /verify can resend if user wants to

    
    if (!user?.email_confirmed_at) { //if the user is not verified, autmatically send them to the verify page
      navigate("/verify");
      return; //return from function
    }

    //if the user is verified, send them to the home page - has to go through the Require Verified anyways so the above if statement seems redundant but it works so i dont care
    localStorage.removeItem("pending_verify_email");
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/signup")}
          disabled={loading}
        >
          Sign Up
        </button>

        {msg && (
          <p style={{ marginTop: "1rem", textAlign: "center" }}>{msg}</p>
        )}
      </form>
    </div>
  );
}
