"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Minus, 
  Droplets, 
  Wallet,
  Loader2,
  ArrowRightLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import { useBlockchain } from "@/hooks/useBlockchain";
import { usePoolData } from "@/hooks/usePoolData";
import { useLiquidity } from "@/hooks/useLiquidity";
import Navbar from "@/components/landing/Navbar";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useBalances } from "@/hooks/useBalances";
import { toast } from "sonner";

export default function LiquidityPage() {
  const { address, connect, checkAssetTrust, setupTrustline } = useBlockchain();
  const [activeTab, setActiveTab] = useState<"add" | "remove">("add");
  const { reserves, totalShares, userShares, loading: poolLoading } = usePoolData("XLM", "0", address);
  const { deposit, withdraw, loading: actionLoading } = useLiquidity();
  const { balances, refresh: refreshBalances } = useBalances(address);

  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [removePercent, setRemovePercent] = useState(50);
  
  const [hasTrustB, setHasTrustB] = useState(true);
  const [isCheckingTrust, setIsCheckingTrust] = useState(false);

  // Check trustline for Asset B (MTLSW)
  useEffect(() => {
    const verifyTrust = async () => {
      if (!address) return;
      setIsCheckingTrust(true);
      const trusted = await checkAssetTrust("MTLSW");
      setHasTrustB(trusted);
      setIsCheckingTrust(false);
    };
    verifyTrust();
  }, [address, checkAssetTrust]);

  useEffect(() => {
    if (amountA && reserves) {
      const ratio = Number(reserves.resB) / Number(reserves.resA);
      setAmountB((parseFloat(amountA) * ratio).toFixed(4));
    } else {
      setAmountB("");
    }
  }, [amountA, reserves]);

  const handleDeposit = async () => {
    if (!address) return connect();

    // Step 1: Trustline Check for MTLSW
    if (!hasTrustB) {
      if (balances.XLM < 1.0) {
        toast.error("Insufficient XLM balance to enable token (requires at least 1 XLM)");
        return;
      }
      const success = await setupTrustline("MTLSW");
      if (success) {
        const trusted = await checkAssetTrust("MTLSW", undefined, 5);
        setHasTrustB(trusted);
        refreshBalances();
      }
      return;
    }

    const scaledA = (parseFloat(amountA) * 10000000).toString();
    const scaledB = (parseFloat(amountB) * 10000000).toString();
    await deposit(address, scaledA, scaledB);
  };

  const handleWithdraw = async () => {
    if (!address) return connect();
    const shareToBurn = (userShares * BigInt(removePercent)) / BigInt(100);
    await withdraw(address, shareToBurn.toString());
  };

  return (
    <div className="bg-industrial-charcoal min-h-screen text-industrial-silver pt-32 pb-20 overflow-x-hidden font-mono">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <Droplets className="text-industrial-silver" size={32} />
                 <h1 className="text-4xl font-black uppercase tracking-tighter text-industrial-silver">LIQUIDITY_PROTOCOL</h1>
              </div>
              <p className="text-industrial-gray max-w-lg text-[10px] uppercase leading-tight">
                PROVISION OF ASSETS TO THE AUTOMATED MARKET MAKER REGISTRY. EARN 0.3% TRANSACTION_FEES.
              </p>
           </div>
           <StatusBadge type="live">XLM / MTLSW POOL</StatusBadge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                 
                 {/* Liquidity Management Card */}
                 <GlassCard className="p-8 bg-industrial-steel border-industrial-border">
                    <div className="flex recessed p-1 gap-1 mb-10 w-full">
                      <button 
                        onClick={() => setActiveTab("add")}
                        className={`relative flex-1 py-3 font-black text-xs transition-all flex items-center justify-center gap-2 ${activeTab === "add" ? "bg-industrial-silver text-industrial-charcoal" : "text-industrial-gray hover:brightness-125"}`}
                      >
                        <Plus size={14}/> ADD_LIQUIDITY
                      </button>
                      <button 
                        onClick={() => setActiveTab("remove")}
                        className={`relative flex-1 py-3 font-black text-xs transition-all flex items-center justify-center gap-2 ${activeTab === "remove" ? "bg-industrial-silver text-industrial-charcoal" : "text-industrial-gray hover:brightness-125"}`}
                      >
                        <Minus size={14}/> REMOVE_LIQUIDITY
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeTab === "add" ? (
                        <motion.div key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                          <div className="p-6 recessed">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-[9px] font-black uppercase tracking-widest text-industrial-gray">ASSET_A_INPUT</span>
                                <span className="text-[9px] font-medium text-industrial-gray">BAL: {balances.XLM || 0}</span>
                              </div>
                             <div className="flex justify-between items-center gap-4">
                                <input type="number" placeholder="0.00" value={amountA} onChange={(e) => setAmountA(e.target.value)} className="bg-transparent text-3xl font-black outline-none w-full text-industrial-silver" />
                                <div className="flex items-center gap-2 plate px-4 py-2 font-black text-xs text-industrial-silver">XLM</div>
                             </div>
                          </div>
                          <div className="flex justify-center -my-3 relative z-20">
                             <div className="p-2 plate text-industrial-silver"><Plus size={16} /></div>
                          </div>
                          <div className="p-6 recessed">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-[9px] font-black uppercase tracking-widest text-industrial-gray">ASSET_B_CALCULATED</span>
                                <span className="text-[9px] font-medium text-industrial-gray">BAL: {balances.MTLSW || 0}</span>
                              </div>
                             <div className="flex justify-between items-center gap-4">
                                <input type="number" placeholder="0.00" value={amountB} readOnly className="bg-transparent text-3xl font-black outline-none w-full text-industrial-gray" />
                                <div className="flex items-center gap-2 plate px-4 py-2 font-black text-xs text-industrial-silver">MTLSW</div>
                             </div>
                          </div>
                          <button 
                             onClick={handleDeposit} 
                             disabled={actionLoading || !amountA || isCheckingTrust} 
                             className="btn-industrial w-full bg-industrial-silver text-industrial-charcoal mt-8 uppercase font-black tracking-widest"
                          >
                            {actionLoading || isCheckingTrust ? (
                              <Loader2 className="animate-spin" />
                            ) : !address ? (
                              "CONNECT_WALLET"
                            ) : !hasTrustB ? (
                              "ENABLE_MTLSW"
                            ) : (
                              "EXECUTE_DEPOSIT"
                            )}
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div key="remove" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                          <div className="text-center p-8 recessed">
                              <div className="text-5xl font-black mb-2 text-industrial-silver">{removePercent}%</div>
                              <input type="range" min="0" max="100" value={removePercent} onChange={(e) => setRemovePercent(parseInt(e.target.value))} className="w-full mt-8 accent-industrial-silver" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 recessed">
                                  <div className="text-[9px] text-industrial-gray font-black mb-1 uppercase">XLM_RECOVERY</div>
                                  <div className="text-xl font-black text-industrial-silver">{(Number(userShares) * removePercent / 1e9).toFixed(2)}</div>
                              </div>
                              <div className="p-4 recessed">
                                  <div className="text-[9px] text-industrial-gray font-black mb-1 uppercase">MTLSW_RECOVERY</div>
                                  <div className="text-xl font-black text-industrial-silver">{(Number(userShares) * removePercent / 1e9).toFixed(2)}</div>
                              </div>
                          </div>
                          <button onClick={handleWithdraw} disabled={actionLoading || userShares === BigInt(0)} className="btn-industrial w-full bg-industrial-charcoal text-industrial-silver mt-8 uppercase font-black tracking-widest border-industrial-border">
                            {actionLoading ? <Loader2 className="animate-spin" /> : "EXECUTE_WITHDRAWAL"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </GlassCard>

                 {/* Position Information Overlay */}
                 <div className="space-y-8">
                    <GlassCard className="p-8 relative overflow-hidden group bg-industrial-steel border-industrial-border">
                        <h3 className="font-black mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-industrial-gray"><Wallet size={16} /> ACTIVE_POSITION</h3>
                        {address ? (
                           <div className="space-y-8">
                              <div className="flex justify-between items-end">
                                 <div>
                                    <div className="text-[9px] text-industrial-gray mb-1 font-black">POOL_SHARE_PERCENTAGE</div>
                                    <div className="text-4xl font-black text-industrial-silver">{totalShares > 0 ? ((Number(userShares) / Number(totalShares)) * 100).toFixed(2) : "0.00"}%</div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-[9px] text-industrial-gray mb-1 font-black">LP_TOKEN_INVENTORY</div>
                                    <div className="text-xl font-black text-industrial-silver">{Number(userShares) / 10000000} LP</div>
                                 </div>
                              </div>
                              <div className="space-y-4 pt-6 border-t border-industrial-border">
                                 <p className="text-[9px] text-industrial-gray leading-tight uppercase">LIQUIDITY_PROVISION GENERATES 0.3% FEES PER TRADE. REWARDS ARE COMPOUNDED AUTOMATICALLY INTO REGISTRY POSITION.</p>
                              </div>
                           </div>
                        ) : (
                           <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-industrial-border gap-4">
                              <p className="text-[9px] font-mono text-industrial-gray uppercase tracking-widest">CONNECT_WALLET TO ACCESS REGISTRY</p>
                              <button onClick={connect} className="btn-industrial px-6 py-2 text-[10px] font-black transition-all">ESTABLISH_CONNECTION</button>
                           </div>
                        )}
                    </GlassCard>

                    <div className="p-8 plate">
                       <h4 className="font-black flex items-center gap-2 text-[10px] mb-4 text-industrial-silver uppercase tracking-widest"><ArrowRightLeft size={16} className="text-industrial-silver" /> PROTOCOL_BENEFITS</h4>
                       <ul className="space-y-3 text-[9px] text-industrial-gray font-black uppercase leading-tight list-none">
                          <li>_ EARN PASSIVE REWARDS FROM TRANSACTION FLOW.</li>
                          <li>_ STABILIZE THE NETWORK LIQUIDITY FABRIC.</li>
                          <li>_ SECURE OWNERSHIP VIA LP_TOKEN REGISTRATION.</li>
                       </ul>
                    </div>
                 </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
