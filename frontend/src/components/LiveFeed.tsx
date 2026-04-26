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
      case "swap": return <ArrowRightLeft size={14} className="text-industrial-silver" />;
      case "deposit": return <PlusCircle size={14} className="text-industrial-silver" />;
      case "withdraw": return <MinusCircle size={14} className="text-industrial-gray" />;
      case "transfer": return <Send size={14} className="text-industrial-gray" />;
      default: return <Radio size={14} className="text-industrial-gray" />;
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "swap": return "SWAP_EXECUTION";
      case "deposit": return "LIQUIDITY_ADD";
      case "withdraw": return "LIQUIDITY_REMOVE";
      case "transfer": return "ASSET_TRANSFER";
      default: return "SYSTEM_EVENT";
    }
  };

  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)}
        className="fixed top-24 right-4 md:right-6 plate p-3 hover:brightness-125 active:scale-95 transition-all z-[100] shadow-xl"
      >
        <Radio size={20} className={isConnected ? "text-industrial-silver animate-pulse" : "text-industrial-gray"} />
      </button>
    );
  }

  return (
    <div className="fixed top-24 right-4 md:right-6 w-[280px] md:w-[320px] max-h-[calc(100vh-140px)] plate z-[100] flex flex-col shadow-2xl">
      <div className="p-4 border-b border-industrial-border flex items-center justify-between bg-industrial-charcoal">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 ${isConnected ? "bg-industrial-silver animate-pulse" : "bg-industrial-gray"}`} />
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-industrial-gray">TERMINAL_FEED</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className={`p-1.5 recessed transition-all ${isSoundEnabled ? "brightness-125" : "text-industrial-gray"}`}
          >
             <Radio size={12} />
          </button>
          <button onClick={() => setIsCollapsed(true)} className="p-1.5 recessed hover:brightness-125 text-industrial-gray transition-all">
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 recessed bg-industrial-recessed/30 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-3 plate bg-industrial-steel/50 hover:brightness-110 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <span className="text-[9px] font-mono font-black tracking-tighter text-industrial-silver uppercase">
                      {getEventLabel(event.type)}
                    </span>
                  </div>
                  <a 
                    href={`https://blockchain.expert/explorer/testnet/tx/${event.id.split('-')[0]}`} 
                    target="_blank"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink size={10} className="text-industrial-gray hover:text-industrial-silver" />
                  </a>
                </div>
                
                <div className="flex flex-col gap-1 font-mono">
                  <div className="text-[9px] text-industrial-gray">
                    USR: <span className="text-industrial-silver">{event.user.slice(0, 6)}...{event.user.slice(-4)}</span>
                  </div>
                  <div className="text-[10px] font-bold truncate text-industrial-silver uppercase">
                    {event.type === 'swap' ? (
                       <span>{Number(event.data.amountIn) / 1e7} XLM → {Number(event.data.amountOut) / 1e7} BSWP</span>
                    ) : event.type === 'deposit' ? (
                       <span>ADD: {Number(event.data.amountA) / 1e7} / {Number(event.data.amountB) / 1e7}</span>
                    ) : (
                       <span>SYS: ACTIVITY_DETECTED</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-industrial-gray gap-3">
               <Radio size={32} className="opacity-20 animate-pulse" />
               <p className="text-[10px] uppercase font-mono font-black tracking-[0.2em] opacity-40">LISTENING...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-2 bg-industrial-charcoal border-t border-industrial-border text-center">
         <p className="text-[8px] text-industrial-gray font-mono uppercase tracking-widest">SUBSCRIBED_TO_SOROBAN_EVENTS</p>
      </div>
    </div>
  );
}
