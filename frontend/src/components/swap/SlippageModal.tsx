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
            className="fixed inset-0 bg-industrial-charcoal/80 z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm plate p-6 z-[101] shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2 text-industrial-silver">
                <Settings2 size={18} className="text-industrial-silver" />
                PROTOCOL_CONFIG
              </h2>
              <button onClick={onClose} className="p-2 recessed hover:brightness-125 transition-all">
                <X size={20} className="text-industrial-gray" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-industrial-gray mb-3 block uppercase tracking-widest">SLIPPAGE_TOLERANCE</label>
                <div className="flex gap-1">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => { onChange(p); setCustom(p.toString()); }}
                      className={`flex-1 py-3 font-mono text-xs transition-all ${
                        value === p ? "bg-industrial-silver text-industrial-charcoal" : "recessed text-industrial-gray"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                  <div className="relative flex-1">
                    <input 
                      type="number"
                      placeholder="CUSTOM"
                      value={custom}
                      onChange={(e) => {
                        setCustom(e.target.value);
                        onChange(parseFloat(e.target.value) || 0.5);
                      }}
                      className="w-full h-full recessed px-3 outline-none text-right font-mono text-xs text-industrial-silver"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 recessed bg-industrial-recessed/50 border-industrial-border/50">
                <p className="text-[9px] font-mono text-industrial-gray leading-tight uppercase">
                  Execution will terminate if price deviation exceeds selected threshold.
                </p>
              </div>

              <button 
                onClick={onClose}
                className="btn-industrial w-full bg-industrial-silver text-industrial-charcoal"
              >
                SAVE_PARAMETERS
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
