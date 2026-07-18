import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../clients/supabaseClient";
import AuthCard, { secondaryButtonClasses } from "../../components/AuthCard";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadEmail = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user?.email) {
        setEmail(user.email);
        localStorage.setItem("pending_verify_email", user.email);
        return;
      }

      const storedEmail = localStorage.getItem("pending_verify_email") || "";
      setEmail(storedEmail);

      if (!storedEmail) {
        setMsg("No email found. Please log in or sign up again.");
      }
    };

    loadEmail();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user?.email_confirmed_at) {
        localStorage.removeItem("pending_verify_email");
        navigate("/");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const resend = async () => {
    setMsg("");

    if (!email) {
      setMsg("No email found. Please log in or sign up again.");
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setMsg(error ? error.message : "Verification email resent.");
  };

  return (
    <AuthCard>
      <h2>Verify your email</h2>

      <p className="text-center">Please verify your email to continue.</p>

      {email && (
        <p className="text-center text-sm !text-gray-200/70">
          Sent to: <b>{email}</b>
        </p>
      )}

      <button
        type="button"
        className={secondaryButtonClasses}
        onClick={resend}
        disabled={!email}
      >
        Resend verification email
      </button>

      {msg && <p className="mt-4 text-center">{msg}</p>}
    </AuthCard>
  );
}
