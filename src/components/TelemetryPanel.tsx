import React from 'react';
import { 
  Zap, 
  DollarSign, 
  Droplets, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Sun, 
  CheckCircle2, 
  ArrowUpRight,
  Flame,
  Award
} from 'lucide-react';

interface TelemetryPanelProps {
  cleanlinessScore: number;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ cleanlinessScore }) => {
  // Dynamic yield metrics based on cleanliness
  const powerGainMw = parseFloat(((cleanlinessScore - 74.2) / 25.0 * 4.82).toFixed(2));
  const dailyRevUsd = Math.round(1420 + (cleanlinessScore - 74.2) * 22.5);
  const waterSavedLiters = Math.round(16200 + (cleanlinessScore - 74.2) * 110);

  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner: Benban Solar Park 50 MWp High-Yield Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Power Restored */}
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800 hover:border-cyan/40 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan/10 rounded-full blur-xl group-hover:bg-cyan/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Power Yield Restored
            </span>
            <div className="p-2 rounded-xl bg-cyan/15 text-cyan">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white tracking-tight">
              +{powerGainMw > 0 ? powerGainMw : '0.00'}
            </span>
            <span className="text-sm font-bold text-cyan font-mono">MW</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.8% delta vs soiled baseline</span>
          </div>
        </div>

        {/* Metric 2: Recovered Revenue */}
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800 hover:border-solar-gold/40 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-solar-gold/10 rounded-full blur-xl group-hover:bg-solar-gold/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Daily Revenue Recovered
            </span>
            <div className="p-2 rounded-xl bg-solar-gold/15 text-solar-gold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white tracking-tight">
              ${dailyRevUsd.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">/ DAY</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>$668,000 / year gross protected</span>
          </div>
        </div>

        {/* Metric 3: Water Conserved */}
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800 hover:border-blue-400/40 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Water Conserved (100% Dry)
            </span>
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-white tracking-tight">
              {waterSavedLiters.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-blue-400 font-mono">LITERS</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Zero desalted water consumption</span>
          </div>
        </div>

        {/* Metric 4: Glass Structural Integrity */}
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              Glass Contact Pressure
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
              0.00
            </span>
            <span className="text-xs font-bold text-emerald-300 font-mono">kPa (ZERO CONTACT)</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>0 micro-cracks induced</span>
          </div>
        </div>
      </div>

      {/* Deep Feasibility Matrix & Comparative SCADA Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Real-time Inverter String Yield Curve */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-cyan" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Benban Sector 4: 50 MWp Real-Time String Telemetry
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              LIVE SCADA FEED
            </span>
          </div>

          {/* Comparative Yield Bars */}
          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>PneumoVibe Cleaned String (B-14)</span>
                <span className="text-cyan font-bold">99.2% Output (2,480 W)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: '99.2%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Partially Soiled Inverter String (B-15)</span>
                <span className="text-amber-400 font-bold">{cleanlinessScore}% Output</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${cleanlinessScore}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Severely Dusty Benchmark String (Unmitigated)</span>
                <span className="text-red-400 font-bold">74.2% Output (1,855 W)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/80 rounded-full"
                  style={{ width: '74.2%' }}
                />
              </div>
            </div>
          </div>

          {/* Plant Specification Metadata */}
          <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-obsidian-800 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">Array Scale</div>
              <div className="font-bold text-white mt-0.5">142,000 Panels</div>
            </div>
            <div className="p-2.5 rounded-lg bg-obsidian-800 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">Module Wattage</div>
              <div className="font-bold text-white mt-0.5">545 Wp Bifacial</div>
            </div>
            <div className="p-2.5 rounded-lg bg-obsidian-800 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">Daily Soiling Rate</div>
              <div className="font-bold text-amber-400 mt-0.5">0.82% / Day</div>
            </div>
            <div className="p-2.5 rounded-lg bg-obsidian-800 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">PPA Tariff</div>
              <div className="font-bold text-emerald-400 mt-0.5">$0.078 / kWh</div>
            </div>
          </div>
        </div>

        {/* Industrial Feasibility & Competitive Matrix */}
        <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-solar-gold" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Industrial Techno-Economic Edge
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Comparing PneumoVibe against current commercial robotic crawlers and water trucks in utility-scale desert conditions.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-obsidian-800 border border-cyan/20">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>PneumoVibe Autonomous Drone</span>
                  <span className="text-cyan">$140,000 CapEx</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Payback: <span className="text-emerald-400 font-bold">5.1 Months</span> • Weight on Glass: <span className="text-emerald-400 font-bold">0.0 kg</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800 opacity-70">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Mechanical Ground Crawlers</span>
                  <span className="text-red-400">$480,000 CapEx</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Payback: 18.2 Months • Weight on Glass: 45 - 65 kg (Micro-cracks)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800 opacity-70">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Manual Water Truck Washing</span>
                  <span className="text-red-400">$255,000 / Yr OpEx</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Water Consumption: 2.5 L/panel • Thermal Shock Risk
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Net 5-Year LCOE Reduction:</span>
            <span className="text-emerald-400 font-bold">-0.42 ¢/kWh</span>
          </div>
        </div>
      </div>
    </div>
  );
};