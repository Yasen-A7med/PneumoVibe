import { PidParameters } from '../types';

/**
 * Van der Waals Adhesion Force Calculation
 * F_vdw = (A_H * d_p) / (12 * z_0^2)
 */
export function calculateVanDerWaalsForce(particleDiameterMicrons = 5.0): number {
  const A_H = 1e-19; // Hamaker constant in Joules
  const d_p = particleDiameterMicrons * 1e-6; // meters
  const z_0 = 0.4e-9; // separation distance in meters
  return (A_H * d_p) / (12 * Math.pow(z_0, 2)); // Newtons (approx ~2.6e-7 N per grain)
}

/**
 * Inertial Detachment Force from Ultrasonic Cavitation (38.4 kHz)
 * a_p = omega^2 * Amplitude
 * F_inertial = m_p * a_p
 */
export function calculateAcousticDetachmentRatio(frequencyKhz = 38.4, amplitudeMicrons = 1.2): number {
  const omega = 2 * Math.PI * (frequencyKhz * 1000);
  const amplitudeM = amplitudeMicrons * 1e-6;
  const acceleration = Math.pow(omega, 2) * amplitudeM; // ~6.9e5 m/s^2
  
  const particleRadius = 2.5e-6; // 5 micron diameter
  const silicaDensity = 2650; // kg/m^3
  const volume = (4 / 3) * Math.PI * Math.pow(particleRadius, 3);
  const mass = silicaDensity * volume;
  
  const f_inertial = mass * acceleration;
  const f_vdw = calculateVanDerWaalsForce(5.0);
  
  // Ratio of detachment force to adhesion force (> 1.0 means full dislodgement)
  return f_inertial / f_vdw;
}

/**
 * Venturi Air Knife Exit Velocity (Continuity Equation)
 * v2 = v1 * (A1 / A2)
 */
export function calculateVenturiAirVelocity(rpm = 45000, areaRatio = 4.8): number {
  // Baseline intake velocity ~ 11.2 m/s at 45,000 RPM
  const baseIntakeSpeedMs = (rpm / 45000) * 11.2;
  const exitVelocityMs = baseIntakeSpeedMs * areaRatio;
  return exitVelocityMs * 3.6; // Convert to km/h (~193 km/h at 45k RPM)
}

/**
 * Aerodynamic Recoil Force (Newton's Third Law)
 * F_recoil = m_dot * v_exit
 */
export function calculateRecoilForce(rpm = 45000): number {
  const airDensity = 1.18; // kg/m^3 at 38°C desert ambient
  const flowRateM3h = (rpm / 45000) * 135; // m^3/hr
  const flowRateM3s = flowRateM3h / 3600;
  const massFlowKgS = airDensity * flowRateM3s; // ~0.044 kg/s
  const exitVelocityMs = (calculateVenturiAirVelocity(rpm) / 3.6); // ~53.6 m/s
  return massFlowKgS * exitVelocityMs; // ~2.85 Newtons
}

/**
 * PID Controller for Altitude Standoff Hold
 */
export class AltitudePidController {
  private integral = 0;
  private prevError = 0;

  public compute(targetCm: number, currentCm: number, params: PidParameters, dt = 0.05): number {
    const error = targetCm - currentCm;
    this.integral += error * dt;
    // Anti-windup
    this.integral = Math.max(-10, Math.min(10, this.integral));
    const derivative = (error - this.prevError) / dt;
    this.prevError = error;

    const output = (params.kp * error) + (params.ki * this.integral) + (params.kd * derivative);
    return Math.max(-5, Math.min(5, output)); // Clamped thrust differential
  }

  public reset(): void {
    this.integral = 0;
    this.prevError = 0;
  }
}
