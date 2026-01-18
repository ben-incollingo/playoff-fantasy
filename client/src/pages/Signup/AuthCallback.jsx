import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      // If this is a PKCE/code flow, exchange it:
      const url = new URL(window.location.href); //Creates a URL object from the currecnt page URL osso you can easily read query parameters
      const code = url.searchParams.get("code"); // extracts the code from url query string
                                                 // if the URL looks like http://localhost:3000/auth/callback/code=abc123
                                                 // then it will be able to extract abc123
      if (code) { //if the code is succesfully found, then you can exchange the code for supabase to store a login session in the browser for the user.
        await supabase.auth.exchangeCodeForSession(window.location.search); //window.location.search is just the code portion of the URL
      }

      const { data } = await supabase.auth.getUser(); //now you can ask supabase "Based on the session in this browser, who is the current user?"
      const user = data?.user; //this gets the user data

      if (!user) { //if there is no user data (fail), then go back to the login page and exit the function
        navigate("/login");
        return;
      }

      
      if (!user.email_confirmed_at) { // if there is a user but they are not verified then go to the verify page
        localStorage.setItem("pending_verify_email", user.email || ""); //set the email in local storage so the user can resend the email if they would like
        navigate("/verify"); 
        return;
      }

      // Create/update profile row now that they're verified
      await supabase.from("profiles").upsert({ //now that the user is verified we add the user to the profiles.public table
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || null,
      });

      localStorage.removeItem("pending_verify_email"); //remove the eamil from local stroage to keep it clean
      navigate("/"); 
    };

    run();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Finishing sign-in...</h2>
      </div>
    </div>
  );
}
