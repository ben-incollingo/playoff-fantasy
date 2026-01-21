import { useNavigate } from "react-router-dom";
import "./PageHeader.css";

export function PageHeader() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate("/")}>
        <img
          src="/TheFinalStretch-LongLogo.png"
          alt="The Final Stretch"
          className="header-logo"
        />
      </div>

      <div className="header-right">
        {/* Placeholder for later (user menu, logout, etc.) */}
      </div>
    </header>
  );
}
