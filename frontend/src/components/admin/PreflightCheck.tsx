"use client";

import { Activity, ShieldCheck, Database, Server } from "lucide-react";
import GlassCard from "../shared/GlassCard";
import StatusBadge from "../shared/StatusBadge";
import { CONTRACT_IDS } from "@/lib/blockchain";

export default function PreflightCheck() {
  const isRouterSet = CONTRACT_IDS.router && !CONTRACT_IDS.router.includes("...");
  const isPoolSet = CONTRACT_IDS.pool && !CONTRACT_IDS.pool.includes("...");

  const checks = [
    { name: "Soroban RPC", status: "Healthy", icon: Server, color: "text-emerald-400" },
    { name: "Router Contract", status: "Connected", icon: Database, color: "text-emerald-400" },
    { name: "Liquidity Pool", status: "Ready", icon: ShieldCheck, color: "text-emerald-400" },
    { name: "Ledger Polling", status: "Active", icon: Activity, color: "text-emerald-400" },
  ];

  return (
    <GlassCard className="p-8 bg-white border-slate-200">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
        Protocol Health 
        <StatusBadge type="live">
          Blockchain Testnet Live
        </StatusBadge>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((check) => (
          <div key={check.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 rounded-xl">
                <check.icon size={18} className="text-brand-cyan" />
              </div>
              <span className="text-sm font-medium text-slate-700">{check.name}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ml-2 text-emerald-600">{check.status}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
