import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import VerifyEmail from "./pages/Signup/Verify";
import AuthCallback from "./pages/Signup/AuthCallback";
import Home from "./pages/Main/Home";
import RequireVerified from "./pages/Signup/RequireVerified";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/"
          element={
            <RequireVerified>
              <Home />
            </RequireVerified>
          }
        />

        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  );
}
