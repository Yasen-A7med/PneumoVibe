import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export type StatusState = 'active' | 'docked' | 'standby';

interface StatusBadgeProps {
  state?: StatusState;
  label?: string;
  className?: string;
}

const STATE_CLASSES: Record<StatusState, { iconColor: string; borderColor: string; glow: string; text: string }> = {
  active: {
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    glow: 'rgba(52, 211, 153, 0.4)',
    text: 'Active',
  },
  docked: {
    iconColor: 'text-cyan',
    borderColor: 'border-cyan/20',
    glow: 'rgba(0, 240, 255, 0.4)',
    text: 'Docked',
  },
  standby: {
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    glow: 'rgba(251, 191, 36, 0.4)',
    text: 'Standby',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ state = 'active', label, className = '' }) => {
  const current = STATE_CLASSES[state];

  return (
    <div
      className={`relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border ${current.borderColor} text-xs font-medium text-zinc-300 shadow-sm ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: current.iconColor.includes('emerald') ? '#34d399' : current.iconColor.includes('cyan') ? '#00f0ff' : '#fbbf24',
          boxShadow: `0 0 8px ${current.glow}`,
        }}
      />
      <span className="tracking-wide">{label || current.text}</span>
    </div>
  );
};