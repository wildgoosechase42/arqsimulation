import React, { useState } from 'react';
import { TestModal, Question } from './TestModal';
import { ScrollReveal } from './ScrollReveal';

export const POST_TEST_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the minimum bit width required for sequence numbers in Stop-and-Wait ARQ?",
    options: [
      "1 bit (allowing sequence values 0 and 1)",
      "2 bits (allowing sequence values 0, 1, 2, 3)",
      "4 bits (allowing sequence values 0 to 15)",
      "8 bits (allowing byte-level sequence numbering)"
    ],
    correctIndex: 0,
    explanation: "Stop-and-Wait ARQ only has at most 1 outstanding frame at any moment. A 1-bit sequence number (modulo-2 arithmetic, values 0 and 1) is mathematically sufficient to distinguish a new frame from a retransmitted duplicate."
  },
  {
    id: 2,
    question: "How does the receiver handle a received frame that contains the same sequence number as the previous valid frame?",
    options: [
      "It terminates the connection and returns an unrecoverable protocol error",
      "It discards the duplicate data payload and retransmits the ACK for that sequence number",
      "It accepts both copies and passes duplicate records to the Network Layer",
      "It silently drops the frame without generating any response"
    ],
    correctIndex: 1,
    explanation: "When an ACK is lost or delayed, the sender retransmits. The receiver detects that the incoming sequence number matches the previous one, discards the duplicate payload to avoid corrupting upper-layer data, and resends the ACK so the sender can advance."
  },
  {
    id: 3,
    question: "How should the sender's retransmission timeout interval ideally be set relative to Round Trip Time (RTT)?",
    options: [
      "Strictly less than one-way propagation delay (Timeout < T_p)",
      "Greater than the Round Trip Time plus processing delay (Timeout > 2 * T_p + Processing)",
      "Equal to exactly half of transmission time (Timeout = T_t / 2)",
      "Zero (retransmit instantaneously on every clock cycle)"
    ],
    correctIndex: 1,
    explanation: "The timeout must be safely greater than the full Round Trip Time (RTT = 2 * T_p + T_t + T_ack + T_proc). Setting it shorter would cause premature timeouts and redundant retransmissions."
  },
  {
    id: 4,
    question: "What happens when an ACK packet transmitted by the receiver is lost in transit?",
    options: [
      "Sender timer expires, sender retransmits the frame, receiver detects duplicate, drops payload, and resends ACK",
      "The connection deadlocks permanently because the receiver is prohibited from sending further ACKs",
      "The sender automatically assumes successful reception after 100 milliseconds",
      "The receiver detects missing ACK and re-requests the sender to restart session"
    ],
    correctIndex: 0,
    explanation: "When ACK is lost, the sender timer expires and retransmits the same frame. The receiver notices the duplicate sequence number, discards the duplicate payload, and transmits ACK again, recovering the protocol state."
  },
  {
    id: 5,
    question: "Given a = T_p / T_t (ratio of propagation time to transmission time), what is the channel utilization (efficiency) formula for Stop-and-Wait ARQ?",
    options: [
      "η = 1 / (1 + 2a)",
      "η = 2a / (1 + a)",
      "η = (1 + 2a) / 1",
      "η = a / (2 + a)"
    ],
    correctIndex: 0,
    explanation: "Total cycle time is T_t + 2 * T_p. Useful transmission time is T_t. Hence efficiency η = T_t / (T_t + 2 * T_p) = 1 / (1 + 2 * (T_p / T_t)) = 1 / (1 + 2a)."
  }
];

export function PostTestSection() {
  const [activeModal, setActiveModal] = useState<boolean>(false);

  return (
    <>
      <section id="posttest" className="relative z-20 bg-background text-foreground py-20 px-6 md:px-12 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary">
              Post test
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
        title="Post-Test Assessment"
        subtitle="ARQ PROTOCOL MECHANICS"
        questions={POST_TEST_QUESTIONS}
      />
    </>
  );
}
