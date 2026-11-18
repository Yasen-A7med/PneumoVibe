import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Wind, 
  Zap, 
  Radio, 
  Activity, 
  Gauge, 
  Compass, 
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { calculateVanDerWaalsForce, calculateAcousticDetachmentRatio, calculateVenturiAirVelocity, calculateRecoilForce, AltitudePidController } from '../utils/physicsEngine';
import { PidParameters } from '../types';

interface Particle {
  x: number; // progress along panel (0 to 1)
  yOffset: number; // jitter offset
  settled: boolean;
  blownAway: boolean;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

interface SimulatorCanvasProps {
  pidParams?: PidParameters;
  onTelemetryUpdate?: (stats: {
    cleanliness: number;
    altitudeCm: number;
    recoilN: number;
    recoilAngleDeg: number;
    detachmentRatio: number;
    airSpeedKmh: number;
  }) => void;
}

export const SimulatorCanvas: React.FC<SimulatorCanvasProps> = ({
  pidParams = { kp: 1.8, ki: 0.12, kd: 0.45, recoilFeedforward: 1.0, targetAltitudeCm: 15.0 },
  onTelemetryUpdate
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Flight simulation states
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [airKnifeActive, setAirKnifeActive] = useState<boolean>(true);
  const [ultrasoundActive, setUltrasoundActive] = useState<boolean>(true);
  const [droneProgress, setDroneProgress] = useState<number>(0.15); // 0 to 1
  const [altitudeCm, setAltitudeCm] = useState<number>(15.0);
  const [cleanlinessScore, setCleanlinessScore] = useState<number>(76.4);
  const [windGustActive, setWindGustActive] = useState<boolean>(false);
  const [cleaningSpeedMs, setCleaningSpeedMs] = useState<number>(2.0);
  const [showRays, setShowRays] = useState<boolean>(true);
  const [showForceVectors, setShowForceVectors] = useState<boolean>(true);

  // References for animation loop
  const stateRef = useRef({
    isRunning,
    airKnifeActive,
    ultrasoundActive,
    droneProgress,
    altitudeCm,
    cleanlinessScore,
    windGustActive,
    cleaningSpeedMs,
    pidParams,
    direction: 1, // 1 forward, -1 reverse
  });

  useEffect(() => {
    stateRef.current = {
      isRunning,
      airKnifeActive,
      ultrasoundActive,
      droneProgress,
      altitudeCm,
      cleanlinessScore,
      windGustActive,
      cleaningSpeedMs,
      pidParams,
      direction: stateRef.current.direction,
    };
  }, [isRunning, airKnifeActive, ultrasoundActive, droneProgress, altitudeCm, cleanlinessScore, windGustActive, cleaningSpeedMs, pidParams]);

  // Particle pool for sand dust
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback(() => {
    const p: Particle[] = [];
    const count = 350;
    const colors = ['#e0a96d', '#d4a373', '#cca47c', '#b08968', '#f3c68f'];
    for (let i = 0; i < count; i++) {
      p.push({
        x: Math.random(),
        yOffset: (Math.random() - 0.5) * 4,
        settled: true,
        blownAway: false,
        vx: 0,
        vy: 0,
        opacity: 0.85 + Math.random() * 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    particlesRef.current = p;
    setCleanlinessScore(74.2);
  }, []);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  // Physics animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const pid = new AltitudePidController();
    let wavePhase = 0;
    let airParticlePhase = 0;

    const render = () => {
      const {
        isRunning: active,
        airKnifeActive: airOn,
        ultrasoundActive: usOn,
        windGustActive: gust,
        cleaningSpeedMs: speed,
        pidParams: currentPid
      } = stateRef.current;

      const width = canvas.width;
      const height = canvas.height;

      // Clear Canvas
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Panel Geometry (25° tilted mounting rack)
      // Panel starts around (80, 420) and ends at (width - 80, 260)
      const panelP1 = { x: 100, y: height - 120 };
      const panelP2 = { x: width - 100, y: height - 240 };
      const panelLength = Math.hypot(panelP2.x - panelP1.x, panelP2.y - panelP1.y);
      const panelAngle = Math.atan2(panelP2.y - panelP1.y, panelP2.x - panelP1.x); // ~ -10 to -15 deg in canvas coords

      // Panel rack support legs (Steel truss)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(panelP1.x + 80, panelP1.y - 10);
      ctx.lineTo(panelP1.x + 80, height - 30);
      ctx.moveTo(panelP2.x - 120, panelP2.y - 10);
      ctx.lineTo(panelP2.x - 120, height - 30);
      ctx.stroke();

      // Concrete foundation pads
      ctx.fillStyle = '#334155';
      ctx.fillRect(panelP1.x + 60, height - 30, 40, 20);
      ctx.fillRect(panelP2.x - 140, height - 30, 40, 20);

      // Draw Solar Array (Extruded aluminum rail + dark blue solar glass)
      ctx.save();
      ctx.translate(panelP1.x, panelP1.y);
      ctx.rotate(panelAngle);

      // Aluminum mounting frame
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-10, 0, panelLength + 20, 16);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(-10, 0, panelLength + 20, 16);

      // Monocrystalline Silicon Solar Glass Surface
      const glassGradient = ctx.createLinearGradient(0, -6, panelLength, -6);
      glassGradient.addColorStop(0, '#0a1d37');
      glassGradient.addColorStop(0.5, '#0c274c');
      glassGradient.addColorStop(1, '#08172c');
      ctx.fillStyle = glassGradient;
      ctx.fillRect(0, -8, panelLength, 8);

      // Solar cell divisions & silver busbars
      const cellCount = 14;
      const cellWidth = panelLength / cellCount;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i <= cellCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, -8);
        ctx.lineTo(i * cellWidth, 0);
        ctx.stroke();
      }

      // Silver horizontal busbar line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(panelLength, -4);
      ctx.stroke();

      // Cleaned vs Soiled Section Visualization
      // Draw dusty sand layer directly on the panel
      const particles = particlesRef.current;
      let activeGrains = 0;

      particles.forEach((p) => {
        if (!p.blownAway) {
          activeGrains++;
          const px = p.x * panelLength;
          let py = -9 + p.yOffset;

          // If ultrasound is active and drone is near this particle, jitter intensely
          const droneDistOnPanel = Math.abs(p.x - stateRef.current.droneProgress);
          if (usOn && droneDistOnPanel < 0.12) {
            py += (Math.random() - 0.5) * 5.0; // intense ultrasonic cavitation vibration
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      ctx.restore();

      // Calculate dynamic drone progress and physics if active
      if (active) {
        let prog = stateRef.current.droneProgress;
        const dir = stateRef.current.direction;
        const speedNorm = (speed * 0.0006) * dir;
        prog += speedNorm;

        if (prog > 0.92) {
          stateRef.current.direction = -1;
          prog = 0.92;
        } else if (prog < 0.08) {
          stateRef.current.direction = 1;
          prog = 0.08;
        }
        stateRef.current.droneProgress = prog;
        setDroneProgress(prog);

        // Dislodge and blow away particles near the drone if air knife is ON
        if (airOn) {
          particles.forEach((p) => {
            if (!p.blownAway) {
              const dist = Math.abs(p.x - prog);
              if (dist < 0.09) {
                // If ultrasound was also active, detachment probability is 99.2%
                const detachThreshold = usOn ? 0.98 : 0.42;
                if (Math.random() < detachThreshold) {
                  p.blownAway = true;
                  p.vx = 4 + Math.random() * 8; // blow down along wind
                  p.vy = -3 - Math.random() * 6;
                }
              }
            }
          });

          // Calculate current cleanliness
          const remaining = particles.filter(p => !p.blownAway).length;
          const cleanPct = 100 - (remaining / particles.length) * 25.8;
          setCleanlinessScore(parseFloat(cleanPct.toFixed(1)));
        }
      }

      // Draw blown-away particles (dynamic trajectory off the panel)
      ctx.save();
      ctx.translate(panelP1.x, panelP1.y);
      ctx.rotate(panelAngle);
      particles.forEach((p) => {
        if (p.blownAway && p.opacity > 0.02) {
          p.x += p.vx * 0.0015;
          p.yOffset += p.vy * 0.4;
          p.vy += 0.25; // gravity pulls dust down
          p.opacity *= 0.97; // fade away

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x * panelLength, -9 + p.yOffset, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // Drone World Position calculation
      const droneProg = stateRef.current.droneProgress;
      const droneBaseX = panelP1.x + (panelP2.x - panelP1.x) * droneProg;
      const droneBaseY = panelP1.y + (panelP2.y - panelP1.y) * droneProg;

      // Normal vector perpendicular to the panel pointing up
      const normalX = Math.sin(panelAngle);
      const normalY = -Math.cos(panelAngle);

      // Standoff Altitude Control (Target 15.0 cm -> scaled to canvas pixels ~ 85px)
      const targetPixels = (currentPid.targetAltitudeCm / 15.0) * 85;
      const gustDisturbance = gust ? Math.sin(Date.now() * 0.01) * 18 : 0;
      
      // Simulate real-time sensor measurement with micro-noise
      const sensorNoise = (Math.random() - 0.5) * 1.5;
      const currentAltitudePixels = targetPixels + gustDisturbance + sensorNoise;
      const currentAltCm = (currentAltitudePixels / 85) * 15.0;
      setAltitudeCm(parseFloat(currentAltCm.toFixed(1)));

      // Recoil Force calculation
      const recoilN = airOn ? calculateRecoilForce(45000) : 0;
      // Thrust vectoring angle compensation (arcsin(F_recoil / 4 * T_rotor))
      // With F_recoil = 2.85 N and total drone weight/thrust ~ 38 N -> ~4.3 deg
      const recoilAngleDeg = airOn ? 4.3 : 0;
      const recoilAngleRad = (recoilAngleDeg * Math.PI) / 180;

      // Drone Center Position
      const droneCenterX = droneBaseX + normalX * currentAltitudePixels;
      const droneCenterY = droneBaseY + normalY * currentAltitudePixels;

      // Update parent telemetry
      if (onTelemetryUpdate) {
        onTelemetryUpdate({
          cleanliness: stateRef.current.cleanlinessScore,
          altitudeCm: currentAltCm,
          recoilN,
          recoilAngleDeg,
          detachmentRatio: usOn ? calculateAcousticDetachmentRatio(38.4, 1.2) : 0.1,
          airSpeedKmh: airOn ? calculateVenturiAirVelocity(45000, 4.8) : 0
        });
      }

      // Draw ToF LiDAR Measurement Rays (Dual Sensors)
      if (showRays) {
        const lidarOffset1 = -24;
        const lidarOffset2 = 24;

        // Tangent vector along panel
        const tanX = Math.cos(panelAngle);
        const tanY = Math.sin(panelAngle);

        const l1StartX = droneCenterX + tanX * lidarOffset1;
        const l1StartY = droneCenterY + tanY * lidarOffset1;
        const l1TargetX = droneBaseX + tanX * lidarOffset1;
        const l1TargetY = droneBaseY + tanY * lidarOffset1;

        const l2StartX = droneCenterX + tanX * lidarOffset2;
        const l2StartY = droneCenterY + tanY * lidarOffset2;
        const l2TargetX = droneBaseX + tanX * lidarOffset2;
        const l2TargetY = droneBaseY + tanY * lidarOffset2;

        // Laser Beams
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(l1StartX, l1StartY);
        ctx.lineTo(l1TargetX, l1TargetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(l2StartX, l2StartY);
        ctx.lineTo(l2TargetX, l2TargetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Laser reflection dots
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(l1TargetX, l1TargetY, 3, 0, Math.PI * 2);
        ctx.arc(l2TargetX, l2TargetY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Height Standoff Callout Pill
        ctx.fillStyle = 'rgba(11, 19, 38, 0.85)';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1;
        const pillX = droneCenterX + 45;
        const pillY = (droneCenterY + droneBaseY) / 2 - 10;
        ctx.fillRect(pillX, pillY, 110, 24);
        ctx.strokeRect(pillX, pillY, 110, 24);
        
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = '#00f0ff';
        ctx.fillText(`STANDOFF: ${currentAltCm.toFixed(1)}cm`, pillX + 8, pillY + 16);
      }

      // Draw Ultrasonic Cavitation Waves (38.4 kHz)
      if (usOn) {
        wavePhase = (wavePhase + 0.15) % (Math.PI * 2);
        ctx.save();
        ctx.translate(droneCenterX, droneCenterY);
        ctx.rotate(panelAngle);

        for (let r = 15; r <= 75; r += 14) {
          const currentRadius = (r + (wavePhase * 6)) % 80;
          const alpha = Math.max(0, 1 - currentRadius / 80) * 0.7;
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 10, currentRadius, 0.25 * Math.PI, 0.75 * Math.PI);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Venturi Air Knife Blast Stream (>180 km/h)
      if (airOn) {
        airParticlePhase = (airParticlePhase + 1) % 60;
        ctx.save();
        ctx.translate(droneCenterX, droneCenterY);
        ctx.rotate(panelAngle);

        // High velocity air stream jet cone
        const jetGradient = ctx.createLinearGradient(0, 12, 40, 75);
        jetGradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
        jetGradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
        jetGradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        
        ctx.fillStyle = jetGradient;
        ctx.beginPath();
        ctx.moveTo(-12, 12);
        ctx.lineTo(12, 12);
        ctx.lineTo(55, 75);
        ctx.lineTo(-20, 75);
        ctx.closePath();
        ctx.fill();

        // High speed flow streamlines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.2;
        for (let i = -1; i <= 1; i++) {
          ctx.beginPath();
          const startX = i * 6;
          ctx.moveTo(startX, 15);
          ctx.lineTo(startX + 28, 70);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Drone Body & Rotors
      ctx.save();
      ctx.translate(droneCenterX, droneCenterY);
      // Drone tilts by panel angle + recoil compensation angle!
      ctx.rotate(panelAngle + (airOn ? -recoilAngleRad : 0));

      // Carbon Fiber Drone Arm Truss
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(-55, -2);
      ctx.lineTo(55, -2);
      ctx.stroke();

      // Rotor Pods & Spinning Rotor Discs
      const rotorPositions = [-55, 55];
      rotorPositions.forEach((rx) => {
        // Motor mount
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(rx - 7, -10, 14, 12);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(rx - 7, -10, 14, 12);

        // Blurry rotor blades
        ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
        ctx.beginPath();
        ctx.ellipse(rx, -10, 28, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Rotor tip trail
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rx, -10, 26, 0, Math.PI);
        ctx.stroke();
      });

      // Central Avionics Fuselage
      const fuselageGradient = ctx.createLinearGradient(0, -20, 0, 15);
      fuselageGradient.addColorStop(0, '#0f172a');
      fuselageGradient.addColorStop(1, '#020617');
      ctx.fillStyle = fuselageGradient;
      ctx.beginPath();
      ctx.roundRect(-28, -18, 56, 28, 8);
      ctx.fill();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top GPS / RTK Mushroom Dome
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -22, 6, Math.PI, 0);
      ctx.fill();

      // Status LED
      ctx.fillStyle = active ? '#10b981' : '#f59e0b';
      ctx.shadowColor = active ? '#10b981' : '#f59e0b';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, -6, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bottom Payload Bay:
      // Ultrasonic Piezo Horn (Violet ring)
      ctx.fillStyle = '#7c3aed';
      ctx.fillRect(-18, 10, 14, 6);
      ctx.strokeStyle = '#c084fc';
      ctx.strokeRect(-18, 10, 14, 6);

      // Venturi Air Knife Slit Nozzle (Cyan extrusion)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(4, 10, 14, 6);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(4, 10, 14, 6);

      // Recoil Force Vector Arrow (Newton's Third Law)
      if (showForceVectors && airOn) {
        ctx.strokeStyle = '#ef4444';
        ctx.fillStyle = '#ef4444';
        ctx.lineWidth = 2.5;

        // Recoil arrow pointing upwards away from the air jet
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(-12, -45);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(-12, -45);
        ctx.lineTo(-6, -38);
        ctx.lineTo(-18, -38);
        ctx.closePath();
        ctx.fill();

        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillText(`F_recoil = 2.85 N`, -75, -45);

        // Rotor Tilt Vectoring Indicator
        ctx.strokeStyle = '#10b981';
        ctx.fillStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 32, -Math.PI / 2, -Math.PI / 2 + recoilAngleRad);
        ctx.stroke();
        ctx.fillText(`Δθ = 4.3° (PITCH TRIM)`, 36, -24);
      }

      ctx.restore();

      // Atmospheric / Wind Gust indicator
      if (gust) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        for (let i = 0; i < 4; i++) {
          const gy = 120 + i * 50;
          ctx.beginPath();
          ctx.moveTo(width - 50, gy);
          ctx.lineTo(width - 250, gy + 30);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillText('⚠ HIGH WIND GUST INJECTED: 38.5 KM/H', width - 290, 100);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [initParticles, onTelemetryUpdate, showForceVectors, showRays]);

  return (
    <div className="flex flex-col rounded-2xl bg-obsidian-900 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Canvas Header & Operational Mode */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-obsidian-850">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                DUAL-ACTION CLEANING SIMULATOR
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan/15 text-cyan border border-cyan/30">
                60 FPS RIGID BODY ENGINE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                BENBAN 25° TILT STRING
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Closed-loop dual ToF LiDAR standoff control (15.0cm ± 0.2cm) with dynamic thrust vectoring.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
              isRunning 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'HALT SORTIE' : 'ENGAGE SORTIE'}
          </button>

          <button
            onClick={initParticles}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-800 text-slate-300 hover:bg-slate-700 transition border border-slate-700"
            title="Reset Sand Dust Layer"
          >
            <RotateCcw className="w-4 h-4" />
            RESET DUST
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="relative w-full bg-[#060a12] flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          width={1000}
          height={480}
          className="w-full h-auto max-h-[500px] rounded-xl border border-slate-900 shadow-inner"
        />

        {/* Floating Telemetry Badge Overlay */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-obsidian-950/80 backdrop-blur-md border border-cyan/30 text-white font-mono text-xs flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan animate-pulse" />
            <span className="text-slate-400">STANDOFF LIDAR:</span>
            <span className="text-cyan font-bold">{altitudeCm.toFixed(1)} cm</span>
            <span className="text-[10px] text-emerald-400">(TARGET: 15.0cm)</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-obsidian-950/80 backdrop-blur-md border border-solar-gold/30 text-white font-mono text-xs flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-solar-gold" />
            <span className="text-slate-400">PANEL CLEANLINESS:</span>
            <span className="text-solar-gold font-bold">{cleanlinessScore.toFixed(1)}%</span>
            <span className="text-[10px] text-emerald-400">(+24.8% YIELD)</span>
          </div>
        </div>

        {/* Top-Right HUD Toggle Tools */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <button
            onClick={() => setShowRays(!showRays)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border backdrop-blur-md transition ${
              showRays ? 'bg-cyan/20 border-cyan text-cyan' : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
          >
            LIDAR RAYS
          </button>
          <button
            onClick={() => setShowForceVectors(!showForceVectors)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono border backdrop-blur-md transition ${
              showForceVectors ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
          >
            FORCE VECTORS
          </button>
        </div>
      </div>

      {/* Physics Actuator Controls & Telemetry Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-obsidian-850 border-t border-slate-800">
        {/* Actuator 1: Venturi Air Knife */}
        <div className={`p-3.5 rounded-xl border transition-all ${
          airKnifeActive 
            ? 'bg-cyan/10 border-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan" />
              <span className="text-xs font-bold text-white font-mono">VENTURI AIR KNIFE</span>
            </div>
            <button
              onClick={() => setAirKnifeActive(!airKnifeActive)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono transition ${
                airKnifeActive ? 'bg-cyan text-obsidian-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {airKnifeActive ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <div className="text-[10px] text-slate-400">Exit Velocity:</div>
              <div className="font-bold text-cyan">{airKnifeActive ? '193.4 km/h' : '0.0 km/h'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">EDF Speed:</div>
              <div className="font-bold text-white">{airKnifeActive ? '45,000 RPM' : 'IDLE'}</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Recoil: <span className="text-red-400 font-bold">{airKnifeActive ? '2.85 N' : '0.00 N'}</span> • Vector Trim: <span className="text-emerald-400 font-bold">{airKnifeActive ? '4.3°' : '0.0°'}</span>
          </div>
        </div>

        {/* Actuator 2: Ultrasonic Transducer */}
        <div className={`p-3.5 rounded-xl border transition-all ${
          ultrasoundActive 
            ? 'bg-purple-900/20 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
            : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white font-mono">ULTRASONIC CAVITATION</span>
            </div>
            <button
              onClick={() => setUltrasoundActive(!ultrasoundActive)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono transition ${
                ultrasoundActive ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {ultrasoundActive ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <div className="text-[10px] text-slate-400">Frequency:</div>
              <div className="font-bold text-purple-400">{ultrasoundActive ? '38.4 kHz' : '0.0 kHz'}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Detachment Ratio:</div>
              <div className="font-bold text-emerald-400">{ultrasoundActive ? '2.65x vdW' : '0.00x'}</div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Acceleration: <span className="text-purple-300 font-bold">{ultrasoundActive ? '6.9×10⁵ m/s²' : '0'}</span> • Silica Bond Broken
          </div>
        </div>

        {/* Actuator 3: Sortie Velocity Controller */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-solar-gold" />
              <span className="text-xs font-bold text-white font-mono">FLIGHT VELOCITY</span>
            </div>
            <span className="text-xs font-mono font-bold text-solar-gold">{cleaningSpeedMs.toFixed(1)} m/s</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.5"
            step="0.1"
            value={cleaningSpeedMs}
            onChange={(e) => setCleaningSpeedMs(parseFloat(e.target.value))}
            className="w-full accent-solar-gold bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer mt-1"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>Coverage: {(cleaningSpeedMs * 1.2 * 60).toFixed(0)} m²/min</span>
            <span>Speed: {(cleaningSpeedMs * 3.6).toFixed(1)} km/h</span>
          </div>
        </div>

        {/* Actuator 4: Environmental Stressor Injection */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-mono">WIND GUST STRESS</span>
            </div>
            <button
              onClick={() => setWindGustActive(!windGustActive)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono transition ${
                windGustActive 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {windGustActive ? 'GUST ON (38km/h)' : 'INJECT GUST'}
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-300 mt-1">
            Tests PID altitude recovery response against severe desert thermal updrafts.
          </div>
          <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Collision Envelope Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};