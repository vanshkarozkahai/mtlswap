"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Coins, Layers, Activity } from "lucide-react";

const features = [
  {
    title: "Instant Swaps",
    desc: "Experience lightning-fast token exchanges on the Blockchain network with minimal slippage and near-zero latency.",
    icon: <Coins size={24} />,
    className: ""
  },
  {
    title: "Liquidity Mining",
    desc: "Provide liquidity to the protocol and earn a share of every trade while helping to stabilize the ecosystem.",
    icon: <Layers size={24} />,
    className: ""
  },
  {
    title: "Soroban Powered",
    desc: "Built on the cutting edge of smart contract technology, ensuring security, scalability, and transparency.",
    icon: <Cpu size={24} />,
    className: ""
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Core Protocol Features</h2>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">
          Blockchain Swap leverages the full potential of Soroban to bring institutional-grade DeFi to the Blockchain network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white border border-slate-100 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-cyan-500/5 p-8 rounded-[32px] group transition-all ${f.className}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {React.cloneElement(f.icon as React.ReactElement, { className: "text-brand-cyan" })}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">{f.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
