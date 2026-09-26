import React, { useState } from 'react';
import { TestModal, Question } from './TestModal';
import { ScrollReveal } from './ScrollReveal';

export const PRE_TEST_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the primary role of error control mechanisms at the Data Link Layer?",
    options: [
      "Encrypting payloads to prevent unauthorized network eavesdropping",
      "Detecting and correcting frame transmission errors caused by noisy channels",
      "Selecting the most optimal path across intermediate autonomous systems",
      "Allocating dynamic IP addresses to communicating end hosts"
    ],
    correctIndex: 1,
    explanation: "At the Data Link Layer (Layer 2), error control mechanisms ensure that frames transmitted across unreliable physical links are detected for corruption and retransmitted reliably."
  },
  {
    id: 2,
    question: "What does the protocol acronym ARQ stand for?",
    options: [
      "Automatic Repeat reQuest",
      "Asynchronous Redundant Queue",
      "Adaptive Routing Query",
      "Automated Rate Quality"
    ],
    correctIndex: 0,
    explanation: "ARQ stands for Automatic Repeat reQuest, a feedback-driven error control technique using positive/negative acknowledgments and timers."
  },
  {
    id: 3,
    question: "In the basic Stop-and-Wait ARQ protocol, how does the sender know a frame was received successfully?",
    options: [
      "By waiting for an explicit positive Acknowledgment (ACK) frame from the receiver",
      "By continuously sensing the carrier signal voltage level on the wire",
      "By checking if the local buffer has been cleared by the kernel",
      "By querying the network DNS gateway status"
    ],
    correctIndex: 0,
    explanation: "Stop-and-Wait ARQ mandates that the transmitter halts and waits until an explicit ACK frame is delivered back from the receiver before sending the subsequent packet."
  },
  {
    id: 4,
    question: "Why must the sender maintain a retransmission timer in Stop-and-Wait ARQ?",
    options: [
      "To prevent processor overheating during high-volume transfers",
      "To detect lost or excessively delayed frames and trigger automatic retransmission",
      "To adjust the physical transmission frequency of the optical fiber",
      "To synchronize atomic clocks between sender and receiver nodes"
    ],
    correctIndex: 1,
    explanation: "If a data frame or ACK is lost in transit, the sender would deadlock indefinitely without a timer. The expiration of the timeout counter triggers automatic frame retransmission."
  },
  {
    id: 5,
    question: "What communication mode characterizes the transmission exchange in Stop-and-Wait ARQ?",
    options: [
      "Full-duplex continuous stream pipelining",
      "Half-duplex alternating transmission (sending a frame, then waiting for ACK)",
      "Simplex unidirectional communication with zero return channel",
      "Multicast broadcast beaconing"
    ],
    correctIndex: 1,
    explanation: "Stop-and-Wait functions as an alternating half-duplex sequence exchange: the sender transmits and waits, then the receiver transmits the ACK while the sender listens."
  }
];

export function PreTestSection() {
  const [activeModal, setActiveModal] = useState<boolean>(false);

  return (
    <>
      <section id="pretest" className="relative z-20 bg-background text-foreground py-20 px-6 md:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
              Pretest
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative group bg-[#0c0c12] border-2 border-primary/30 hover:border-primary/80 rounded-2xl p-8 md:p-10 shadow-[0_0_35px_rgba(0,0,0,0.7)] hover:shadow-[0_0_40px_rgba(227,175,53,0.18)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-foreground font-semibold">
                  Attempt this test to test your knowledge.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(true)}
                className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-[#e3af35] to-[#f5c754] text-black font-mono text-sm md:text-base font-extrabold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(227,175,53,0.5)] hover:shadow-[0_0_50px_rgba(227,175,53,0.9)] flex items-center justify-center gap-3 whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                <span>Attempt Test</span>
                <span className="text-lg">&rarr;</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TestModal
        isOpen={activeModal}
        onClose={() => setActiveModal(false)}
        title="Pre-Test Assessment"
        subtitle="DATA LINK LAYER DIAGNOSTIC"
        questions={PRE_TEST_QUESTIONS}
      />
    </>
  );
}
