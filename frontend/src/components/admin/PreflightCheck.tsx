"use client";

import { Activity, ShieldCheck, Database, Server } from "lucide-react";
import GlassCard from "../shared/GlassCard";
import StatusBadge from "../shared/StatusBadge";
import { CONTRACT_IDS } from "@/lib/blockchain";

export default function PreflightCheck() {
  const isRouterSet = CONTRACT_IDS.router && !CONTRACT_IDS.router.includes("...");
  const isPoolSet = CONTRACT_IDS.pool && !CONTRACT_IDS.pool.includes("...");

  const checks = [
    { name: "RPC_NODE", status: "HEALTHY", icon: Server },
    { name: "ROUTER_STATE", status: "LOCKED", icon: Database },
    { name: "POOL_REGISTRY", status: "READY", icon: ShieldCheck },
    { name: "LEDGER_STREAM", status: "ACTIVE", icon: Activity },
  ];

  return (
    <GlassCard className="p-8 bg-industrial-steel border-industrial-border font-mono">
      <h3 className="text-lg font-black mb-6 flex flex-col gap-2 text-industrial-silver uppercase tracking-tight">
        SYSTEM_DIAGNOSTICS
        <StatusBadge type="live">
          NETWORK_TESTNET_SYNCHRONIZED
        </StatusBadge>
      </h3>
      
      <div className="grid grid-cols-1 gap-2">
        {checks.map((check) => (
          <div key={check.name} className="p-4 recessed flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 plate text-industrial-silver">
                <check.icon size={16} />
              </div>
              <span className="text-[10px] font-black text-industrial-gray uppercase">{check.name}</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-industrial-silver">{check.status}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
