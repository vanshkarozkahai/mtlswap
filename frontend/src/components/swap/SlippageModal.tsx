"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Settings2 } from "lucide-react";
import { useState } from "react";

export default function SlippageModal({ 
  isOpen, 
  onClose, 
  value, 
  onChange 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  value: number;
  onChange: (val: number) => void;
}) {
  const PRESETS = [0.1, 0.5, 1.0];
  const [custom, setCustom] = useState(value.toString());

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <Settings2 size={20} className="text-brand-cyan" />
                Settings
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-500 mb-3 block uppercase tracking-wider">Slippage Tolerance</label>
                <div className="flex gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => { onChange(p); setCustom(p.toString()); }}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                        value === p ? "bg-brand-cyan text-white shadow-md shadow-cyan-500/20" : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                  <div className="relative flex-1">
                    <input 
                      type="number"
                      placeholder="Custom"
                      value={custom}
                      onChange={(e) => {
                        setCustom(e.target.value);
                        onChange(parseFloat(e.target.value) || 0.5);
                      }}
                      className="w-full h-full bg-slate-50 border border-slate-100 rounded-xl px-3 outline-none text-right font-bold focus:border-brand-cyan text-slate-900"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 border border-brand-cyan/10">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Your transaction will revert if the price changes unfavorably by more than this percentage.
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Save Settings
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
