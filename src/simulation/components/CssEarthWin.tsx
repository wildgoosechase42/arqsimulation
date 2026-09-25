import React from 'react';
import { motion } from 'motion/react';

/**
 * Lightweight CSS-only peaceful earth visual for the WIN end-screen.
 * Replaces the Three.js PeacefulEarthPreview to avoid WebGL context exhaustion
 * on weaker GPUs, which caused black screens.
 */
export function CssEarthWin() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#020617] via-[#0c1222] to-[#020617]">
      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.15,
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite ${(i % 4) * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Earth glow */}
      <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

      {/* Earth sphere */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #3b82f6 0%, #1d4ed8 30%, #1e3a5f 60%, #0f172a 100%)',
          boxShadow: '0 0 30px rgba(52, 211, 153, 0.4), inset -8px -4px 15px rgba(0,0,0,0.6), inset 4px 2px 10px rgba(147, 197, 253, 0.3)',
        }}
      >
        {/* Continents */}
        <div
          className="absolute rounded-full bg-emerald-500"
          style={{ top: '20%', left: '25%', width: '30%', height: '22%', transform: 'rotate(-10deg)', opacity: 0.85 }}
        />
        <div
          className="absolute rounded-full bg-emerald-600"
          style={{ top: '35%', left: '55%', width: '20%', height: '35%', transform: 'rotate(5deg)', opacity: 0.8 }}
        />
        <div
          className="absolute rounded-full bg-green-500"
          style={{ top: '55%', left: '18%', width: '25%', height: '18%', transform: 'rotate(15deg)', opacity: 0.75 }}
        />
        <div
          className="absolute rounded-full bg-emerald-400/60"
          style={{ top: '15%', left: '60%', width: '18%', height: '14%', opacity: 0.7 }}
        />
        {/* Cloud wisps */}
        <div
          className="absolute rounded-full bg-white/25 blur-[1px]"
          style={{ top: '30%', left: '10%', width: '40%', height: '8%', transform: 'rotate(-5deg)' }}
        />
        <div
          className="absolute rounded-full bg-white/20 blur-[1px]"
          style={{ top: '60%', left: '35%', width: '35%', height: '6%', transform: 'rotate(8deg)' }}
        />
        {/* Atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 70% 65%, transparent 55%, rgba(52, 211, 153, 0.15) 70%, rgba(52, 211, 153, 0.3) 100%)',
          }}
        />
      </motion.div>

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full border border-emerald-400/30"
        style={{ transform: 'rotateX(65deg)' }}
      >
        {/* Satellite dot */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_#34d399]" />
      </motion.div>

      {/* Status indicators */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-emerald-400 tracking-wider">
          STATUS // PLANET SECURED
        </span>
      </div>

      <div className="absolute top-2 right-3 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-emerald-200 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40">
          TELEMETRY: OPTIMAL
        </span>
      </div>
    </div>
  );
}
