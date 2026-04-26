"use client";

import { LayoutDashboard, Lock, ShieldAlert, Activity } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import { useAdmin } from "@/hooks/useAdmin";
import MintCard from "@/components/admin/MintCard";
import WalletInitCard from "@/components/admin/WalletInitCard";
import PreflightCheck from "@/components/admin/PreflightCheck";
import StatusBadge from "@/components/shared/StatusBadge";
import { motion } from "framer-motion";
import { useBlockchain } from "@/hooks/useBlockchain";
import { ISSUER_ADDRESS } from "@/lib/blockchain";
import { AlertCircle } from "lucide-react";

export default function AdminPage() {
  const { isAdmin, loading, seedDEXLiquidity } = useAdmin();
  const { address } = useBlockchain();
  
  const isIssuer = address === ISSUER_ADDRESS;

  if (loading) {
    return (
      <div className="min-h-screen bg-industrial-charcoal flex flex-col items-center justify-center">
        <Navbar />
        <div className="p-8 plate border-b-2 border-industrial-silver animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-industrial-charcoal flex flex-col items-center justify-center p-6 text-center font-mono">
        <Navbar />
        <div className="w-20 h-20 recessed flex items-center justify-center mb-6">
          <Lock className="text-industrial-silver" size={40} />
        </div>
        <h1 className="text-3xl font-black mb-4 text-industrial-silver uppercase tracking-tighter">ACCESS_RESTRICTED</h1>
        <p className="text-industrial-gray max-w-md mb-8 uppercase text-[10px] leading-tight">
          PROTOCOL_ADMINISTRATOR_WALLET_REQUIRED. ESTABLISH_AUTHORIZED_CONNECTION_TO_PROCEED.
        </p>
        <StatusBadge type="error">DENIED</StatusBadge>
      </div>
    );
  }

  return (
    <div className="bg-industrial-charcoal min-h-screen text-industrial-silver pt-32 pb-12 font-mono">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-industrial-silver" size={32} />
              <h1 className="text-4xl font-black tracking-tighter text-industrial-silver uppercase">ADMIN_CONSOLE</h1>
            </div>
            <p className="text-industrial-gray font-black uppercase text-[10px]">GLOBAL_ADMINISTRATION_AND_DIAGNOSTIC_HUB</p>
          </div>
          <div className="flex flex-wrap gap-2">
             <StatusBadge type="live">LIVE_MONITOR</StatusBadge>
             <StatusBadge type="success">ADMIN_LINK_ESTABLISHED</StatusBadge>
             <StatusBadge type={isIssuer ? "info" : "success"}>
               ROLE: {isIssuer ? "ISSUER" : "MARKET_MAKER"}
             </StatusBadge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-8 space-y-8"
          >
            {!isIssuer && <WalletInitCard />}
            <MintCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-industrial-steel p-8 border border-industrial-border relative overflow-hidden group">
                  <h3 className="text-lg font-black mb-2 text-industrial-silver uppercase tracking-tight">ORDERBOOK_REGISTRY</h3>
                  <p className="text-[10px] text-industrial-gray mb-6 font-black uppercase leading-tight">INITIALIZE_TRADITIONAL_DEX_LIQUIDITY_FABRIC.</p>
                  
                  {isIssuer ? (
                    <div className="recessed p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="text-industrial-gray shrink-0 mt-0.5" size={16} />
                      <div className="text-[9px] text-industrial-gray leading-tight uppercase font-black">
                        <strong>ISSUER_RESTRICTION:</strong> SWITCH_TO_MARKET_MAKER_IDENTITY.
                      </div>
                    </div>
                  ) : null}

                  <button 
                    disabled={isIssuer}
                    onClick={async () => {
                      try {
                        await seedDEXLiquidity();
                      } catch (err) {
                        // Handled by hook toasts
                      }
                    }}
                    className="text-industrial-silver font-black text-xs tracking-widest uppercase flex items-center gap-2 hover:brightness-125 transition-all"
                  >
                    SEED_DEX_LIQUIDITY
                  </button>
               </div>
               <div className="bg-industrial-steel p-8 border border-industrial-border relative overflow-hidden group">
                  <h3 className="text-lg font-black mb-2 text-industrial-silver uppercase tracking-tight">SECURITY_LOGS</h3>
                  <p className="text-[10px] text-industrial-gray mb-6 font-black uppercase leading-tight">AUDIT_CONTRACT_INTERACTIONS_AND_NETWORK_STATE.</p>
                  <button className="text-industrial-silver font-black text-xs tracking-widest uppercase flex items-center gap-2 hover:brightness-125 transition-all">
                    VIEW_AUDIT_TRAIL
                  </button>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:col-span-4"
          >
            <PreflightCheck />
            <div className="mt-8 p-6 plate border-industrial-border flex items-start gap-4 bg-industrial-charcoal">
               <ShieldAlert className="text-industrial-silver mt-1" size={20} />
               <div>
                  <h4 className="text-xs font-black text-industrial-silver mb-1 uppercase">CRITICAL_ACTION_ZONE</h4>
                  <p className="text-[9px] text-industrial-gray leading-tight uppercase font-black">
                    FUNCTIONS_IN_THIS_MODULE_PERMANENTLY_ALTER_STATE. PROCEED_WITH_CAUTION.
                  </p>
                  <button className="btn-industrial mt-4 text-[10px] font-black px-4 py-2">
                    SUSPEND_PROTOCOL
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
