import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Radio, 
  Wind, 
  Crosshair, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export const ScenarioTriggers: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM BOOT] PneumoVibe OS v2.4.8 initialized on Benban Sector 4 gateway.',
    '[TELEMETRY] 4 autonomous units synced via 5G Standalone mesh.',
    '[ENVIRONMENT] Ambient irradiance: 942 W/m², Temp: 41.2°C, Wind: 14.2 km/h NW.'
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 14)]);
  };

  const triggerScenario = (id: string, title: string) => {
    setActiveScenario(id);
    addLog(`>>> ENGAGING DEMO SCENARIO: ${title}`);

    if (id === 'sandstorm') {
      setTimeout(() => addLog('⚠ METEOROLOGICAL ALERT: Wind gust spike 48.2 km/h detected at Sector 4 tower.'), 400);
      setTimeout(() => addLog('🚨 MISSION CONTROLLER: Flight envelope exceeded (Threshold: 45 km/h). Initiating Swarm Emergency RTH.'), 1000);
      setTimeout(() => addLog('🔄 UNITS DR-01, DR-02, DR-03 vectoring towards BASE-01 and BASE-02.'), 1800);
      setTimeout(() => addLog('📦 DOCKING STATIONS: Pneumatic hatches unsealed, precision IR guide beacons active.'), 2600);
      setTimeout(() => addLog('🔒 SECURED: All 4 drones seated on charging contacts. Hatches sealed hermetically (IP67). Thermoelectric AC 24.0°C enabled.'), 3600);
    } else if (id === 'hotspot') {
      setTimeout(() => addLog('📷 FLIR THERMAL INSPECTION: Sub-millimeter radiometric scan on String C-02.'), 400);
      setTimeout(() => addLog('🔥 THERMAL ANOMALY: Delta-T +28.4°C localized hotspot detected on Module C02-P18.'), 1100);
      setTimeout(() => addLog('📍 GPS RTK TAG: Lat 24.45392° N, Lon 32.74812° E (Accuracy: ±1.2 cm).'), 1900);
      setTimeout(() => addLog('📋 WORK ORDER: SCADA alert dispatched to Benban O&M crew: "Bypass diode short-circuit / crack risk on C02-P18".'), 2800);
    } else if (id === 'cementation') {
      setTimeout(() => addLog('🔬 ADHESION SENSOR: Morning dew cemented calcium carbonate crust detected (Adhesion > 4.2x baseline).'), 400);
      setTimeout(() => addLog('⚡ CAVITATION BOOST: Ultrasonic transducer swept from 38.4 kHz to 40.2 kHz (Resonant acoustic fracture).'), 1200);
      setTimeout(() => addLog('🌪 VENTURI OVERDRIVE: EDF blower ramped to 48,000 RPM (Exit air speed: 212 km/h).'), 2000);
      setTimeout(() => addLog('✨ DISLODGEMENT COMPLETE: Cemented crust pulverized and blown off panel surface without a single drop of water!'), 2900);
    } else if (id === 'swarm') {
      setTimeout(() => addLog('🛰 SWARM COORDINATOR: Partitioning Sector 4 into 4 parallel cleaning tracks.'), 400);
      setTimeout(() => addLog('⚡ FORMATION ENGAGED: DR-01 (Row 42), DR-02 (Row 43), DR-03 (Row 44), DR-04 (Row 45).'), 1200);
      setTimeout(() => addLog('📏 ANTI-DOWNWASH CONTROL: 15-meter lateral safety offset maintained via LoRa mesh ranging.'), 2100);
      setTimeout(() => addLog('🏆 SWARM SORTIE COMPLETE: 4 strings (568 bifacial panels) cleared in 8.4 minutes!'), 3200);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          ISEF 2026 JUDGES STRESS-TEST SCENARIO BENCH
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Trigger real-time edge-case resilience tests and observe autonomous firmware response logs.
        </p>
      </div>

      {/* 4 Interactive Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario 1 */}
        <div 
          onClick={() => triggerScenario('sandstorm', 'Severe Sandstorm Abort & Docking')}
          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
            activeScenario === 'sandstorm'
              ? 'bg-red-950/30 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              : 'bg-obsidian-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-500/15 text-red-400">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">SCENARIO 1: SEVERE SANDSTORM</h3>
                <span className="text-[10px] font-mono text-red-400 font-semibold">GUSTS &gt; 45 KM/H DETECTED</span>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition">
              SIMULATE
            </button>
          </div>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            Tests autonomous abort, decentralized fleet rendezvous, and hermetic sealing inside the climate-controlled Drone-in-a-Box.
          </p>
        </div>

        {/* Scenario 2 */}
        <div 
          onClick={() => triggerScenario('hotspot', 'FLIR Hotspot & Diode Anomaly Tagging')}
          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
            activeScenario === 'hotspot'
              ? 'bg-solar-gold/15 border-solar-gold shadow-[0_0_20px_rgba(255,184,0,0.2)]'
              : 'bg-obsidian-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-solar-gold/15 text-solar-gold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">SCENARIO 2: FLIR HOTSPOT PINPOINT</h3>
                <span className="text-[10px] font-mono text-solar-gold font-semibold">DIODE BURN-OUT DETECTION</span>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-solar-gold/20 text-solar-gold border border-solar-gold/40 hover:bg-solar-gold/30 transition">
              SIMULATE
            </button>
          </div>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            Simulates onboard radiometric thermal imaging pinpointing cracked wafer cells and logging RTK GPS coordinates to the SCADA maintenance ledger.
          </p>
        </div>

        {/* Scenario 3 */}
        <div 
          onClick={() => triggerScenario('cementation', 'Baked Dew Cementation Crust Cleared')}
          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
            activeScenario === 'cementation'
              ? 'bg-purple-950/30 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
              : 'bg-obsidian-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">SCENARIO 3: BAKED CEMENTATION CRUST</h3>
                <span className="text-[10px] font-mono text-purple-400 font-semibold">40.2 kHz CAVITATION OVERDRIVE</span>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition">
              SIMULATE
            </button>
          </div>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            Simulates high-adhesion calcium crust breaking via resonant ultrasonic excitation followed by 212 km/h Venturi air sweep.
          </p>
        </div>

        {/* Scenario 4 */}
        <div 
          onClick={() => triggerScenario('swarm', 'Autonomous Multi-Drone Swarm Sortie')}
          className={`p-5 rounded-2xl cursor-pointer transition-all border ${
            activeScenario === 'swarm'
              ? 'bg-cyan/15 border-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              : 'bg-obsidian-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan/15 text-cyan">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono">SCENARIO 4: SWARM MULTI-ROW SORTIE</h3>
                <span className="text-[10px] font-mono text-cyan font-semibold">4 DRONES IN PARALLEL MESH</span>
              </div>
            </div>
            <button className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan/20 text-cyan border border-cyan/40 hover:bg-cyan/30 transition">
              SIMULATE
            </button>
          </div>
          <p className="text-xs text-slate-400 font-mono leading-relaxed">
            Demonstrates fleet coordination across 4 inverter strings simultaneously, avoiding downwash interference with 15m lateral spacing.
          </p>
        </div>
      </div>

      {/* Real-time SCADA System Terminal Log Stream */}
      <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white font-mono">
              GATEWAY SCADA EVENT STREAM & AUTOPILOT BUS
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            BAUD: 115200 • PROTOCOL: MAVLink 2.0
          </span>
        </div>

        <div className="p-4 rounded-xl bg-obsidian-950 font-mono text-xs text-slate-300 space-y-1.5 max-h-56 overflow-y-auto border border-slate-800">
          {logs.map((log, index) => (
            <div 
              key={index}
              className={`leading-relaxed ${
                log.includes('⚠') || log.includes('🚨') 
                  ? 'text-amber-400 font-semibold' 
                  : log.includes('>>>') 
                  ? 'text-cyan font-bold' 
                  : log.includes('✨') || log.includes('🏆') || log.includes('🔒')
                  ? 'text-emerald-400 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};