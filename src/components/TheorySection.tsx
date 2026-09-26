import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

export function TheorySection() {
  const [activeDiagram, setActiveDiagram] = useState<'normal' | 'loss'>('normal');

  return (
    <>
      <section id="aim" className="relative z-20 bg-background text-foreground py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-8">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary uppercase tracking-widest px-3 py-1 rounded bg-primary/10 border border-primary/20">
                  Section 02 // Objective
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
                Aim
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-card border border-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <p className="text-foreground text-lg md:text-2xl font-medium leading-relaxed">
                "To understand, visualize, and analyze the mechanism of the Stop-and-Wait Automatic Repeat reQuest (ARQ) protocol "
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="theory" className="relative z-20 bg-background text-foreground py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-6xl mx-auto space-y-16">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-primary uppercase tracking-widest px-3 py-1 rounded bg-primary/10 border border-primary/20">
                  Section 03 // Architecture
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
                Theory
              </h2>
            </div>
          </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.05} className="h-full">
            <div className="bg-card border border-border rounded-xl p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                    Module 01 // Definition
                  </h4>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Automatic Repeat reQuest (ARQ)
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  <strong className="text-foreground">ARQ</strong> stands for <strong className="text-primary font-semibold">Automatic Repeat reQuest</strong>. It is an error-control strategy for data transmission that utilizes acknowledgments (ACKs) and timeout counters to achieve reliable, in-order packet delivery over inherently noisy or unreliable physical media.
                </p>
                <div className="space-y-4 font-mono text-sm">
                  <div className="p-4 rounded-lg bg-secondary/40 border border-border flex items-start gap-3">
                    <span className="text-primary font-bold text-base">01.</span>
                    <div>
                      <span className="text-foreground font-semibold block text-sm md:text-base">Error Detection</span>
                      <span className="text-muted-foreground text-xs md:text-sm font-sans mt-1 block leading-relaxed">Frames carry redundancy checks (CRC/Checksum) to detect corruption upon reception.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/40 border border-border flex items-start gap-3">
                    <span className="text-primary font-bold text-base">02.</span>
                    <div>
                      <span className="text-foreground font-semibold block text-sm md:text-base">Acknowledgment Signaling</span>
                      <span className="text-muted-foreground text-xs md:text-sm font-sans mt-1 block leading-relaxed">The receiver transmits an explicit ACK confirmation frame upon fault-free arrival.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/40 border border-border flex items-start gap-3">
                    <span className="text-primary font-bold text-base">03.</span>
                    <div>
                      <span className="text-foreground font-semibold block text-sm md:text-base">Timeout Retransmission</span>
                      <span className="text-muted-foreground text-xs md:text-sm font-sans mt-1 block leading-relaxed">If no ACK returns within the round-trip timeout window, the sender automatically retransmits.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="h-full">
            <div className="bg-card border border-border rounded-xl p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                    Module 02 // Sequence Numbers
                  </h4>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  1-Bit Sequence Addressing
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  Stop-and-Wait ARQ requires a <strong className="text-foreground">1-bit sequence number</strong> (toggling between <strong className="text-primary">0</strong> and <strong className="text-primary">1</strong>) in the header of each frame to eliminate duplicate delivery caused by delayed or lost ACKs.
                </p>
                <div className="p-4 rounded-lg bg-secondary/40 border border-border space-y-3.5 font-mono text-xs md:text-sm">
                  <div className="flex justify-between items-center pb-2.5 border-b border-border/60">
                    <span className="text-muted-foreground">Sequence Field Size:</span>
                    <span className="text-foreground font-bold">m = 1 bit</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-border/60">
                    <span className="text-muted-foreground">Sequence Space:</span>
                    <span className="text-primary font-bold">2^m = 2 (0 and 1)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b border-border/60">
                    <span className="text-muted-foreground">Duplicate Detection:</span>
                    <span className="text-foreground font-medium">Discard duplicate frame</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duplicate Response:</span>
                    <span className="text-foreground font-medium">Re-transmit ACK for sender</span>
                  </div>
                </div>
                <div className="mt-5 p-4 rounded-lg bg-primary/10 border border-primary/20 text-xs md:text-sm text-foreground/90 leading-relaxed font-sans">
                  <span className="font-bold text-primary font-mono block mb-1.5 text-xs md:text-sm">DUPLICATE ELIMINATION RULE:</span>
                  If the receiver gets a frame with the same sequence number as the previous frame, it discards the duplicate payload and immediately sends back an ACK to allow the sender to progress.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-4 bg-primary rounded-full" />
                  <h3 className="text-xl font-bold text-foreground">Protocol Flow</h3>
                </div>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-lg border border-border self-start">
                <button
                  onClick={() => setActiveDiagram('normal')}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all ${
                    activeDiagram === 'normal'
                      ? 'bg-primary text-primary-foreground font-bold shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Normal Flow
                </button>
                <button
                  onClick={() => setActiveDiagram('loss')}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs transition-all ${
                    activeDiagram === 'loss'
                      ? 'bg-primary text-primary-foreground font-bold shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Loss & Timeout Flow
                </button>
              </div>
            </div>

            {activeDiagram === 'normal' ? (
              <div className="relative max-w-xl mx-auto py-6 px-4 font-mono">
                <div className="flex justify-between items-center px-4 pb-4 border-b border-border text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-foreground">SENDER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">RECEIVER</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  </div>
                </div>

                <div className="relative py-6 space-y-7">
                  <div className="absolute top-0 bottom-0 left-[18px] w-px bg-border" />
                  <div className="absolute top-0 bottom-0 right-[18px] w-px bg-border" />

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-primary/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-primary/60 text-primary font-bold text-xs shadow-md">
                        Frame 0 &rarr;
                      </span>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-r-4 border-t-4 border-b-4 border-l-0 border-transparent border-r-primary" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-indigo-400/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-indigo-500/60 text-indigo-400 font-bold text-xs shadow-md">
                        &larr; ACK 0
                      </span>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-l-indigo-400" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-primary/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-primary/60 text-primary font-bold text-xs shadow-md">
                        Frame 1 &rarr;
                      </span>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-r-4 border-t-4 border-b-4 border-l-0 border-transparent border-r-primary" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-indigo-400/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-indigo-500/60 text-indigo-400 font-bold text-xs shadow-md">
                        &larr; ACK 1
                      </span>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-l-indigo-400" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative max-w-xl mx-auto py-6 px-4 font-mono">
                <div className="flex justify-between items-center px-4 pb-4 border-b border-border text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-foreground">SENDER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">RECEIVER</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  </div>
                </div>

                <div className="relative py-6 space-y-7">
                  <div className="absolute top-0 bottom-0 left-[18px] w-px bg-border" />
                  <div className="absolute top-0 bottom-0 right-[18px] w-px bg-border" />

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute left-0 right-1/2 top-1/2 -translate-y-1/2 border-t border-dashed border-red-500/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-red-500/60 text-red-400 font-bold text-xs shadow-md">
                        Frame 0 &rarr; &times; Lost
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-zinc-700 relative z-10" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse relative z-10" />
                    <div className="flex-1 mx-3">
                      <span className="px-3 py-1 rounded-full bg-[#101013] border border-amber-500/60 text-amber-400 font-bold text-xs shadow-md inline-flex items-center gap-1.5">
                        Timeout
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-transparent" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-primary/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-primary/60 text-primary font-bold text-xs shadow-md">
                        Frame 0 (Retransmit) &rarr;
                      </span>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-r-4 border-t-4 border-b-4 border-l-0 border-transparent border-r-primary" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>

                  <div className="relative flex items-center justify-between px-3">
                    <div className="w-2 h-2 rounded-full bg-primary relative z-10" />
                    <div className="flex-1 mx-3 flex items-center justify-center relative">
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-indigo-400/60" />
                      <span className="relative z-10 px-4 py-1 rounded-full bg-[#101013] border border-indigo-500/60 text-indigo-400 font-bold text-xs shadow-md">
                        &larr; ACK 0
                      </span>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-solid border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-l-indigo-400" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 relative z-10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-4 bg-primary rounded-full" />
              <h3 className="text-xl font-bold text-foreground">Efficiency Analysis</h3>
            </div>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              In Stop-and-Wait ARQ, the sender transmits one frame and remains idle while waiting for the acknowledgment. This idle waiting time directly impacts efficiency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-secondary/40 border border-border font-mono flex flex-col justify-center">
                <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Efficiency Formula</span>
                <span className="text-2xl md:text-3xl text-primary font-bold tracking-tight">&eta; = 1 / (1 + 2a)</span>
                <span className="text-xs text-muted-foreground mt-2 block font-sans">
                  where <strong className="text-foreground font-mono">a</strong> is the ratio of propagation delay to transmission time.
                </span>
              </div>
              <div className="p-5 rounded-xl bg-secondary/40 border border-border flex flex-col justify-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold whitespace-nowrap">
                    Short Distance
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">Little waiting time &rarr; High efficiency</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold whitespace-nowrap">
                    Long Distance
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">Long waiting time &rarr; Low efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);
}
