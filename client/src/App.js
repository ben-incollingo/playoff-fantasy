import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import VerifyEmail from "./pages/Signup/Verify";
import AuthCallback from "./pages/Signup/AuthCallback";
import Home from "./pages/Main/Home";
import RequireVerified from "./pages/Signup/RequireVerified";
import LeaguePage from "./pages/Main/LeaguePage";
import CreateLeague from "./pages/Main/CreateLeague";
import PickTeam from "./pages/Main/PickTeam";

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_700px_at_20%_15%,rgba(34,197,94,0.22),transparent_55%),radial-gradient(900px_600px_at_85%_25%,rgba(59,130,246,0.18),transparent_55%),linear-gradient(135deg,#070b12,#0b1626_45%,#061a16)] font-sans text-gray-200">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<RequireVerified><Home /></RequireVerified>} />
          <Route path="/league" element={<RequireVerified><LeaguePage /></RequireVerified>} />
          <Route path="/createleague" element={<RequireVerified><CreateLeague /></RequireVerified>} />
          <Route path="/pickteam" element={<RequireVerified><PickTeam /></RequireVerified>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
