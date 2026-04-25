import { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  type?: "success" | "warning" | "error" | "info" | "live";
  className?: string;
}

export default function StatusBadge({ children, type = "info", className = "" }: StatusBadgeProps) {
  const styles = {
    success: "bg-emerald-950/20 text-emerald-600 border-emerald-900/30",
    warning: "bg-amber-950/20 text-amber-400 border-amber-900/30",
    error: "bg-red-950/20 text-red-400 border-red-900/30",
    info: "bg-black text-slate-400 border-white/10",
    live: "bg-cyan-950/20 text-brand-cyan border-brand-cyan/20",
  };

  return (
    <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 ${styles[type]} ${className}`}>
      {type === "live" && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />}
      {children}
    </div>
  );
}
