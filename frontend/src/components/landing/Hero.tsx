"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-40 pointer-events-none" />
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-200/30 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 1, y: 0 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-bold mb-6 text-brand-cyan">
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-ping" />
                Soroban Mainnet Soon
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 text-slate-50">
            Trade at the <br />
            <span className="text-gradient">Speed of Blockchain</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
            The next generation of decentralized trading. Powered by Soroban smart contracts, built for the global economy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/swap" className="px-8 py-4 bg-brand-cyan text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-brand-cyan/30">
              Start Trading <ArrowRight size={20} />
            </Link>
            <Link href="#features" className="px-8 py-4 bg-black border border-white/10 text-slate-400 rounded-2xl font-bold hover:bg-black transition-colors">
              Read Docs
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-white/10" />
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="font-bold text-slate-50">2,400+</span>
              <span className="ml-1">Beta Users</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Hero Asset */}
          <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full max-w-lg"
          >
             <img 
               src="/assets/auraswap_hero.png" 
               alt="AuraSwap"
               className="rounded-[40px] shadow-2xl border border-white/10"
             />
             
             {/* Live TPS Badge - Updated for light mode */}
             <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 bg-black/90 backdrop-blur-md border border-white/10 px-6 py-4 rounded-3xl shadow-xl"
             >
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-cyan/10 text-brand-cyan rounded-lg">
                       <Zap size={20} />
                    </div>
                    <div>
                       <div className="text-[10px] uppercase font-bold text-slate-400">Live Throughput</div>
                       <div className="text-xl font-bold text-slate-50">248 TPS</div>
                    </div>
                 </div>
             </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
