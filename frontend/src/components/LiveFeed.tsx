"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Radio, 
  ExternalLink, 
  ArrowRightLeft, 
  PlusCircle, 
  MinusCircle, 
  Send,
  X 
} from "lucide-react";
import { useState } from "react";
import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";

export default function LiveFeed() {
  const { events, isConnected } = useRealtimeEvents();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "swap": return <ArrowRightLeft size={14} className="text-cyan-400" />;
      case "deposit": return <PlusCircle size={14} className="text-green-400" />;
      case "withdraw": return <MinusCircle size={14} className="text-red-400" />;
      case "transfer": return <Send size={14} className="text-violet-400" />;
      default: return <Radio size={14} className="text-zinc-400" />;
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "swap": return "SWAP";
      case "deposit": return "DEPOSIT";
      case "withdraw": return "WITHDRAW";
      case "transfer": return "TRANSFER";
      default: return "EVENT";
    }
  };

  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)}
        className="fixed top-24 right-4 md:right-6 bg-white p-3 rounded-full hover:scale-110 active:scale-95 transition-all z-[100] shadow-xl border border-slate-200"
      >
        <Radio size={20} className={isConnected ? "text-brand-cyan animate-pulse" : "text-slate-400"} />
      </button>
    );
  }

  return (
    <div className="fixed top-24 right-4 md:right-6 w-[280px] md:w-[320px] max-h-[calc(100vh-140px)] bg-white/90 backdrop-blur-xl rounded-3xl z-[100] flex flex-col shadow-2xl border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-brand-cyan animate-pulse" : "bg-slate-300"}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Blockchain Feed</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className={`p-1.5 rounded-lg transition-colors ${isSoundEnabled ? "text-brand-cyan bg-cyan-50" : "text-slate-400 hover:bg-slate-50"}`}
          >
             <Radio size={14} />
          </button>
          <button onClick={() => setIsCollapsed(true)} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-cyan/30 transition-colors group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <span className={`text-[9px] font-bold tracking-tighter ${
                      event.type === 'swap' ? 'text-brand-cyan' : 
                      event.type === 'deposit' ? 'text-emerald-600' : 
                      event.type === 'withdraw' ? 'text-rose-600' : 'text-slate-400'
                    }`}>
                      {getEventLabel(event.type)}
                    </span>
                  </div>
                  <a 
                    href={`https://blockchain.expert/explorer/testnet/tx/${event.id.split('-')[0]}`} 
                    target="_blank"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink size={10} className="text-slate-400 hover:text-brand-cyan" />
                  </a>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] font-mono text-slate-400">
                    User: <span className="text-slate-900">{event.user.slice(0, 6)}...{event.user.slice(-4)}</span>
                  </div>
                  <div className="text-xs font-bold truncate text-slate-900">
                    {event.type === 'swap' ? (
                       <span>{Number(event.data.amountIn) / 1e7} XLM → {Number(event.data.amountOut) / 1e7} BSWP</span>
                    ) : event.type === 'deposit' ? (
                       <span>Added {Number(event.data.amountA) / 1e7} / {Number(event.data.amountB) / 1e7}</span>
                    ) : (
                       <span>Blockchain Activity Detected</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-slate-300 gap-3">
               <Radio size={32} className="opacity-20 animate-pulse" />
               <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Listening...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center">
         <p className="text-[9px] text-slate-400 font-mono italic">Subscribed to Network getEvents</p>
      </div>
    </div>
  );
}
