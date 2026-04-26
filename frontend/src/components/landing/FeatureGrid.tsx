"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Coins, Layers, Activity } from "lucide-react";

const features = [
  {
    title: "INSTANT_SWAPS",
    desc: "Lightning-fast token exchanges on the Soroban network with rigid precision and zero friction.",
    icon: <Coins size={24} />,
    className: ""
  },
  {
    title: "LIQUIDITY_MINING",
    desc: "Deposit assets into the protocol vault and earn programmed yield from network activity.",
    icon: <Layers size={24} />,
    className: ""
  },
  {
    title: "SOROBAN_POWERED",
    desc: "Forged with next-generation smart contract technology. Secure. Scalable. Transparent.",
    icon: <Cpu size={24} />,
    className: ""
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-industrial-silver uppercase tracking-tighter">PROTOCOL_ENGINE</h2>
        <p className="text-industrial-gray max-w-xl mx-auto text-sm font-mono uppercase">
          Metal-Swap utilizes high-performance Soroban infrastructure to deliver industrial-grade DeFi solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.2 }}
            className={`plate p-8 transition-all ${f.className}`}
          >
            <div className="w-12 h-12 recessed flex items-center justify-center mb-6 group-hover:brightness-125 transition-all">
              {React.cloneElement(f.icon as React.ReactElement, { className: "text-industrial-silver" })}
            </div>
            <h3 className="text-xl font-black mb-3 text-industrial-silver uppercase tracking-tight">{f.title}</h3>
            <p className="text-industrial-gray leading-tight text-xs font-mono uppercase">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
