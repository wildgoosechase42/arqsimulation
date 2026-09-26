import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface ConclusionProps {
  onReturnToTop?: () => void;
}

export function Conclusion({ onReturnToTop }: ConclusionProps) {
  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (onReturnToTop) {
      onReturnToTop();
    }
  };

  return (
    <section id="conclusion" className="relative z-20 bg-background text-foreground py-20 px-6 md:px-12 border-t border-border">
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
              Conclusion
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative group bg-[#0c0c12] border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-6 md:p-8 shadow-[0_0_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(227,175,53,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative z-10 border-l-4 border-primary pl-5 py-1">
              <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                "<span className="text-primary font-bold">Stop-and-Wait ARQ</span> provides reliable, error-free communication over unreliable channels at the expense of bandwidth efficiency. By incorporating <span className="text-primary font-bold">1-bit sequence numbers</span> and <span className="text-primary font-bold">timeout retransmissions</span>, it successfully eliminates packet loss and duplicate delivery."
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="relative group bg-[#0c0c12] border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_0_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(227,175,53,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.35)]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/25 border border-emerald-500/25">
                <span className="font-mono text-xs md:text-sm font-bold text-emerald-400 tracking-wider">
                  [EXPERIMENT COMPLETED // 100% PROTOCOL VERIFIED]
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReturnToTop}
              className="relative z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-[#e3af35] to-[#f5c754] text-black font-mono text-xs md:text-sm font-extrabold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(227,175,53,0.35)] hover:shadow-[0_0_35px_rgba(227,175,53,0.65)] flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>&uarr;</span>
              <span>Return to Top</span>
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="pt-8 mt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary/80 animate-pulse shadow-[0_0_8px_var(--primary)]" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Developer
                </span>
                <span className="hidden sm:inline text-muted-foreground/40 font-mono text-xs">&bull;</span>
                <span className="font-mono text-sm md:text-base font-bold text-foreground tracking-wide">
                  Chaitya Modi
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Roll No:
              </span>
              <span className="font-mono text-xs md:text-sm font-bold text-primary bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-lg tracking-wider shadow-[0_0_12px_rgba(227,175,53,0.15)]">
                16010425069
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export const ConclusionSection = Conclusion;
