"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check } from "lucide-react";
import { useState } from "react";

const TOKENS = [
  { id: "XLM", name: "Native Tokens", symbol: "XLM", logo: "🚀" },
  { id: "TKNA", name: "Alpha Token", symbol: "TKNA", logo: "🧪" },
  { id: "TKNB", name: "Beta Token", symbol: "TKNB", logo: "⚡" },
  { id: "USDC", name: "USD Coin", symbol: "USDC", logo: "💵" },
];

export default function TokenSelector({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedToken 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelect: (token: any) => void;
  selectedToken: string;
}) {
  const [search, setSearch] = useState("");

  const filteredTokens = TOKENS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-md bg-black border border-white/10 rounded-t-3xl md:rounded-3xl p-6 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-50">Select a Token</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search name or address"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-brand-cyan transition-colors text-slate-50 placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => { onSelect(token); onClose(); }}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between hover:bg-black transition-all ${
                    selectedToken === token.id ? "bg-cyan-950/20 border border-brand-cyan/20" : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl">
                      {token.logo}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-50">{token.symbol}</div>
                      <div className="text-xs text-slate-400">{token.name}</div>
                    </div>
                  </div>
                  {selectedToken === token.id && <Check size={18} className="text-brand-cyan" />}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
