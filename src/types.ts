export type FlightStatus = 'DOCKED' | 'TAKEOFF' | 'CLEANING' | 'HOVERING' | 'RTH' | 'EMERGENCY_ABORT';

export interface DronePhysicsState {
  x: number;              // Horizontal progress across panel string (0 to 100%)
  altitudeMeters: number; // Standoff distance (target 0.15m)
  pitchRad: number;       // Tilt angle for recoil compensation
  airKnifeActive: boolean;
  ultrasoundActive: boolean;
  edfRpm: number;
  batterySoc: number;     // 0 to 100%
  cleaningSpeedMs: number;
  recoilForceN: number;
  cleanlinessScore: number; // 74.2% to 99.2%
}

export interface FleetUnit {
  id: string;
  name: string;
  status: FlightStatus;
  battery: number;
  currentString: string;
  edfRpm: number;
  altitudeCm: number;
  speedMs: number;
  airKnife: boolean;
  ultrasound: boolean;
  tempC: number;
  flightTimeMin: number;
}

export interface DockingStationState {
  id: string;
  name: string;
  hatchStatus: 'SEALED' | 'OPENING' | 'OPEN' | 'CLOSING';
  internalTempC: number;
  ambientTempC: number;
  solarCanopyPowerKw: number;
  batteryBufferSoc: number;
  chargeCurrentA: number;
  ipRating: string;
  connectedDroneId: string | null;
}

export interface PidParameters {
  kp: number;
  ki: number;
  kd: number;
  recoilFeedforward: number;
  targetAltitudeCm: number;
}

export interface EconomicMetrics {
  instantaneousPowerBoostMw: number;
  dailyRevenueRecoveredUsd: number;
  waterSavedLiters: number;
  avoidedMicrocracks: number;
  annualOpexSavingsUsd: number;
  lcoeReductionUsdPerKwh: number;
}
