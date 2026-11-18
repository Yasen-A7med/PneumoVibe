import React, { useEffect, useState } from 'react';
import { 
  Radio, 
  Wind, 
  Sun, 
  ShieldCheck, 
  Clock, 
  Activity, 
  Cpu
} from 'lucide-react';

interface TopbarProps {
  systemActive: boolean;
  onToggleSound?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ systemActive }) => {
  const [time, setTime] = useState<string>('');
  const [metSeconds, setMetSeconds] = useState<number>(4182);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setMetSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMet = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `T+${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="border-b border-cyan/20 bg-obsidian-900/90 backdrop-blur-md px-6 py-3.5 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Cpu className="w-6 h-6 text-cyan animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan shadow-[0_0_8px_#00f0ff]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black tracking-wider text-white font-mono">
                PNEUMO<span className="text-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">VIBE</span>
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30">
                OS v2.4.8
              </span>
              <span className="hidden md:inline-flex text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-solar-gold/15 text-solar-gold border border-solar-gold/30">
                ISEF 2026 GRAND ENTRY
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="text-slate-300 font-semibold">Benban Solar Park (1.8 GW)</span>
              <span className="text-slate-600">•</span>
              <span>Sector 4 (50 MWp Utility Array)</span>
              <span className="text-slate-600">•</span>
              <span className="text-solar-gold font-medium">Yassen Ahmed Salh & Safy ELRAHMAN Mohamed</span>
            </p>
          </div>
        </div>

        {/* Center: Live Environmental Sensors Feed */}
        <div className="hidden lg:flex items-center gap-5 px-4 py-2 rounded-xl bg-obsidian-800/80 border border-slate-800">
          <div className="flex items-center gap-2 text-xs">
            <Sun className="w-4 h-4 text-solar-gold" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Desert Irradiance</div>
              <div className="font-mono font-bold text-white">942 W/m² <span className="text-[10px] text-slate-400">(41.2°C)</span></div>
            </div>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="flex items-center gap-2 text-xs">
            <Wind className="w-4 h-4 text-cyan" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Ambient Wind</div>
              <div className="font-mono font-bold text-white">14.2 km/h <span className="text-[10px] text-emerald-400">NW (STABLE)</span></div>
            </div>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="flex items-center gap-2 text-xs">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Telemetry Link</div>
              <div className="font-mono font-bold text-emerald-400">5G SA / LoRa <span className="text-[10px] text-slate-400">(400Hz)</span></div>
            </div>
          </div>
        </div>

        {/* Right: Operational Status & System Clock */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <ShieldCheck className="w-4 h-4" />
            <span>ZERO-CONTACT ACTIVE</span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800 font-mono text-xs">
            <div className="text-right">
              <div className="text-slate-400 flex items-center gap-1 justify-end text-[10px]">
                <Clock className="w-3 h-3 text-cyan" />
                <span>LOCAL TIME</span>
              </div>
              <div className="font-bold text-white">{time || '16:30:00'} UTC+2</div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-slate-400 flex items-center gap-1 justify-end text-[10px]">
                <Activity className="w-3 h-3 text-solar-gold" />
                <span>MET</span>
              </div>
              <div className="font-bold text-solar-gold">{formatMet(metSeconds)}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
