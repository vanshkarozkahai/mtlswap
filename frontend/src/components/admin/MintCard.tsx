"use client";

import { useState, useEffect } from "react";
import { Coins, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import GlassCard from "../shared/GlassCard";
import StatusBadge from "../shared/StatusBadge";
import { useAdmin } from "@/hooks/useAdmin";
import { useBlockchain } from "@/hooks/useBlockchain";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ISSUER_ADDRESS } from "@/lib/blockchain";

function RecipientStatus({ address }: { address: string }) {
  const [status, setStatus] = useState<"checking" | "valid" | "invalid">("checking");
  const { checkAssetTrust } = useBlockchain();

  useEffect(() => {
    const verify = async () => {
      setStatus("checking");
      try {
        const hasTrust = await checkAssetTrust("MTLSW", address);
        setStatus(hasTrust ? "valid" : "invalid");
      } catch {
        setStatus("invalid");
      }
    };
    if (address.length === 56) verify();
  }, [address, checkAssetTrust]);

  if (status === "checking") return <Loader2 className="animate-spin text-industrial-silver" size={16} />;
  return status === "valid" ? (
    <StatusBadge type="success">VALID_TRUSTLINE</StatusBadge>
  ) : (
    <StatusBadge type="error">MISSING_TRUSTLINE</StatusBadge>
  );
}

export default function MintCard() {
  const { mintToken } = useAdmin();
  const { address, checkAssetTrust } = useBlockchain();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  
  const MM_ADDRESS = "GCGUQ2F6LKRCD6PUDJKTVNGNEFVGJJPLBM7L64I5YFM7SBQGGXNXMVUM";
  const isIssuer = address && address === ISSUER_ADDRESS;
  const isNotIssuer = address && !isIssuer;

  // Smart defaulting: If issuer is connected, point to Market Maker
  useEffect(() => {
    if (isIssuer && !recipient) {
      setRecipient(MM_ADDRESS);
    } else if (!address) {
      setRecipient("");
    }
  }, [address, isIssuer, recipient]);

  const handleMint = async () => {
    if (!recipient || !amount) {
      toast.error("Please fill in recipient and amount");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Trustline & Account Check
      try {
        const hasTrust = await checkAssetTrust("MTLSW", recipient);
        if (!hasTrust) {
          toast.error("Recipient lacks trustline", {
            description: "They must enable MTLSW trustline first."
          });
          setLoading(false);
          return;
        }
      } catch (e: any) {
        if (e.response?.status === 404) {
          toast.error("Account not funded", {
            description: "The recipient wallet needs XLM to perform transactions on Testnet.",
            action: {
              label: "Get XLM",
              onClick: () => window.open(`https://laboratory.stellar.org/#account-creator?public_key=${recipient}`, "_blank")
            }
          });
          setLoading(false);
          return;
        }
      }

      await mintToken(recipient, amount);
      
      // Record to MongoDB
      await fetch("/api/admin/logs", {
        method: "POST",
        body: JSON.stringify({
          adminAddress: address,
          action: "MINT",
          details: `Minted ${amount} MTLSW to ${recipient}`,
          txHash: "tx_mint_" + Math.random().toString(36).substring(7)
        })
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setAmount("");
    } catch (e) {
      // Errors are handled by the useAdmin hook toasts
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-industrial-steel p-8 border border-industrial-border relative overflow-hidden group font-mono">
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 recessed text-industrial-silver">
            <Coins size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black text-industrial-silver uppercase tracking-tight">TOKEN_ISSUANCE_MODULE</h3>
            <p className="text-[9px] text-industrial-gray font-black uppercase">MINT_PROTOCOL_ASSETS_TO_AUTHORIZED_WALLETS</p>
          </div>
        </div>
        <StatusBadge type="info">READY</StatusBadge>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-industrial-gray mb-2 block">_ADMIN_IDENTIFIER</label>
          <div className="w-full recessed px-6 py-4 text-[10px] text-industrial-gray overflow-hidden text-ellipsis">
            {address || "NOT_ESTABLISHED"}
          </div>
        </div>

        <div className="relative group/input">
           <label className="text-[9px] font-black uppercase tracking-widest text-industrial-gray mb-2 block">_RECIPIENT_ADDRESS</label>
           <input 
            type="text"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full recessed px-6 py-4 outline-none text-[10px] text-industrial-silver pr-32"
          />
          {recipient && recipient.length === 56 && (
            <div className="absolute right-4 bottom-3">
               <RecipientStatus address={recipient} />
            </div>
          )}
        </div>

        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-industrial-gray mb-2 block">_MINT_QUANTITY</label>
          <input 
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full recessed px-6 py-4 outline-none font-black text-xl text-industrial-silver"
          />
        </div>

        {isNotIssuer && (
          <div className="recessed p-4 flex items-start gap-3">
            <AlertCircle className="text-industrial-gray shrink-0 mt-0.5" size={16} />
            <div className="text-[9px] text-industrial-gray leading-tight font-black uppercase">
              <strong>IDENTITY_MISMATCH:</strong> ONLY_PRIMARY_ISSUER_HAS_MINT_AUTHORITY.
            </div>
          </div>
        )}

        <button
          onClick={handleMint}
          disabled={!!(loading || isNotIssuer)}
          className="btn-industrial w-full py-4 bg-industrial-silver text-industrial-charcoal font-black flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <CheckCircle2 size={20} /> EXECUTE_MINT
            </>
          )}
        </button>
      </div>
    </div>
  );
}
