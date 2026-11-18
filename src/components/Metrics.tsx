import React from 'react';
import { motion } from 'framer-motion';

interface MetricsProps {
  cleanlinessScore: number;
}

export const Metrics: React.FC<MetricsProps> = ({ cleanlinessScore }) => {
  const powerGain = ((cleanlinessScore - 74.2) / 25.0 * 4.82).toFixed(2);
  const dailyRevenue = Math.round(1420 + (cleanlinessScore - 74.2) * 22.5);
  const waterSaved = Math.round(16200 + (cleanlinessScore - 74.2) * 110);

  const stats = [
    {
      label: 'Energy Yield Recovery',
      value: `+${powerGain} MW`,
      sub: '+24.8% vs soiled array',
      accent: 'text-cyan',
    },
    {
      label: 'Surface Contact Force',
      value: '0.00 kPa',
      sub: 'Zero glass micro-cracks',
      accent: 'text-emerald-400',
    },
    {
      label: 'Daily Revenue Guard',
      value: `$${dailyRevenue.toLocaleString()}`,
      sub: '$668,000 / year protected',
      accent: 'text-white',
    },
    {
      label: 'Demineralized Water Saved',
      value: `${waterSaved.toLocaleString()} L`,
      sub: '100% water-free acoustic dry clean',
      accent: 'text-sky-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] backdrop-blur-md hover:border-white/[0.12] transition-colors"
        >
          <div className="text-xs text-zinc-400 tracking-wide font-medium">{stat.label}</div>
          <div className={`text-2xl sm:text-3xl font-light tracking-tight font-mono mt-2 ${stat.accent}`}>
            {stat.value}
          </div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">{stat.sub}</div>
        </motion.div>
      ))}
    </div>
  );
};