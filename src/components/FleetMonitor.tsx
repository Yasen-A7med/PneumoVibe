import React, { useState } from 'react';
import { 
  Plane, 
  BatteryCharging, 
  Battery, 
  Thermometer, 
  ShieldCheck, 
  Radio, 
  Wind, 
  Zap, 
  Home, 
  CheckCircle2, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { FleetUnit, DockingStationState } from '../types';

export const FleetMonitor: React.FC = () => {
  const [selectedDrone, setSelectedDrone] = useState<string>('DR-01');

  const fleet: FleetUnit[] = [
    {
      id: 'DR-01',
      name: 'PneumoVibe-01 (Apex Leader)',
      status: 'CLEANING',
      battery: 84,
      currentString: 'STRING-B14 (Row 42)',
      edfRpm: 45000,
      altitudeCm: 15.0,
      speedMs: 2.1,
      airKnife: true,
      ultrasound: true,
      tempC: 38.2,
      flightTimeMin: 18.4
    },
    {
      id: 'DR-02',
      name: 'PneumoVibe-02 (Wing Alpha)',
      status: 'CLEANING',
      battery: 71,
      currentString: 'STRING-B15 (Row 43)',
      edfRpm: 45000,
      altitudeCm: 15.1,
      speedMs: 2.0,
      airKnife: true,
      ultrasound: true,
      tempC: 39.5,
      flightTimeMin: 22.1
    },
    {
      id: 'DR-03',
      name: 'PneumoVibe-03 (Thermal Scout)',
      status: 'HOVERING',
      battery: 92,
      currentString: 'STRING-C02 (Inspection)',
      edfRpm: 12000,
      altitudeCm: 45.0,
      speedMs: 4.5,
      airKnife: false,
      ultrasound: false,
      tempC: 36.1,
      flightTimeMin: 8.6
    },
    {
      id: 'DR-04',
      name: 'PneumoVibe-04 (Reserve)',
      status: 'DOCKED',
      battery: 88,
      currentString: 'BASE-01 (Docked)',
      edfRpm: 0,
      altitudeCm: 0,
      speedMs: 0,
      airKnife: false,
      ultrasound: false,
      tempC: 24.8,
      flightTimeMin: 0
    }
  ];

  const dockingStations: DockingStationState[] = [
    {
      id: 'BASE-01',
      name: 'Autonomous Station Alpha (Sector 4 North)',
      hatchStatus: 'SEALED',
      internalTempC: 24.2,
      ambientTempC: 41.8,
      solarCanopyPowerKw: 4.2,
      batteryBufferSoc: 96,
      chargeCurrentA: 45.0,
      ipRating: 'IP67 HERMETIC',
      connectedDroneId: 'DR-04'
    },
    {
      id: 'BASE-02',
      name: 'Autonomous Station Beta (Sector 4 South)',
      hatchStatus: 'OPEN',
      internalTempC: 25.1,
      ambientTempC: 42.0,
      solarCanopyPowerKw: 3.9,
      batteryBufferSoc: 89,
      chargeCurrentA: 0.0,
      ipRating: 'IP67 HERMETIC',
      connectedDroneId: null
    }
  ];

  const activeUnit = fleet.find(d => d.id === selectedDrone) || fleet[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Fleet Overview Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan animate-pulse" />
            SWARM FLEET DISPATCH & AUTONOMOUS DOCKING STATIONS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Decentralized mesh coordination (LoRa + 5G SA) for autonomous multi-drone continuous desert cleaning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SWARM HEALTH: 100% NOMINAL
          </span>
          <span className="px-3 py-1 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono font-semibold">
            MESH LATENCY: 4.2ms
          </span>
        </div>
      </div>

      {/* Drone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleet.map((drone) => {
          const isSelected = drone.id === selectedDrone;
          return (
            <div
              key={drone.id}
              onClick={() => setSelectedDrone(drone.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-obsidian-850 border-cyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'bg-obsidian-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${
                    drone.status === 'CLEANING' 
                      ? 'bg-cyan/15 text-cyan' 
                      : drone.status === 'DOCKED' 
                      ? 'bg-emerald-500/15 text-emerald-400' 
                      : 'bg-purple-500/15 text-purple-400'
                  }`}>
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">{drone.id}</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{drone.name}</div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  drone.status === 'CLEANING'
                    ? 'bg-cyan/15 text-cyan border border-cyan/30'
                    : drone.status === 'DOCKED'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                }`}>
                  {drone.status}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {/* Battery bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Battery className="w-3.5 h-3.5 text-emerald-400" /> Battery SoC
                    </span>
                    <span className="text-white font-bold">{drone.battery}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        drone.battery > 50 ? 'bg-emerald-400' : drone.battery > 25 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${drone.battery}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-slate-400">Assignment:</span>
                  <span className="text-slate-200 truncate max-w-[120px]">{drone.currentString}</span>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Core Temp:</span>
                  <span className="text-amber-300 font-bold">{drone.tempC}°C</span>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Sortie Time:</span>
                  <span className="text-slate-300">{drone.flightTimeMin} min</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Unit Telemetry Diagnostic Inspector */}
      <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan/15 text-cyan">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                {activeUnit.name} • DETAILED TELEMETRY HARNESS
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Real-time avionics, ESC feedback, and dual ToF LiDAR sensor verification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Payload Status:</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              activeUnit.airKnife ? 'bg-cyan/15 text-cyan border border-cyan/30' : 'bg-slate-800 text-slate-500'
            }`}>
              AIR KNIFE {activeUnit.airKnife ? 'ON' : 'OFF'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              activeUnit.ultrasound ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-slate-500'
            }`}>
              ULTRASOUND {activeUnit.ultrasound ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">EDF BLOWER SPEED</div>
            <div className="text-sm font-bold text-cyan mt-1">{activeUnit.edfRpm.toLocaleString()} RPM</div>
            <div className="text-[10px] text-slate-400 mt-0.5">High-Pressure Venturi</div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">STANDOFF ALTITUDE</div>
            <div className="text-sm font-bold text-white mt-1">{activeUnit.altitudeCm.toFixed(1)} cm</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">Dual ToF Closed-Loop</div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">GROUND SPEED</div>
            <div className="text-sm font-bold text-solar-gold mt-1">{activeUnit.speedMs.toFixed(1)} m/s</div>
            <div className="text-[10px] text-slate-400 mt-0.5">GPS / RTK Guided</div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">INTERNAL TEMP</div>
            <div className="text-sm font-bold text-amber-400 mt-1">{activeUnit.tempC}°C</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Ambient 41.8°C (Safe)</div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">FLIGHT TIME</div>
            <div className="text-sm font-bold text-white mt-1">{activeUnit.flightTimeMin} min</div>
            <div className="text-[10px] text-slate-400 mt-0.5">32 min max endurance</div>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <div className="text-[10px] text-slate-500">AVIONICS BUS</div>
            <div className="text-sm font-bold text-emerald-400 mt-1">22.2 V (6S LiPo)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Current: 38.4 A</div>
          </div>
        </div>
      </div>

      {/* Autonomous Ground Docking Stations (Drone-in-a-Box) */}
      <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Home className="w-5 h-5 text-solar-gold" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              DRONE-IN-A-BOX AUTONOMOUS DOCKING STATIONS
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan px-2.5 py-0.5 rounded bg-cyan/10 border border-cyan/30">
            CLIMATE-CONTROLLED DESERT SHELTERS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dockingStations.map((station) => (
            <div key={station.id} className="p-4 rounded-xl bg-obsidian-800 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-white font-mono">{station.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-700 text-slate-300">
                  {station.ipRating}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-3">
                <div className="p-2 rounded bg-obsidian-900">
                  <div className="text-[9px] text-slate-500">HATCH SEAL</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{station.hatchStatus}</div>
                </div>
                <div className="p-2 rounded bg-obsidian-900">
                  <div className="text-[9px] text-slate-500">INTERNAL TEMP</div>
                  <div className="font-bold text-cyan mt-0.5">{station.internalTempC}°C</div>
                  <div className="text-[8px] text-slate-500">(Ext: {station.ambientTempC}°C)</div>
                </div>
                <div className="p-2 rounded bg-obsidian-900">
                  <div className="text-[9px] text-slate-500">SOLAR CANOPY</div>
                  <div className="font-bold text-solar-gold mt-0.5">{station.solarCanopyPowerKw} kW</div>
                </div>
                <div className="p-2 rounded bg-obsidian-900">
                  <div className="text-[9px] text-slate-500">STATION BATTERY</div>
                  <div className="font-bold text-white mt-0.5">{station.batteryBufferSoc}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-700">
                <span className="text-slate-400">Docked Unit:</span>
                <span className="text-cyan font-bold">{station.connectedDroneId || 'BAY EMPTY (READY)'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};