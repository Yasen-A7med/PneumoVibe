import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';

export const FleetView: React.FC = () => {
  const units = [
    { id: 'DR-01', name: 'Apex Leader', battery: 84, status: 'active' as const, task: 'Row 42 (Cleaning)' },
    { id: 'DR-02', name: 'Wing Alpha', battery: 71, status: 'active' as const, task: 'Row 43 (Cleaning)' },
    { id: 'DR-03', name: 'Thermal Scout', battery: 92, status: 'active' as const, task: 'FLIR Thermal Scan' },
    { id: 'DR-04', name: 'Reserve', battery: 88, status: 'docked' as const, task: 'Base-01 Rapid Charge' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 4 Drones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {units.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-mono text-white">{u.id}</span>
                <StatusBadge state={u.status} />
              </div>
              <div className="text-xs text-zinc-400 mt-1">{u.name}</div>
              <div className="text-[11px] font-mono text-zinc-500 mt-3">{u.task}</div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                <span>Battery</span>
                <span className="text-white font-bold">{u.battery}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    u.battery > 50 ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${u.battery}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Autonomous Docking Base Station Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-3xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-medium text-white tracking-wide">Autonomous Drone-in-a-Box Station</h3>
            <p className="text-xs text-zinc-400 mt-1">Climate-controlled hermetic shelter for desert deployment</p>
          </div>
          <span className="text-xs font-mono text-cyan px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20">
            IP67 Hermetic Seal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04]">
            <div className="text-zinc-500 text-[10px]">INTERNAL CLIMATE</div>
            <div className="text-base font-light text-cyan mt-1">24.2°C</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Ext: 41.8°C</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04]">
            <div className="text-zinc-500 text-[10px]">SOLAR CANOPY</div>
            <div className="text-base font-light text-white mt-1">4.2 kW</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Bifacial Roof</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04]">
            <div className="text-zinc-500 text-[10px]">STATION BATTERY</div>
            <div className="text-base font-light text-emerald-400 mt-1">96%</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Buffer Storage</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.04]">
            <div className="text-zinc-500 text-[10px]">PNEUMATIC HATCH</div>
            <div className="text-base font-light text-emerald-400 mt-1">SEALED</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">Sand-Proof</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};