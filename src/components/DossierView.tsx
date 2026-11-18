import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

export const DossierView: React.FC = () => {
  const equations = [
    {
      title: 'Van der Waals Interfacial Adhesion',
      formula: 'F_vdW = (A_H · d_p) / (12 · z₀²) ≈ 2.60 × 10⁻⁷ N',
      desc: 'Hamaker microscopic theory for 5.0 μm silica particles on solar glass.',
      tag: 'Adhesion Force',
    },
    {
      title: 'Ultrasonic Cavitation Detachment',
      formula: 'a_p = ω² · A ≈ 6.94 × 10⁵ m/s²  →  F_inertial / F_vdW = 2.65',
      desc: '38.4 kHz high-frequency excitation breaks van der Waals bonds without water.',
      tag: 'Bond Failure (η > 1.0)',
    },
    {
      title: 'Venturi Aerodynamics & Recoil Vector',
      formula: 'v_exit ≥ 180 km/h (53.8 m/s)  →  F_recoil = 2.85 N (Δθ = 4.3°)',
      desc: '45,000 RPM EDF blower with dynamic rotor pitch trim to maintain 15cm hover.',
      tag: 'Continuity & Newton 3rd',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Research & Physics Equations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equations.map((eq, i) => (
          <motion.div
            key={eq.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-white/[0.06] backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-cyan px-2.5 py-0.5 rounded-full bg-cyan/10 border border-cyan/20">
                {eq.tag}
              </span>
              <h4 className="text-sm font-medium text-white tracking-wide mt-3">{eq.title}</h4>
              <div className="text-xs font-mono text-cyan mt-3 p-3 rounded-xl bg-zinc-900/80 border border-white/[0.04] leading-relaxed">
                {eq.formula}
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-4 leading-relaxed">{eq.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Verified Competition Documents */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-3xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-white tracking-wide">ISEF 2026 Competition Deliverables</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Official project dossiers and presentation decks</p>
          </div>
          <span className="text-xs font-mono text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Cairo Regional Fair
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">12-Slide Competition Deck</div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">PneumoVibe_Solar_Cleaning_Drone.pdf</div>
            </div>
            <a
              href="https://github.com/Yasen-A7med/pneumovibe-mission-control"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">2-Page Financial Feasibility Dossier</div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">Benban 50 MWp Field Model (300 DPI)</div>
            </div>
            <a
              href="https://github.com/Yasen-A7med/pneumovibe-mission-control"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.04] flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
          <span>Researchers: Yassen Ahmed Salh & Safy ELRAHMAN Mohamed</span>
          <span>Target: Benban Solar Park 1.8 GW (Sector 4)</span>
        </div>
      </motion.div>
    </div>
  );
};