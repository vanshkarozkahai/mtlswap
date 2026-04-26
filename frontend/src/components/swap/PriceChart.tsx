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
    <div className="h-full w-full flex flex-col font-mono">
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
          <div className="text-[10px] text-industrial-gray uppercase tracking-widest mb-1">PAIR: XLM_MTLSW</div>
          <div className="text-xl font-bold text-industrial-silver">0.132 <span className="text-[10px] text-industrial-gray font-normal ml-1">▲ 2.4%</span></div>
        </div>
        <div className="flex gap-1">
          {["1H", "1D", "1W"].map(t => (
            <button key={t} className={`px-2 py-1 plate text-[9px] font-bold transition-all ${t === "1D" ? "bg-industrial-silver text-industrial-charcoal" : "text-industrial-gray hover:brightness-125"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[150px] recessed p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DATA}>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['auto', 'auto']} 
              hide 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '0px', border: '1px solid #333' }}
              itemStyle={{ color: '#E2E2E2', fontWeight: 'bold', fontSize: '10px' }}
              labelStyle={{ color: '#A0A0A0', fontSize: '8px' }}
            />
            <Line 
              type="stepAfter" 
              dataKey="price" 
              stroke="#E2E2E2" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#E2E2E2", stroke: "#000" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
