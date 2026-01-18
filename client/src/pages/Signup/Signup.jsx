import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => { //function that runs when form is submitted
    e.preventDefault(); //prevents browsers default behavior - which would be refreshing the screen after submitting
    setMsg("");

    // frontend validation: passwords must match
    if (password !== confirmedPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({ //function to call to sign up user on auth.users table
      email,
      password,
      options: { 
        data: { username }, //provides a username - can access this later with muser.user_metadata.username
        emailRedirectTo: `${window.location.origin}/auth/callback`, //tells the verification eamil to have the /auth/callback route when clicked
      },
    });

    if (error) { //display when there is an error from supabase
      setMsg(error.message);
      return;
    }

    localStorage.setItem("pending_verify_email", email); //set the email to local storage so that the user can resent eamil in verify page if they want

    // Force user to verify before doing anything else
    navigate("/verify");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <button type="submit" className="primary-btn">
          Create Account
        </button>

        {msg && <p className="error-msg">{msg}</p>}
      </form>
    </div>
  );
}
