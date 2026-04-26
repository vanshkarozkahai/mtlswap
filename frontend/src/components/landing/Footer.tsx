"use client";

import { Activity, Github, Twitter, MessageSquare } from "lucide-react";
import Link from "next/link";
import { CONTRACT_IDS } from "@/lib/blockchain";

export default function Footer() {
  return (
    <footer className="py-24 border-t border-industrial-border bg-industrial-charcoal font-mono">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="p-2 recessed">
              <Activity size={20} className="text-industrial-silver" />
            </div>
            <span className="font-black text-xl text-industrial-silver uppercase tracking-tighter">MetalSwap</span>
          </Link>
          <p className="text-industrial-gray max-w-sm mb-8 leading-tight text-xs uppercase">
             INDUSTRIAL-GRADE LIQUIDITY INFRASTRUCTURE. FORGED ON SOROBAN. ATOMIC. PRECISE. UNYIELDING.
          </p>
          <div className="flex gap-2">
             <div className="p-3 plate cursor-pointer hover:brightness-125 transition-all text-industrial-gray">
                <Twitter size={18} />
             </div>
             <div className="p-3 plate cursor-pointer hover:brightness-125 transition-all text-industrial-gray">
                <Github size={18} />
             </div>
             <div className="p-3 plate cursor-pointer hover:brightness-125 transition-all text-industrial-gray">
                <MessageSquare size={18} />
             </div>
          </div>
        </div>

        <div>
          <h4 className="font-black text-industrial-silver text-xs mb-6 pt-1 uppercase tracking-widest">_RESOURCES</h4>
          <ul className="space-y-4 text-industrial-gray text-[10px] uppercase">
             <li><Link href="#" className="hover:text-industrial-silver transition-colors">Documentation</Link></li>
             <li><Link href="#" className="hover:text-industrial-silver transition-colors">Brand Assets</Link></li>
             <li><Link href="#" className="hover:text-industrial-silver transition-colors">Developer Portal</Link></li>
             <li><Link href="#" className="hover:text-industrial-silver transition-colors">Audit Reports</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-industrial-silver text-xs mb-6 pt-1 uppercase tracking-widest">_REGISTRY_KEYS</h4>
          <ul className="space-y-4 text-[9px] font-mono text-industrial-gray">
             <li className="flex flex-col gap-1">
                <span className="text-industrial-gray/50 uppercase text-[8px] font-bold">ROUTER_ID</span>
                <span className="text-industrial-silver truncate">{CONTRACT_IDS.router}</span>
             </li>
             <li className="flex flex-col gap-1">
                <span className="text-industrial-gray/50 uppercase text-[8px] font-bold">POOL_ID</span>
                <span className="text-industrial-silver truncate">{CONTRACT_IDS.pool}</span>
             </li>
             <li className="flex flex-col gap-1">
                <span className="text-industrial-gray/50 uppercase text-[8px] font-bold">FACTORY_ID</span>
                <span className="text-industrial-silver truncate">{CONTRACT_IDS.token}</span>
             </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-industrial-border flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-industrial-gray font-mono uppercase tracking-widest">
         <p>© 2026 METALSWAP_TERMINAL. ALL RIGHTS RESERVED.</p>
         <div className="flex gap-8">
            <Link href="#" className="hover:text-industrial-silver transition-colors">PRIVACY_POLICY</Link>
            <Link href="#" className="hover:text-industrial-silver transition-colors">TERMS_OF_SERVICE</Link>
         </div>
      </div>
    </footer>
  );
}
