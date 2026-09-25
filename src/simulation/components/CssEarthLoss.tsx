import React from 'react';
import { motion } from 'motion/react';

/**
 * Lightweight CSS-only destroyed earth visual for the LOSS end-screen.
 * Replaces the Three.js DestroyedEarthPreview to avoid WebGL context exhaustion
 * on weaker GPUs, which caused black screens.
 */
export function CssEarthLoss() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0505] via-[#0f0505] to-[#0a0202]">
      {/* Ember particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full"
            style={{
              left: `${(i * 41 + 17) % 100}%`,
              bottom: `${(i * 29 + 11) % 60}%`,
              backgroundColor: i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#ef4444' : '#fbbf24',
            }}
            animate={{
              y: [0, -40 - (i % 5) * 15],
              opacity: [0.8, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i % 7) * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Destruction glow */}
      <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full bg-red-600/30 blur-xl animate-pulse" />
      <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-orange-500/20 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Destroyed earth sphere */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #78350f 0%, #451a03 25%, #1c1917 50%, #0c0a09 80%, #000 100%)',
          boxShadow: '0 0 35px rgba(239, 68, 68, 0.5), 0 0 15px rgba(249, 115, 22, 0.3), inset -6px -3px 12px rgba(0,0,0,0.8), inset 3px 2px 8px rgba(251, 146, 60, 0.2)',
        }}
      >
        {/* Lava cracks */}
        <div
          className="absolute bg-gradient-to-r from-transparent via-red-500 to-transparent"
          style={{ top: '20%', left: '10%', width: '60%', height: '2px', transform: 'rotate(25deg)' }}
        />
        <div
          className="absolute bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          style={{ top: '40%', left: '25%', width: '55%', height: '2px', transform: 'rotate(-15deg)' }}
        />
        <div
          className="absolute bg-gradient-to-r from-transparent via-red-600 to-transparent"
          style={{ top: '60%', left: '15%', width: '50%', height: '2px', transform: 'rotate(40deg)' }}
        />
        <div
          className="absolute bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
          style={{ top: '35%', left: '40%', width: '45%', height: '1.5px', transform: 'rotate(-30deg)' }}
        />
        <div
          className="absolute bg-gradient-to-r from-transparent via-orange-400 to-transparent"
          style={{ top: '75%', left: '20%', width: '40%', height: '1.5px', transform: 'rotate(10deg)' }}
        />

        {/* Scorched land patches */}
        <div
          className="absolute rounded-full bg-stone-800/80"
          style={{ top: '15%', left: '20%', width: '28%', height: '20%', transform: 'rotate(-8deg)' }}
        />
        <div
          className="absolute rounded-full bg-stone-900/70"
          style={{ top: '50%', left: '45%', width: '22%', height: '25%', transform: 'rotate(12deg)' }}
        />
        <div
          className="absolute rounded-full bg-stone-800/60"
          style={{ top: '65%', left: '15%', width: '20%', height: '15%', transform: 'rotate(-5deg)' }}
        />

        {/* Toxic atmosphere overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 65% 60%, transparent 40%, rgba(239, 68, 68, 0.1) 60%, rgba(239, 68, 68, 0.25) 100%)',
          }}
        />

        {/* Lava glow hotspots */}
        <div className="absolute w-3 h-3 rounded-full bg-orange-500/60 blur-[3px]" style={{ top: '25%', left: '35%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-red-500/50 blur-[2px]" style={{ top: '55%', left: '50%' }} />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-yellow-500/40 blur-[3px]" style={{ top: '70%', left: '25%' }} />
      </motion.div>

      {/* Debris ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute w-32 h-32 md:w-40 md:h-40"
      >
        {[0, 60, 120, 200, 280, 330].map((deg, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-stone-500 rounded-sm"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${deg}deg) translateX(${60 + (i % 3) * 8}px) translateY(-50%)`,
              opacity: 0.5 + (i % 3) * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Status indicators */}
      <div className="absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-red-400 tracking-wider">
          CRITICAL // ATMOSPHERIC LOSS
        </span>
      </div>

      <div className="absolute top-2 right-3 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-red-300 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-red-500/40 shadow">
          PARITY FAILURE
        </span>
      </div>
    </div>
  );
}
