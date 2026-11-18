import React from 'react';
import { motion } from 'framer-motion';

export const TelemetryView: React.FC = () => {
  const comparison = [
    { label: 'System CapEx', drone: '$140,000', crawler: '$480,000', note: '70.8% Lower' },
    { label: 'Annual OpEx', drone: '$27,000 / yr', crawler: '$282,000 / yr', note: '90.4% Lower' },
    { label: 'Simple Payback', drone: '5.1 Months', crawler: '18.2 Months', note: '3.5x Faster' },
    { label: 'Weight on Glass', drone: '0.00 kg (Zero)', crawler: '45 - 65 kg', note: 'No Micro-cracks' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Real-time Inverter String Yield Curve */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-medium text-white tracking-wide">Inverter String Yield Comparison</h3>
            <p className="text-xs text-zinc-400 mt-1">Real-time SCADA telemetry from Benban Sector 4 (50 MWp)</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            +24.8% Net Recovery
          </span>
        </div>

        <div className="space-y-5 font-mono text-xs">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1.5">
              <span>PneumoVibe Cleaned String</span>
              <span className="text-cyan font-bold">99.2% Output</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan rounded-full" style={{ width: '99.2%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-zinc-400 mb-1.5">
              <span>Partially Soiled String</span>
              <span className="text-amber-400">82.0% Output</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400/80 rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-zinc-500 mb-1.5">
              <span>Unmitigated Soiled Baseline</span>
              <span className="text-red-400">74.2% Output</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-500/60 rounded-full" style={{ width: '74.2%' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Industrial Techno-Economic Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {comparison.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] backdrop-blur-md"
          >
            <div className="text-xs text-zinc-400 font-medium">{item.label}</div>
            <div className="text-xl font-light text-white font-mono mt-3">{item.drone}</div>
            <div className="text-[11px] text-zinc-500 font-mono mt-1">vs {item.crawler} (Crawlers)</div>
            <div className="mt-3 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              {item.note}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};