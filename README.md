# PneumoVibe v2.0 🛸☀️
### 3D Autonomous Solar Fleet Mission Control & FPV Simulator
> **Target Case Study: Benban Solar Park 1.8 GW (Sector 4, 50 MWp Utility-Scale Array)**  
> **ISEF 2026 Grand Entry** (Cairo Regional Fair, TDC / Ministry of Education)  
> **Student Researchers:** Yassen Ahmed Salh & Safy ELRAHMAN Mohamed  

---

## 🌐 Live Production Deployment
- **Live Platform URL:** [https://pneumovibe.vercel.app/](https://pneumovibe.vercel.app/)
- **GitHub Repository:** [https://github.com/Yasen-A7med/PneumoVibe](https://github.com/Yasen-A7med/PneumoVibe)

---

## 🚀 Key Features of PneumoVibe v2.0

1. **Full 3D Procedural Solar Array**:
   - High-fidelity Three.js 3D rendering of Benban's 25° fixed-tilt solar racks.
   - Dynamic dust deposition & real-time cleaning simulation with composite texture mapping.
2. **Autonomous Multi-Drone Swarm**:
   - 4 autonomous drones (`DR-01`, `DR-02`, `DR-03`, `DR-04`) with individual telemetry, battery management, and task scheduling.
   - Dual ToF LiDAR laser ranging keeping exact 15.0 cm standoff distance above glass.
   - 38.4 kHz Ultrasonic Cavitation particle disruption & >180 km/h Venturi air knife ejection.
3. **Multi-Camera & Cockpit FPV Simulator**:
   - **Mode A: Tactical Orbit / SCADA Overview** with full fleet overview and row inspection.
   - **Mode B: Cockpit Pilot Mode** with live FPV camera, crosshair HUD, and pitch/roll artificial horizon.
   - **Cinematic Showcase Mode** with dynamic automated fly-by camera cuts.
4. **Thermal FLIR Hotspot Radiometric Scanning**:
   - Real-time thermal overlay with false-color gradient to detect cell hotspots and diode burnouts.
5. **Khamaseen Sandstorm Simulator & Auto-Failsafe**:
   - Severe desert wind gust (>45 km/h) triggers automated Swarm Emergency RTH and hermetic docking hatch seal.
6. **Web Audio Synthesizer**:
   - Dynamic sound effects for EDF blower whine, ultrasonic cavitation hum, and rotor drone.
7. **Mobile Touch & Dual Virtual Joysticks**:
   - Full touch screen support with virtual thumbsticks for manual piloting.

---

## 🔬 Core Scientific Foundations

- **Van der Waals Force**: $F_{\text{vdW}} = \frac{A_H \cdot d_p}{12 z_0^2} \approx 2.60 \times 10^{-7}\text{ N}$
- **Ultrasonic Cavitation**: $a_p = \omega^2 A \approx 6.94 \times 10^5\text{ m/s}^2 \implies F_{\text{inertial}}/F_{\text{vdW}} = 2.65 > 1.0$ (Complete bond failure)
- **Venturi Continuity**: $v_{\text{exit}} \ge 180\text{ km/h}$ via 45,000 RPM EDF
- **Recoil Vectoring**: $F_{\text{recoil}} = 2.85\text{ N} \implies \Delta \theta = 4.3^\circ$ pitch trim compensation
- **Contact Pressure**: $0.00\text{ kPa}$ (Zero glass micro-cracks)

---

## 🏃 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/Yasen-A7med/PneumoVibe.git

# Navigate to project directory
cd PneumoVibe

# Install dependencies
npm install

# Run local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🏆 Research Team
- **Yassen Ahmed Salh** (National ID: `30901290101397` | Unified Code: `460790740`)
- **Safy ELRAHMAN Mohamed**
- **Fair:** ISEF 2026 Cairo Regional Fair, Technology Development Center (TDC), Ministry of Education, Egypt.
