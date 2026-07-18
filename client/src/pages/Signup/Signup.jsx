import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";
import AuthCard, { authInputClasses, primaryButtonClasses } from "../../components/AuthCard";

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
    <AuthCard as="form" onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <input className={authInputClasses} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      <input className={authInputClasses} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input className={authInputClasses} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
      <input className={authInputClasses} type="password" placeholder="Confirm Password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} required autoComplete="new-password" />

      <button type="submit" className={primaryButtonClasses}>Create Account</button>
      {msg && <p className="mt-4 text-center text-[0.92rem] !text-red-500">{msg}</p>}
    </AuthCard>
  );
}
