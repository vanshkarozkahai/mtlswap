"use client";

import { motion } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useBlockchain } from "@/hooks/useBlockchain";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, connect, loading } = useBlockchain();

  return (
    <nav className="fixed top-0 w-full z-[999] px-6 py-4">
      <div className="max-w-7xl mx-auto plate px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 recessed group-hover:brightness-125 transition-all">
            <Activity size={20} className="text-industrial-silver" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase text-industrial-silver">MetalSwap</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-industrial-gray">
          <Link href="/swap" className="hover:text-industrial-silver transition-colors">SWAP</Link>
          <Link href="/liquidity" className="hover:text-industrial-silver transition-colors">LIQUIDITY</Link>
          <Link href="/pool" className="hover:text-industrial-silver transition-colors">ANALYTICS</Link>
          <Link href="/admin" className="hover:text-industrial-silver transition-colors border-l border-industrial-border pl-6">ADMIN</Link>
          {address && (
            <a 
              href={`https://laboratory.blockchain.org/#account-creator?public_key=${address}`}
              target="_blank" 
              className="hidden lg:flex items-center gap-1 text-[9px] font-bold text-industrial-silver hover:underline transition-colors uppercase tracking-widest"
            >
              Get Testnet Tokens
            </a>
          )}
          <button 
            onClick={connect}
            disabled={loading}
            className="btn-industrial py-2"
          >
            {loading ? "PENDING..." : address ? `${address.slice(0,4)}...${address.slice(-4)}` : "CONNECT_TERMINAL"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-industrial-gray" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-6 right-6 plate p-6 flex flex-col gap-4 text-center font-mono"
        >
          <Link href="/swap" onClick={() => setIsOpen(false)} className="text-industrial-gray text-sm">SWAP TOKENS</Link>
          <Link href="/liquidity" onClick={() => setIsOpen(false)} className="text-industrial-gray text-sm">ADD LIQUIDITY</Link>
          <Link href="/pool" onClick={() => setIsOpen(false)} className="text-industrial-gray text-sm">PROTOCOL ANALYTICS</Link>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="text-industrial-silver font-bold">ADMIN HUB</Link>
          <button 
             onClick={() => { connect(); setIsOpen(false); }}
             disabled={loading}
             className="btn-industrial w-full"
          >
             {loading ? "PENDING..." : address ? `${address.slice(0,4)}...${address.slice(-4)}` : "CONNECT_TERMINAL"}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
