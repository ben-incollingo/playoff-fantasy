import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";

export default function RequireVerified({ children }) { 
  const navigate = useNavigate();
  const [ok, setOk] = useState(false); //flag that deciedes whether or not you can see the homepage

  useEffect(() => {
    const checkIfVerified = async () => {
      const { data } = await supabase.auth.getUser(); //asks supabase “Based on the saved session in this browser, who is currently logged in?
      const user = data?.user; //if user data exists, grab it.  If it exists, it will have all the data on the users account creation, if it does not exist, it will be null/undefined

      if (!user) { //if there is no user found that is logged in(user is null/undefined), just reroute to the login page
        navigate("/login");
        return;
      }

      if (!user.email_confirmed_at) { //is a user is found, but there is no value for the date the email was cofirmed 
        localStorage.setItem("pending_verify_email", user.email || "");
        navigate("/verify"); //navigate to the verify page.
        return;
      }

      setOk(true); //if there is a user and it is verified (meaning it got past both of the last 2 if-statements) then set ok to true.
    };

    checkIfVerified(); //runs the above function to see if the user is verified
  }, [navigate]);

  if (!ok) return null; // keep it blank while checking
  return children; //if the function runs all the way through, it will return the homepage to the user.
}
