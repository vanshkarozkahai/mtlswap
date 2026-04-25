"use client";

import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const MOCK_DATA = [
  { time: "09:00", price: 0.124 },
  { time: "10:00", price: 0.126 },
  { time: "11:00", price: 0.125 },
  { time: "12:00", price: 0.128 },
  { time: "13:00", price: 0.131 },
  { time: "14:00", price: 0.129 },
  { time: "15:00", price: 0.132 },
];

export default function PriceChart() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
          <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">XLM / TKNA</div>
          <div className="text-2xl font-bold text-slate-50">0.132 <span className="text-xs text-emerald-500 font-normal ml-1">+2.4%</span></div>
        </div>
        <div className="flex gap-1">
          {["1H", "1D", "1W"].map(t => (
            <button key={t} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${t === "1D" ? "bg-brand-cyan text-white shadow-sm" : "hover:bg-black text-slate-400"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DATA}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['auto', 'auto']} 
              hide 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#06B6D4" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#06B6D4" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
