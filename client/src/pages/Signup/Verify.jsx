import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { 
    // load the stored email in case user wants to resend to their email
    const loadEmail = async () => {
      const { data } = await supabase.auth.getUser(); // attempts to get email from supabase logged-in user eamil first - asks supabase "Based on the saved session in this browser, who is currently logged in?"
      const user = data?.user;

      if (user?.email) { //if there is an email, set email to the email found
        setEmail(user.email);
        // keep localStorage in sync in case the session disappears
        localStorage.setItem("pending_verify_email", user.email); //set the correct email to the local storage
        return; //exit function with correct email
      }

      // fallback to localStorage if no logged-in user
      const storedEmail = localStorage.getItem("pending_verify_email") || ""; //get correct email from local storage if supabase logged-in user fails
      setEmail(storedEmail); //again, set the email variable

      if (!storedEmail) { // if there is no email found from either method then ask the user to sign in again.
        setMsg("No email found. Please log in or sign up again.");
      }
    };

    loadEmail();
  }, []);

  useEffect(() => { // every 3 seconds, recheck to see if the user verified their email. 
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getUser(); // asks supabase "Based on the saved session in this browser, who is currently logged in?"
      const user = data?.user; // checks response

      if (user?.email_confirmed_at) {
        localStorage.removeItem("pending_verify_email"); // clears the local storage because the user is no longer pending verification
        navigate("/"); // if email is verified, it reroutes to the homepage - has to go through the Require Verification page to check again.
      }
    }, 3000); // check every 3 seconds

    return () => clearInterval(interval); // clears the time loop to stop weird behavior and memory leaks
  }, [navigate]);

  const resend = async () => { // function for user resending verification email
    setMsg("");

    if (!email) { // if there is no email from Supabase or localStorage, user must log in again
      setMsg("No email found. Please log in or sign up again.");
      return;
    }

    const { error } = await supabase.auth.resend({  // function call to supabase for resending the auth/verification email to the user.
      type: "signup",
      email, // users email
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`, // this tells is the base site (in dev its localhost) and in production it will be my domain.
      },
    });

    if (error) {
      setMsg(error.message); // show supabase's error if they throw one.
    } else {
      setMsg("Verification email resent.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Verify your email</h2>

        <p style={{ textAlign: "center" }}>
          Please verify your email to continue.
        </p>

        {email && (
          <p
            style={{
              textAlign: "center",
              color: "var(--color-muted)",
              fontSize: "0.9rem",
            }}
          >
            Sent to: <b>{email}</b>
          </p>
        )}

        <button
          type="button"
          className="secondary-btn"
          onClick={resend}
          disabled={!email}
          style={!email ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
        >
          Resend verification email
        </button>

        {msg && (
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
