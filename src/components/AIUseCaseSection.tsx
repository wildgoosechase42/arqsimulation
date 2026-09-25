import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export function AIUseCaseSection() {
  return (
    <section id="usecase" className="relative z-20 bg-background text-foreground py-20 px-6 md:px-12 border-t border-border">
      <div className="max-w-4xl mx-auto space-y-6">
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight uppercase text-primary">
              AI Use Case : Climate
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative group bg-[#0c0c12] border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-6 md:p-8 shadow-[0_0_35px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(227,175,53,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 border-l-4 border-primary pl-5 py-1 space-y-4">
              <p className="text-sm md:text-base text-foreground font-medium leading-relaxed">
                We use the <span className="text-primary font-bold">Stop-and-Wait ARQ</span> concept to ensure reliable communication between our <span className="text-primary font-bold">IoT-based Automated Weather Stations (AWS)</span> and the central heatwave monitoring system. The AWS sends weather data such as temperature observations to the server one packet at a time and waits for an acknowledgement (ACK) before sending the next packet.
              </p>
              
              <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
                If a packet or ACK is lost due to communication issues, the system retransmits the packet. This helps us ensure that important weather data reaches the monitoring system reliably and can be safely used for <span className="text-primary font-bold">heatwave prediction</span>, <span className="text-primary font-bold">forecast validation</span>, and <span className="text-primary font-bold">early warning generation</span>.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
