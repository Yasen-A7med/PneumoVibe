import React from 'react';
import { 
  FileText, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Cpu, 
  Zap, 
  Target, 
  Atom, 
  CheckCircle2 
} from 'lucide-react';

export const JudgesDossier: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-solar-gold/15 text-solar-gold border border-solar-gold/30">
              ISEF 2026 GRAND ENTRY
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan/15 text-cyan border border-cyan/30">
              ROBOTICS & RENEWABLE ENERGY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
            PNEUMOVIBE RESEARCH DOSSIER & JUDGES BRIEF
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Autonomous Dual Dry-Cleaning Drone System for Utility-Scale Desert Photovoltaic Plants (Benban Solar Park 1.8 GW Case Study).
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-mono text-slate-400">
            <span>Student Researchers: <strong className="text-white">Yassen Ahmed Salh & Safy ELRAHMAN Mohamed</strong></span>
            <span>•</span>
            <span>Fair: <strong className="text-cyan">ISEF Cairo 2026 (TDC / Ministry of Education)</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Payback Period</div>
            <div className="text-lg font-black font-mono text-emerald-400">5.1 Months</div>
          </div>
          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Contact Pressure</div>
            <div className="text-lg font-black font-mono text-cyan">0.00 kPa</div>
          </div>
        </div>
      </div>

      {/* Scientific Foundations & Governing Equations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Van der Waals vs Acoustic Detachment */}
        <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
              <Atom className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                1. Acoustic Cavitation & Van der Waals Disruption
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Resonant frequency 38.4 kHz dislodging silica dust without water
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Van der Waals Adhesion Force:</div>
              <div className="text-cyan font-bold text-sm">
                F_vdW = (A_H · d_p) / (12 · z₀²) ≈ 2.60 × 10⁻⁷ N / particle
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Where A_H = 10⁻¹⁹ J (Hamaker constant), d_p = 5 μm (mean silica diameter), z₀ = 0.4 nm.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Ultrasonic Inertial Detachment:</div>
              <div className="text-purple-400 font-bold text-sm">
                a_p = ω² · A = (2π · 38,400)² · (1.2 × 10⁻⁶) ≈ 6.94 × 10⁵ m/s²
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 font-semibold">
                Detachment Ratio: F_inertial / F_vdW = 2.65 &gt; 1.0 (Complete Interfacial Bond Failure)
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Venturi Aerodynamics & Recoil Vectoring */}
        <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-xl bg-cyan/15 text-cyan">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                2. Venturi Continuity & Dynamic Recoil Compensation
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                193 km/h laminar air knife sweeping loosened dust with thrust vectoring
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono text-slate-300 leading-relaxed">
            <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Venturi Air Velocity (Continuity Equation):</div>
              <div className="text-cyan font-bold text-sm">
                v_exit = v₁ · (A₁ / A₂) = 11.2 m/s × 4.8 = 53.76 m/s (193.5 km/h)
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                45,000 RPM high-pressure EDF blower focused through an aerodynamic slit nozzle.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-slate-800">
              <div className="text-slate-400 text-[11px] mb-1">Dynamic Recoil Compensation (Newton's 3rd Law):</div>
              <div className="text-amber-400 font-bold text-sm">
                F_recoil = ṁ · v_exit = 0.053 kg/s × 53.8 m/s ≈ 2.85 N
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 font-semibold">
                Rotor Pitch Trim: Δθ = arcsin(F_recoil / 4T_rotor) = 4.3° forward pitch offset
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 12 ISEF Poster Board Sections Summary */}
      <div className="p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-solar-gold" />
          <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
            12-PANEL COMPETITION POSTER BOARD ARCHITECTURE
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">01. TITLE & ABSTRACT</span>
            <p className="text-slate-400 text-[11px]">Desert soiling mitigation, 1.8 GW Benban case study, and dual dry mechanism.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">02. PROBLEM & CRISIS</span>
            <p className="text-slate-400 text-[11px]">18.5% annual output loss ($668k/yr risk), water scarcity, crawler micro-cracks.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">03. ENGINEERING GOAL</span>
            <p className="text-slate-400 text-[11px]">Zero-contact, 100% dry drone maintaining 15.0cm standoff with &gt;99% recovery.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">04. PHYSICS & EQUATIONS</span>
            <p className="text-slate-400 text-[11px]">Hamaker constants, van der Waals bonds, acoustic cavitation acceleration.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">05. CAD HARDWARE DESIGN</span>
            <p className="text-slate-400 text-[11px]">Carbon-fiber frame, 45,000 RPM EDF, Venturi slit, piezo horn, RTK GPS.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">06. AUTONOMOUS SOFTWARE</span>
            <p className="text-slate-400 text-[11px]">STM32F7 / PX4 RTOS, dual ToF distance fusion, 400Hz PID, LoRa mesh.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">07. DOCKING BASE STATION</span>
            <p className="text-slate-400 text-[11px]">Drone-in-a-Box with 24°C thermoelectric AC, solar canopy, IP67 seal.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">08. EXPERIMENTAL RESULTS</span>
            <p className="text-slate-400 text-[11px]">99.2% cleanliness recovery, 0.00 kPa pressure, 0.28s PID settling time.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">09. FINANCIAL MODEL</span>
            <p className="text-slate-400 text-[11px]">CapEx $140k vs $480k crawlers, OpEx $27k/yr, 5.1 months payback.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">10. DISCUSSION & LIMITS</span>
            <p className="text-slate-400 text-[11px]">Wind cutoff 45 km/h, thermal endurance at 45°C ambient, sensor redundancy.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">11. CONCLUSIONS</span>
            <p className="text-slate-400 text-[11px]">Empirical proof of waterless, contact-free solar plant O&amp;M viability.</p>
          </div>

          <div className="p-3 rounded-xl bg-obsidian-800 border border-slate-800">
            <span className="text-cyan font-bold block mb-1">12. REFERENCES</span>
            <p className="text-slate-400 text-[11px]">NREL soiling reports, Benban meteorological data, IEEE ultrasonics literature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};