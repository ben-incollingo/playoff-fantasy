import { useNavigate } from "react-router-dom";

export function PageHeader() {
  const navigate = useNavigate();

  return (
    <header className="z-50 flex h-[74px] w-full items-center justify-between border-b border-slate-400/15 bg-slate-950/65 px-6 backdrop-blur-[10px]">
      <button
        type="button"
        className="group flex items-center"
        onClick={() => navigate("/")}
        aria-label="Go to home page"
      >
        <img
          src="/TheFinalStretch-LongLogo.png"
          alt="The Final Stretch"
          className="h-16 w-auto transition-[filter] duration-[120ms] group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.35)]"
        />
      </button>

      <div className="flex items-center gap-4">
        {/* Placeholder for later (user menu, logout, etc.) */}
      </div>
    </header>
  );
}
