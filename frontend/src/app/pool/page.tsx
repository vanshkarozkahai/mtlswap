"use client";
import { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { 
  Activity, 
  BarChart3, 
  LineChart as LineChartIcon,
  TrendingUp, 
  History,
  Info,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import GlassCard from "@/components/shared/GlassCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  ResponsiveContainer, 
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useRealtimeEvents } from "@/hooks/useRealtimeEvents";
import Link from "next/link";

const MOCK_TVL_DATA = [
  { day: "MON", tvl: 1.2 },
  { day: "TUE", tvl: 1.5 },
  { day: "WED", tvl: 1.3 },
  { day: "THU", tvl: 1.9 },
  { day: "FRI", tvl: 2.4 },
  { day: "SAT", tvl: 2.1 },
  { day: "SUN", tvl: 2.45 },
];

const MOCK_VOL_DATA = [
  { day: "MON", vol: 240 },
  { day: "TUE", vol: 320 },
  { day: "WED", vol: 180 },
  { day: "THU", vol: 450 },
  { day: "FRI", vol: 510 },
  { day: "SAT", vol: 390 },
  { day: "SUN", vol: 482 },
];

export default function PoolAnalyticsPage() {
  const { events } = useRealtimeEvents();
  const [dbStats, setDbStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/pool/stats");
        const data = await res.json();
        setDbStats(data);
      } catch (e) {
        console.error("Failed to fetch pool stats", e);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "TOTAL_LIQUIDITY", val: dbStats ? `$${(dbStats.tvlUSD / 1e6).toFixed(2)}M` : "$2.45M", change: "+12.4%", icon: LineChartIcon },
    { label: "VOLUME_24H", val: dbStats ? `$${dbStats.volume24h.toLocaleString()}` : "$482,000", change: "+4.2%", icon: TrendingUp },
    { label: "PROTOCOL_FEES", val: dbStats ? `$${(dbStats.volume24h * 0.003).toLocaleString()}` : "$1,446", change: "+2.1%", icon: BarChart3 },
    { label: "ACTIVE_NODES", val: "1", change: "STABLE", icon: Info },
  ];

  return (
    <div className="bg-industrial-charcoal min-h-screen text-industrial-silver pt-32 pb-20 font-mono">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Activity className="text-industrial-silver" size={32} />
               <h1 className="text-4xl font-black uppercase tracking-tighter text-industrial-silver">PROTOCOL_ANALYTICS</h1>
            </div>
            <p className="text-industrial-gray font-black text-[10px] uppercase leading-tight max-w-lg">
              REAL-TIME MONITORING OF XLM/MTLSW LIQUIDITY FABRIC AND TRANSACTION THROUGHPUT.
            </p>
          </div>
          <Link 
            href="/liquidity" 
            className="btn-industrial bg-industrial-silver text-industrial-charcoal flex items-center gap-2 px-6 py-3 font-black text-xs transition-all group"
          >
            MANAGE_LIQUIDITY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
           {stats.map((stat, i) => (
             <GlassCard key={i} className="p-6 bg-industrial-steel border-industrial-border">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 recessed text-industrial-silver">
                      <stat.icon size={18} />
                   </div>
                   <span className="text-[9px] font-black text-industrial-gray font-mono tracking-tight">{stat.change}</span>
                </div>
                <div className="text-[9px] text-industrial-gray font-black uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-2xl font-black text-industrial-silver">{stat.val}</div>
             </GlassCard>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
           {/* TVL Chart */}
           <GlassCard className="p-8 h-[400px] flex flex-col bg-industrial-steel border-industrial-border">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-black flex items-center gap-2 text-[10px] uppercase tracking-widest text-industrial-gray">
                    <LineChartIcon size={14} /> VALUE_LOCKED_HISTORY
                 </h3>
                 <StatusBadge type="live">XLM_MTLSW</StatusBadge>
              </div>
              <div className="flex-1 w-full recessed p-2">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_TVL_DATA}>
                       <XAxis dataKey="day" hide />
                       <YAxis hide />
                       <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '0px' }} itemStyle={{ color: '#E2E2E2', fontSize: '10px' }} labelStyle={{ display: 'none' }} />
                       <Line type="stepAfter" dataKey="tvl" stroke="#E2E2E2" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>

           {/* Volume Chart */}
           <GlassCard className="p-8 h-[400px] flex flex-col bg-industrial-steel border-industrial-border">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-black flex items-center gap-2 text-[10px] uppercase tracking-widest text-industrial-gray">
                    <BarChart3 size={14} /> TRANSACTION_VOLUME
                 </h3>
                 <StatusBadge type="info">USD_INDEX</StatusBadge>
              </div>
              <div className="flex-1 w-full recessed p-2">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_VOL_DATA}>
                       <XAxis dataKey="day" hide />
                       <YAxis hide />
                       <Tooltip contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '0px' }} itemStyle={{ color: '#E2E2E2', fontSize: '10px' }} labelStyle={{ display: 'none' }} />
                       <Bar dataKey="vol" fill="#E2E2E2" />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </GlassCard>
        </div>

        {/* Protocol Feed */}
        <GlassCard className="overflow-hidden bg-industrial-steel border-industrial-border">
           <div className="p-8 border-b border-industrial-border flex items-center justify-between">
              <h3 className="font-black flex items-center gap-2 text-xs uppercase tracking-widest text-industrial-silver">
                 <History size={18} className="text-industrial-silver" />
                 PROTOCOL_EVENT_LOG
              </h3>
              <StatusBadge type="live">SYNCHRONIZED</StatusBadge>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left uppercase">
                 <thead className="text-[9px] font-black text-industrial-gray border-b border-industrial-border">
                    <tr>
                       <th className="p-6">_ACTION</th>
                       <th className="p-6">_CONTRACT</th>
                       <th className="p-6 text-right">_DATA</th>
                       <th className="p-6 text-right">_IDENTIFIER</th>
                       <th className="p-6 text-right">_BLOCK</th>
                    </tr>
                 </thead>
                 <tbody className="text-[10px] font-mono">
                    {events.map((e, i) => (
                       <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={e.id} 
                          className="border-b border-industrial-border hover:bg-industrial-charcoal/50 transition-colors group"
                       >
                          <td className="p-6">
                             <StatusBadge type={e.type === 'swap' ? 'live' : e.type === 'deposit' ? 'success' : 'info'}>
                                {e.type}
                             </StatusBadge>
                          </td>
                          <td className="p-6 text-industrial-gray">{e.contractId.slice(0, 12)}...</td>
                          <td className="p-6 text-right font-black text-industrial-silver">
                             {e.type === 'swap' ? `${Number(e.data.amountIn)/1e7} > ${Number(e.data.amountOut)/1e7}` : "CALL_DATA"}
                          </td>
                          <td className="p-6 text-right text-industrial-gray">{e.user.slice(0, 6)}...{e.user.slice(-4)}</td>
                          <td className="p-6 text-right text-industrial-gray">{e.ledger}</td>
                       </motion.tr>
                    ))}
                    {events.length === 0 && (
                       <tr>
                          <td colSpan={5} className="p-12 text-center text-industrial-gray font-black tracking-widest text-[10px]">
                             AWAITING_NETWORK_EVENTS...
                          </td>
                       </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
