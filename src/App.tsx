import React, { useState } from 'react';
import { Topbar } from './components/Topbar';
import { SimulatorCanvas } from './components/SimulatorCanvas';
import { TelemetryPanel } from './components/TelemetryPanel';
import { FleetMonitor } from './components/FleetMonitor';
import { PidControllerTuner } from './components/PidControllerTuner';
import { ScenarioTriggers } from './components/ScenarioTriggers';
import { JudgesDossier } from './components/JudgesDossier';
import { PidParameters } from './types';
import { 
  Activity, 
  BarChart3, 
  Radio, 
  Sliders, 
  ShieldAlert, 
  BookOpen, 
  ExternalLink,
  Github,
  Award
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'SIMULATOR' | 'SCADA' | 'FLEET' | 'PID' | 'SCENARIOS' | 'DOSSIER'
  >('SIMULATOR');

  const [cleanlinessScore, setCleanlinessScore] = useState<number>(76.4);
  const [pidParams, setPidParams] = useState<PidParameters>({
    kp: 1.8,
    ki: 0.12,
    kd: 0.45,
    recoilFeedforward: 1.0,
    targetAltitudeCm: 15.0
  });

  const handleTelemetryUpdate = (stats: { cleanliness: number }) => {
    setCleanlinessScore(stats.cleanliness);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans selection:bg-cyan selection:text-obsidian-950">
      {/* Universal Topbar */}
      <Topbar systemActive={true} />

      {/* Main Tab Navigation Bar */}
      <nav className="border-b border-slate-800 bg-obsidian-900/60 backdrop-blur-md sticky top-[69px] z-40 px-6 py-2">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('SIMULATOR')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'SIMULATOR'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              FLIGHT SIMULATOR
            </button>

            <button
              onClick={() => setActiveTab('SCADA')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'SCADA'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              BENBAN 50MWp SCADA
            </button>

            <button
              onClick={() => setActiveTab('FLEET')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'FLEET'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Radio className="w-4 h-4" />
              SWARM FLEET & DOCKING
            </button>

            <button
              onClick={() => setActiveTab('PID')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'PID'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              PID TUNER & CODE
            </button>

            <button
              onClick={() => setActiveTab('SCENARIOS')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'SCENARIOS'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              JUDGES STRESS BENCH
            </button>

            <button
              onClick={() => setActiveTab('DOSSIER')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                activeTab === 'DOSSIER'
                  ? 'bg-cyan text-obsidian-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              RESEARCH & 12 POSTERS
            </button>
          </div>

          {/* Quick External Links */}
          <div className="hidden xl:flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-500">Target Field:</span>
            <span className="text-slate-300 font-semibold">Benban 24.45°N, 32.74°E</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-bold">Payback: 5.1 Mo</span>
          </div>
        </div>
      </nav>

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-[1920px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'SIMULATOR' && (
          <div className="flex flex-col gap-6">
            <SimulatorCanvas 
              pidParams={pidParams} 
              onTelemetryUpdate={handleTelemetryUpdate}
            />
            {/* Embedded Live SCADA Ticker right below simulator */}
            <TelemetryPanel cleanlinessScore={cleanlinessScore} />
          </div>
        )}

        {activeTab === 'SCADA' && (
          <TelemetryPanel cleanlinessScore={cleanlinessScore} />
        )}

        {activeTab === 'FLEET' && (
          <FleetMonitor />
        )}

        {activeTab === 'PID' && (
          <PidControllerTuner params={pidParams} onChange={setPidParams} />
        )}

        {activeTab === 'SCENARIOS' && (
          <ScenarioTriggers />
        )}

        {activeTab === 'DOSSIER' && (
          <JudgesDossier />
        )}
      </main>

      {/* Industrial Mission Control Footer */}
      <footer className="border-t border-slate-800 bg-obsidian-900/80 px-6 py-4 mt-auto">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Award className="w-4 h-4 text-solar-gold" />
              <span>ISEF 2026 Grand Cairo Entry</span>
            </div>
            <span>•</span>
            <span>Authors: <strong>Yassen Ahmed Salh</strong> & <strong>Safy ELRAHMAN Mohamed</strong></span>
            <span>•</span>
            <span className="text-emerald-400">TDC / Ministry of Education</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">Telemetry: 5G SA / LoRa 400Hz</span>
            <span>•</span>
            <span className="text-cyan">Zero-Contact Dry Acoustic Cleaning</span>
            <span>•</span>
            <span className="text-slate-500">v2.4.8 (Production Build)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};