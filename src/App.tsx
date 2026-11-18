import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, TabType } from './components/Navbar';
import { Simulator } from './components/Simulator';
import { Metrics } from './components/Metrics';
import { TelemetryView } from './components/TelemetryView';
import { FleetView } from './components/FleetView';
import { DossierView } from './components/DossierView';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('simulator');
  const [cleanlinessScore, setCleanlinessScore] = useState<number>(76.4);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-zinc-100 flex flex-col font-sans selection:bg-cyan selection:text-black overflow-x-hidden">
      {/* Subtle Ambient Radial Lighting */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(0, 240, 255, 0.08), transparent 70%)'
        }}
      />

      {/* Floating Modern Header */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Stage */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
        <AnimatePresence mode="wait">
          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <Simulator onCleanlinessChange={setCleanlinessScore} />
              <Metrics cleanlinessScore={cleanlinessScore} />
            </motion.div>
          )}

          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TelemetryView />
            </motion.div>
          )}

          {activeTab === 'fleet' && (
            <motion.div
              key="fleet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FleetView />
            </motion.div>
          )}

          {activeTab === 'dossier' && (
            <motion.div
              key="dossier"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DossierView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Quiet Luxury Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <span>PneumoVibe • Autonomous Solar Cleaning Drone System</span>
          <span>ISEF 2026 Grand Cairo Entry • Yassen Ahmed Salh & Safy ELRAHMAN Mohamed</span>
        </div>
      </footer>
    </div>
  );
};