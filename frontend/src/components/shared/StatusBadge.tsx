import { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  type?: "success" | "warning" | "error" | "info" | "live";
  className?: string;
}

export default function StatusBadge({ children, type = "info", className = "" }: StatusBadgeProps) {
  const styles = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-red-50 text-red-600 border-red-100",
    info: "bg-slate-50 text-slate-600 border-slate-100",
    live: "bg-cyan-50 text-brand-cyan border-brand-cyan/20",
  };

  return (
    <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 ${styles[type]} ${className}`}>
      {type === "live" && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />}
      {children}
    </div>
  );
}
