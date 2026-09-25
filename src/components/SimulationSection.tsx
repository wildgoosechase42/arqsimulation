import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import SimulationGame from '../simulation/SimulationGame';

export function SimulationSection() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
        }
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown, { passive: false });

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  return (
    <>
      <section id="simulation" className="relative z-20 bg-background text-foreground py-20 px-6 md:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-primary">
              Simulation
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative group bg-[#0c0c12] border-2 border-primary/30 hover:border-primary/80 rounded-2xl p-8 md:p-10 shadow-[0_0_35px_rgba(0,0,0,0.7)] hover:shadow-[0_0_40px_rgba(227,175,53,0.18)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-foreground font-semibold">
                  Launch the interactive protocol simulation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-[#e3af35] to-[#f5c754] text-black font-mono text-sm md:text-base font-extrabold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(227,175,53,0.5)] hover:shadow-[0_0_50px_rgba(227,175,53,0.9)] flex items-center justify-center gap-3 whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                <span>Play Simulation</span>
                <span className="text-lg">&rarr;</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col overflow-hidden"
          >
            <div className="h-16 px-6 bg-[#101014] border-b border-border flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-foreground">
                  MIRA HQ <span className="text-primary">//</span> ARQ LABS SIMULATION
                </span>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-primary font-bold">WASD / Arrow Keys</span> Move
                <span className="text-white/30">•</span>
                <span className="text-primary font-bold">[E]</span> Interact
                <span className="text-white/30">•</span>
                <span className="text-primary font-bold">[V]</span> Vent / Exit
                <span className="text-white/30">•</span>
                <span className="text-primary font-bold">[ESC]</span> Close
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground text-xs font-mono font-bold uppercase tracking-wider hover:bg-destructive hover:text-white hover:border-destructive transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>&times;</span>
                <span>EXIT SIMULATION</span>
              </button>
            </div>

            <div className="flex-1 w-full h-full relative overflow-hidden bg-black">
              <SimulationGame onExit={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
