export const authInputClasses =
  "mb-3 w-full rounded-[10px] border border-slate-400/20 bg-slate-950/45 px-3 py-[11px] text-gray-200 outline-none transition duration-[120ms] placeholder:text-gray-200/55 focus:border-green-500/55 focus:ring-4 focus:ring-green-500/35";

export const primaryButtonClasses =
  "mt-1.5 w-full cursor-pointer rounded-[10px] bg-gradient-to-b from-green-500 to-green-600 px-3 py-[11px] font-semibold text-[#06120c] shadow-[0_10px_25px_rgba(34,197,94,0.18)] transition duration-[120ms] hover:-translate-y-px hover:brightness-105 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none";

export const secondaryButtonClasses =
  "mt-2.5 w-full cursor-pointer rounded-[10px] border border-slate-400/20 bg-slate-400/10 px-3 py-[11px] font-semibold text-gray-200 transition duration-[120ms] hover:-translate-y-px hover:brightness-110 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none";

export default function AuthCard({ children, as: Component = "div", onSubmit }) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-8 before:pointer-events-none before:fixed before:inset-0 before:bg-[radial-gradient(800px_500px_at_20%_20%,rgba(34,197,94,0.10),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(59,130,246,0.10),transparent_60%),repeating-linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.03)_2px,transparent_2px,transparent_10px)] before:opacity-55">
      <Component
        className="relative z-10 w-full max-w-[360px] rounded-[14px] border border-slate-400/20 bg-slate-900/70 px-6 py-7 shadow-panel backdrop-blur-[10px] [&_h2]:mb-[18px] [&_h2]:mt-0 [&_h2]:text-center [&_h2]:tracking-[0.2px] [&_p]:text-gray-200/70 [&_a]:text-green-500/95 [&_a]:no-underline hover:[&_a]:underline"
        onSubmit={onSubmit}
      >
        {children}
      </Component>
    </div>
  );
}
