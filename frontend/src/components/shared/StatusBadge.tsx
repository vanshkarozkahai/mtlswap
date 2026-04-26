import { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  type?: "success" | "warning" | "error" | "info" | "live";
  className?: string;
}

export default function StatusBadge({ children, type = "info", className = "" }: StatusBadgeProps) {
  const styles = {
    success: "bg-industrial-silver text-industrial-charcoal border-industrial-silver",
    warning: "bg-industrial-gray text-industrial-charcoal border-industrial-gray",
    error: "bg-industrial-charcoal text-industrial-gray border-industrial-border",
    info: "bg-industrial-charcoal text-industrial-gray border-industrial-border",
    live: "bg-industrial-charcoal text-industrial-silver border-industrial-silver",
  };

  return (
    <div className={`px-2.5 py-1 rounded-none border text-[9px] font-mono font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${styles[type]} ${className}`}>
      {type === "live" && <span className="w-1.5 h-1.5 bg-industrial-silver animate-pulse" />}
      {children}
    </div>
  );
}
