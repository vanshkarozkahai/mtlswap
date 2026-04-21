"use client";

import { LayoutDashboard, Lock, ShieldAlert } from "lucide-react";
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
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Navbar />
        <div className="p-8 rounded-full border-b-2 border-brand-cyan animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
          <Lock className="text-red-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-slate-900">Admin Access Required</h1>
        <p className="text-slate-500 max-w-md mb-8">
          You must be connected with a protocol administrator wallet to access this section.
        </p>
        <StatusBadge type="error">Access Denied</StatusBadge>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 pt-32 pb-12 selection:bg-brand-cyan/20">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="text-brand-cyan" size={32} />
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">Protocol Hub</h1>
            </div>
            <p className="text-slate-500 font-medium">Global administration and diagnostic console</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <StatusBadge type="live">Live Monitor</StatusBadge>
             <StatusBadge type="success" className="bg-cyan-50">Admin Connected</StatusBadge>
             <StatusBadge type={isIssuer ? "info" : "success"} className={isIssuer ? "bg-blue-50" : "bg-emerald-50"}>
               Role: {isIssuer ? "Issuer" : "Market Maker"}
             </StatusBadge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-8"
          >
            {!isIssuer && <WalletInitCard />}
            <MintCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full -mr-16 -mt-16 group-hover:bg-cyan-100 transition-colors" />
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Orderbook Controls</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Initialize the Traditional DEX orderbook to enable real network swaps.</p>
                  
                  {isIssuer ? (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                      <div className="text-xs text-amber-700 leading-relaxed">
                        <strong>Issuer Restriction:</strong> Switch to your Market Maker wallet to seed liquidity. Issuers cannot hold tokens to sell.
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
                    className="text-brand-cyan font-bold text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Seed DEX Liquidity
                  </button>
               </div>
               <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full -mr-16 -mt-16 group-hover:bg-cyan-100 transition-colors" />
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Security Audit</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Review contract interactions and suspicious ledger activity</p>
                  <button className="text-brand-cyan font-bold text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
                    View Logs
                  </button>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <PreflightCheck />
            <div className="mt-8 p-6 rounded-[32px] bg-red-50 border border-red-100 flex items-start gap-4">
               <ShieldAlert className="text-red-600 mt-1" size={20} />
               <div>
                  <h4 className="text-sm font-bold text-red-600 mb-1">Danger Zone</h4>
                  <p className="text-xs text-red-500/60 leading-relaxed font-medium">
                    Functions in this area can permanently alter protocol state. Proceed with extreme caution.
                  </p>
                  <button className="mt-4 text-xs font-bold text-red-600 bg-red-100 px-4 py-2 rounded-xl hover:bg-red-200 transition-all active:scale-[0.95]">
                    Pause Protocol
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
