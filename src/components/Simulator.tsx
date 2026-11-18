import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Wind, Zap } from 'lucide-react';
import { calculateAcousticDetachmentRatio, calculateVenturiAirVelocity, calculateRecoilForce } from '../utils/physicsEngine';

interface Particle {
  x: number;
  yOffset: number;
  blownAway: boolean;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

interface SimulatorProps {
  onCleanlinessChange?: (val: number) => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ onCleanlinessChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [airKnifeActive, setAirKnifeActive] = useState<boolean>(true);
  const [ultrasoundActive, setUltrasoundActive] = useState<boolean>(true);
  const [droneProgress, setDroneProgress] = useState<number>(0.2);
  const [cleanliness, setCleanliness] = useState<number>(76.4);
  const [windGust, setWindGust] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(2.0);

  const stateRef = useRef({
    isRunning,
    airKnifeActive,
    ultrasoundActive,
    droneProgress,
    cleanliness,
    windGust,
    speedMs,
    direction: 1,
  });

  useEffect(() => {
    stateRef.current = {
      isRunning,
      airKnifeActive,
      ultrasoundActive,
      droneProgress,
      cleanliness,
      windGust,
      speedMs,
      direction: stateRef.current.direction,
    };
  }, [isRunning, airKnifeActive, ultrasoundActive, droneProgress, cleanliness, windGust, speedMs]);

  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback(() => {
    const p: Particle[] = [];
    const count = 300;
    const colors = ['#d4a373', '#e0a96d', '#cca47c', '#f4a261', '#e76f51'];
    for (let i = 0; i < count; i++) {
      p.push({
        x: Math.random(),
        yOffset: (Math.random() - 0.5) * 3,
        blownAway: false,
        vx: 0,
        vy: 0,
        opacity: 0.8 + Math.random() * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = p;
    setCleanliness(74.2);
    if (onCleanlinessChange) onCleanlinessChange(74.2);
  }, [onCleanlinessChange]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let wavePhase = 0;

    const render = () => {
      const {
        isRunning: active,
        airKnifeActive: airOn,
        ultrasoundActive: usOn,
        windGust: gust,
        speedMs: speed,
      } = stateRef.current;

      const width = canvas.width;
      const height = canvas.height;

      // Deep clean background
      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      // Subtle minimalist grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 48) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 48) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Panel Geometry (25° tilted mounting rack)
      const p1 = { x: 90, y: height - 100 };
      const p2 = { x: width - 90, y: height - 210 };
      const panelLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

      // Support pillars
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(p1.x + 80, p1.y - 6);
      ctx.lineTo(p1.x + 80, height - 20);
      ctx.moveTo(p2.x - 120, p2.y - 6);
      ctx.lineTo(p2.x - 120, height - 20);
      ctx.stroke();

      // Render Solar Panel
      ctx.save();
      ctx.translate(p1.x, p1.y);
      ctx.rotate(angle);

      // Aluminum rack frame
      ctx.fillStyle = '#18181b';
      ctx.fillRect(-8, 0, panelLen + 16, 12);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-8, 0, panelLen + 16, 12);

      // Monocrystalline dark glass
      const glassGrad = ctx.createLinearGradient(0, -6, panelLen, -6);
      glassGrad.addColorStop(0, '#0d1527');
      glassGrad.addColorStop(0.5, '#111d36');
      glassGrad.addColorStop(1, '#09101f');
      ctx.fillStyle = glassGrad;
      ctx.fillRect(0, -6, panelLen, 6);

      // Cell divisions & silver busbar lines
      const cells = 12;
      const cellW = panelLen / cells;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= cells; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellW, -6);
        ctx.lineTo(i * cellW, 0);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(panelLen, -3);
      ctx.stroke();

      // Sand particles on surface
      const particles = particlesRef.current;
      particles.forEach((p) => {
        if (!p.blownAway) {
          const px = p.x * panelLen;
          let py = -7 + p.yOffset;

          const dist = Math.abs(p.x - stateRef.current.droneProgress);
          if (usOn && dist < 0.1) {
            py += (Math.random() - 0.5) * 4.0; // ultrasonic vibration
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // Drone Movement Physics
      if (active) {
        let prog = stateRef.current.droneProgress;
        const dir = stateRef.current.direction;
        prog += (speed * 0.0006) * dir;

        if (prog > 0.90) {
          stateRef.current.direction = -1;
          prog = 0.90;
        } else if (prog < 0.10) {
          stateRef.current.direction = 1;
          prog = 0.10;
        }
        stateRef.current.droneProgress = prog;
        setDroneProgress(prog);

        if (airOn) {
          particles.forEach((p) => {
            if (!p.blownAway) {
              const dist = Math.abs(p.x - prog);
              if (dist < 0.08) {
                const threshold = usOn ? 0.98 : 0.45;
                if (Math.random() < threshold) {
                  p.blownAway = true;
                  p.vx = 4 + Math.random() * 6;
                  p.vy = -3 - Math.random() * 5;
                }
              }
            }
          });

          const remaining = particles.filter(p => !p.blownAway).length;
          const cleanPct = parseFloat((100 - (remaining / particles.length) * 25.8).toFixed(1));
          setCleanliness(cleanPct);
          if (onCleanlinessChange) onCleanlinessChange(cleanPct);
        }
      }

      // Blown away sand particles
      ctx.save();
      ctx.translate(p1.x, p1.y);
      ctx.rotate(angle);
      particles.forEach((p) => {
        if (p.blownAway && p.opacity > 0.02) {
          p.x += p.vx * 0.0015;
          p.yOffset += p.vy * 0.4;
          p.vy += 0.22;
          p.opacity *= 0.96;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x * panelLen, -7 + p.yOffset, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // Drone Coordinates
      const prog = stateRef.current.droneProgress;
      const baseX = p1.x + (p2.x - p1.x) * prog;
      const baseY = p1.y + (p2.y - p1.y) * prog;

      const normX = Math.sin(angle);
      const normY = -Math.cos(angle);

      const targetAltPx = 76; // ~15.0 cm
      const gustOffset = gust ? Math.sin(Date.now() * 0.01) * 14 : 0;
      const currentAltPx = targetAltPx + gustOffset + (Math.random() - 0.5) * 1.0;
      const currentAltCm = ((currentAltPx / 76) * 15.0).toFixed(1);

      const droneX = baseX + normX * currentAltPx;
      const droneY = baseY + normY * currentAltPx;

      const recoilAngleRad = airOn ? (4.3 * Math.PI) / 180 : 0;

      // Dual ToF LiDAR Beams
      const tanX = Math.cos(angle);
      const tanY = Math.sin(angle);
      const l1X = droneX - tanX * 22;
      const l1Y = droneY - tanY * 22;
      const l1TargetX = baseX - tanX * 22;
      const l1TargetY = baseY - tanY * 22;

      const l2X = droneX + tanX * 22;
      const l2Y = droneY + tanY * 22;
      const l2TargetX = baseX + tanX * 22;
      const l2TargetY = baseY + tanY * 22;

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(l1X, l1Y);
      ctx.lineTo(l1TargetX, l1TargetY);
      ctx.moveTo(l2X, l2Y);
      ctx.lineTo(l2TargetX, l2TargetY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Floating minimal distance label
      ctx.fillStyle = 'rgba(9, 9, 11, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      const lblX = droneX + 38;
      const lblY = (droneY + baseY) / 2 - 8;
      ctx.beginPath();
      ctx.roundRect(lblX, lblY, 82, 18, 9);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#00f0ff';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`${currentAltCm} cm`, lblX + 16, lblY + 12);

      // Ultrasonic waves
      if (usOn) {
        wavePhase = (wavePhase + 0.12) % (Math.PI * 2);
        ctx.save();
        ctx.translate(droneX, droneY);
        ctx.rotate(angle);

        for (let r = 12; r <= 68; r += 14) {
          const curR = (r + (wavePhase * 5)) % 72;
          const a = Math.max(0, 1 - curR / 72) * 0.5;
          ctx.strokeStyle = `rgba(168, 85, 247, ${a})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(0, 8, curR, 0.3 * Math.PI, 0.7 * Math.PI);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Air knife blast
      if (airOn) {
        ctx.save();
        ctx.translate(droneX, droneY);
        ctx.rotate(angle);

        const jetGrad = ctx.createLinearGradient(0, 10, 35, 65);
        jetGrad.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
        jetGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = jetGrad;
        ctx.beginPath();
        ctx.moveTo(-10, 10);
        ctx.lineTo(10, 10);
        ctx.lineTo(48, 65);
        ctx.lineTo(-15, 65);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Drone Body
      ctx.save();
      ctx.translate(droneX, droneY);
      ctx.rotate(angle + (airOn ? -recoilAngleRad : 0));

      // Rotor arms
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-48, 0);
      ctx.lineTo(48, 0);
      ctx.stroke();

      // Rotors
      [-48, 48].forEach((rx) => {
        ctx.fillStyle = '#18181b';
        ctx.fillRect(rx - 6, -8, 12, 10);

        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.beginPath();
        ctx.ellipse(rx, -8, 22, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Fuselage pod
      ctx.fillStyle = '#121215';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.roundRect(-22, -14, 44, 22, 6);
      ctx.fill();
      ctx.stroke();

      // Top status indicator
      ctx.fillStyle = active ? '#34d399' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Bottom transducers
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(-14, 8, 10, 4);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(4, 8, 10, 4);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [onCleanlinessChange]);

  return (
    <div className="flex flex-col gap-4">
      {/* Cinematic Canvas Container */}
      <div className="relative w-full rounded-3xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-2xl overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={1000}
          height={440}
          className="w-full h-auto max-h-[460px] block"
        />

        {/* Minimalist Top Corner Overlay */}
        <div className="absolute top-5 left-6 flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-zinc-300">
            Cleanliness: <span className="text-cyan font-bold">{cleanliness.toFixed(1)}%</span>
          </div>
          <div className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-xs font-mono text-emerald-400">
            +24.8% Yield Gain
          </div>
        </div>

        {/* Floating Apple-Style Frosted Glass Controls Pill */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl">
          {/* Play / Pause */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              isRunning ? 'bg-white/15 text-white hover:bg-white/20' : 'bg-emerald-500 text-black font-semibold hover:bg-emerald-400'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

          {/* Ultrasound Pill */}
          <button
            onClick={() => setUltrasoundActive(!ultrasoundActive)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              ultrasoundActive ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ultrasound</span>
          </button>

          {/* Air Knife Pill */}
          <button
            onClick={() => setAirKnifeActive(!airKnifeActive)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all ${
              airKnifeActive ? 'bg-cyan/20 text-cyan border border-cyan/30' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Air Knife</span>
          </button>

          {/* Reset */}
          <button
            onClick={initParticles}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Sand"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle secondary settings below canvas (uncluttered) */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span>Speed: {speedMs.toFixed(1)} m/s</span>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.1"
            value={speedMs}
            onChange={(e) => setSpeedMs(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-cyan bg-zinc-800 h-1 rounded-lg cursor-pointer"
          />
        </div>

        <button
          onClick={() => setWindGust(!windGust)}
          className={`px-3 py-1 rounded-full transition text-[11px] ${
            windGust ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {windGust ? 'Wind Gust Active (38 km/h)' : 'Simulate Wind Gust'}
        </button>
      </div>
    </div>
  );
};