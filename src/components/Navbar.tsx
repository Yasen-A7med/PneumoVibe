import React from 'react';
import { motion } from 'framer-motion';
import { StatusBadge } from './StatusBadge';

export type TabType = 'simulator' | 'telemetry' | 'fleet' | 'dossier';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string }[] = [
  { id: 'simulator', label: 'Simulator' },
  { id: 'telemetry', label: 'SCADA Yield' },
  { id: 'fleet', label: 'Fleet & Base' },
  { id: 'dossier', label: 'Research' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#00f0ff]" />
          </div>
          <div>
            <span className="text-sm font-semibold tracking-wider text-white font-mono">
              PNEUMO<span className="text-cyan">VIBE</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
              ISEF 2026
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation with Spring Animation */}
        <nav className="flex items-center p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-lg">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full outline-none select-none ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-white/10 border border-white/15 rounded-full shadow-inner"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status */}
        <div className="hidden sm:flex items-center gap-3">
          <StatusBadge state="active" label="Benban 50MWp Online" />
        </div>
      </div>
    </header>
  );
};