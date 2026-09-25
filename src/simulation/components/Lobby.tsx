import React from 'react';
import { motion } from 'motion/react';

export const Lobby: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0c] cursor-default">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a2a3a_0%,_#000_100%)] opacity-60" />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: Math.random() * 0.5 + 0.5, opacity: Math.random() * 0.5 + 0.2 }}
            animate={{ x: [null, (Math.random() - 0.5) * 200 + 'px'], y: [null, (Math.random() - 0.5) * 200 + 'px'] }}
            transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="z-10 flex flex-col items-center px-6">
        <h2 className="text-red-600 font-black text-4xl md:text-5xl uppercase italic tracking-[0.15em] drop-shadow-[6px_6px_0_#000] text-center mb-6">WARNING: PRIORITY ALERT</h2>
        <p className="text-white font-bold text-xl md:text-2xl text-center max-w-[680px] leading-relaxed drop-shadow-lg mb-12">
          A critical climate crisis is unfolding on Earth right now, and you are the only one who can save humanity. 
          Ensure you apply the protocol concepts you just learned. 
          Remember: <span className="text-[#39fd37]">ACK</span> = Good, <span className="text-red-500">NAK</span> = Corrupted.
        </p>
        <button
          onClick={onStart}
          className="cursor-pointer group relative px-12 py-6 bg-red-600 border-8 border-black rounded-[2rem] shadow-[0_12px_0_0_#000] active:translate-y-2 active:shadow-none transition-all"
        >
          <span className="text-white font-black text-4xl uppercase italic tracking-widest">Start Mission</span>
          <div className="absolute -top-12 -right-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-red-500 text-6xl animate-bounce">warning</span>
          </div>
        </button>
        <p className="mt-12 text-white/40 font-mono text-sm tracking-widest uppercase animate-pulse text-center">Status: Awaiting Protocol Initialization</p>
      </motion.div>
      <div className="absolute bottom-8 text-white/20 font-mono text-[10px]">v2.0.4-STABLE // SYSTEM_ID: SKELD_COMMS</div>
    </div>
  );
};
