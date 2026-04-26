"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-industrial-charcoal">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 recessed text-[10px] font-mono mb-6 text-industrial-silver">
            <span className="flex h-1.5 w-1.5 bg-industrial-silver animate-pulse" />
                SYSTEM_STATUS: SOROBAN_READY
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 text-industrial-silver uppercase tracking-tighter">
            MACHINED <br />
            FOR THE <span className="text-industrial-gray">BLOCKCHAIN</span>
          </h1>
          <p className="text-lg font-mono text-industrial-gray mb-10 max-w-lg leading-tight uppercase">
            Heavy-duty decentralized trading. Built with precision Soroban smart contracts. No friction. No latency.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/swap" className="btn-industrial bg-industrial-silver text-industrial-charcoal px-10 py-5 text-lg flex items-center gap-2">
              INITIALIZE_SWAP <ArrowRight size={20} />
            </Link>
            <Link href="#features" className="btn-industrial px-10 py-5 text-lg text-industrial-gray">
              RESOURCES.MD
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 plate border border-industrial-border" />
              ))}
            </div>
            <div className="text-[10px] font-mono text-industrial-gray uppercase tracking-widest">
              <span className="font-bold text-industrial-silver">2,400+</span>
              <span className="ml-2">ACTIVE_NODES</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Hero Asset */}
          <div className="relative w-full max-w-lg plate p-2 bg-industrial-border/20">
             <div className="recessed p-1">
               <img 
                 src="/assets/metalswap_hero.png" 
                 alt="Metal-Swap"
                 className="grayscale contrast-125 brightness-75"
               />
             </div>
             
             {/* Live TPS Badge - Industrial Gauge Style */}
             <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute -top-6 -right-6 plate p-4 bg-industrial-steel shadow-2xl"
             >
                 <div className="flex items-center gap-3">
                    <div className="p-2 recessed text-industrial-silver">
                       <Zap size={20} />
                    </div>
                    <div>
                       <div className="text-[9px] uppercase font-mono text-industrial-gray">CORE_THROUGHPUT</div>
                       <div className="text-xl font-mono font-bold text-industrial-silver">248.55_TPS</div>
                    </div>
                 </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
