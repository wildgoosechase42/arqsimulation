import React from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';

interface HeroProps {
  stage: number;
  progress: MotionValue<number>;
  onBack?: () => void;
}

export function Hero({ stage, progress, onBack }: HeroProps) {
  const heroOpacity = useTransform(progress, [0, 0.5], [1, 0]);
  const heroY = useTransform(progress, [0, 0.5], [0, -40]);
  
  const contentOpacity = useTransform(progress, [0.5, 1], [0, 1]);
  const contentX = useTransform(progress, [0.5, 1], [-60, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 pointer-events-auto">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 to-primary/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white p-1.5 shadow-[0_0_25px_rgba(227,175,53,0.35)] border-2 border-primary/60 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Somaiya Vidyavihar" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 vignette-text-box"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div className="h-px w-8 bg-primary/40" />
          <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase text-glow-shadow font-bold">
            Stop-and-Wait ARQ
          </span>
          <div className="h-px w-8 bg-primary/40" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase max-w-4xl text-primary text-glow-shadow">
          One frame at a time.<br />
          <span>Zero room for error.</span>
        </h1>
      </motion.div>

      <motion.div 
        className="absolute inset-0 flex items-center px-8 md:px-24 pointer-events-auto"
        style={{ opacity: contentOpacity, x: contentX }}
      >
        <div className="max-w-md p-8 md:p-10 rounded-2xl vignette-text-box border border-primary/30 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Protocol Simulation
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-primary leading-tight tracking-tight uppercase text-glow-shadow">
            Stop-and-Wait
          </h2>

          <p className="text-slate-200 text-sm md:text-base font-medium mb-8 leading-relaxed">
            Transmit one frame. Await acknowledgment. Retransmit on timeout.
          </p>

          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => {
                const el = document.getElementById('aim') || document.getElementById('theory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-[#e3af35] to-[#f5c754] text-black font-mono font-bold uppercase tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(227,175,53,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Explore Protocol &rarr;
            </button>
            <button 
              type="button"
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-6 py-3.5 bg-transparent border border-white/20 text-white font-mono font-semibold uppercase tracking-wider text-xs rounded-xl hover:border-primary/60 hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
