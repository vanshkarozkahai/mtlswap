"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Loader2, Sparkles, AlertCircle } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import { useAdmin } from "@/hooks/useAdmin";
import { useBlockchain } from "@/hooks/useBlockchain";
import { toast } from "sonner";

export default function WalletInitCard() {
  const { initializeWallet } = useAdmin();
  const { address, checkAssetTrust } = useBlockchain();
  const [hasTrust, setHasTrust] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkStatus = async () => {
    if (!address) return;
    setChecking(true);
    try {
      const result = await checkAssetTrust("MTLSW");
      setHasTrust(result);
    } catch (e) {
      setHasTrust(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [address]);

  const handleInit = async () => {
    setLoading(true);
    try {
      await initializeWallet();
      await checkStatus();
    } catch (e) {
      // Handled by hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black p-8 rounded-[32px] border border-white/10 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-950/20 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-950/20 rounded-2xl">
            <ShieldCheck className="text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-50">Account Activation</h3>
            <p className="text-xs text-slate-400 font-medium">Verify and authorize protocol assets</p>
          </div>
        </div>
        {checking ? (
          <Loader2 className="animate-spin text-slate-300" size={16} />
        ) : (
          <StatusBadge type={hasTrust ? "success" : "warning"}>
            {hasTrust ? "Authorized" : "Inactive"}
          </StatusBadge>
        )}
      </div>

      <div className="space-y-4 relative z-10">
        <div className="p-5 rounded-2xl bg-black border border-white/10">
          <div className="flex items-start gap-3">
            {hasTrust ? (
              <Sparkles className="text-emerald-500 mt-1" size={18} />
            ) : (
              <AlertCircle className="text-amber-500 mt-1" size={18} />
            )}
            <div>
              <h4 className="text-sm font-bold text-slate-50 mb-1">
                {hasTrust ? "Wallet is Ready" : "Authorization Required"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {hasTrust 
                  ? "Your account is successfully linked to the MTLSW token gate. You can now receive assets and seed market liquidity."
                  : "Every Market Maker account must explicitly trust the protocol's tokens before it can receive them or place DEX orders."}
              </p>
            </div>
          </div>
        </div>

        {!hasTrust && (
          <button
            onClick={handleInit}
            disabled={loading || checking}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Initialize Wallet
              </>
            )}
          </button>
        )}
        
        {hasTrust && (
          <div className="w-full py-4 bg-black text-emerald-600 border border-emerald-900/30 rounded-2xl font-bold flex items-center justify-center gap-2">
            <ShieldCheck size={20} /> Initialization Complete
          </div>
        )}
      </div>
    </div>
  );
}
