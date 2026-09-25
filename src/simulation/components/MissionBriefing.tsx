import React from 'react';
import { motion } from 'motion/react';
import { EarthPreview } from './EarthPreview';

interface Props {
  onInitialize: () => void;
  onClose: () => void;
}

export const MissionBriefing: React.FC<Props> = ({ onInitialize, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[60] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/70 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 25 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-[#1a1a1a] border-8 border-black rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(255,0,0,0.25)] overflow-hidden flex flex-col my-auto"
      >
        <div className="bg-red-600 border-b-8 border-black py-3.5 px-6 md:px-8 animate-pulse shadow-inner">
          <h1 className="text-white font-black text-xl md:text-2xl uppercase italic tracking-[0.2em] text-center drop-shadow-[2px_2px_0_#000]">
            EMERGENCY BROADCAST // PRIORITY ALPHA
          </h1>
        </div>

        <div className="p-6 md:p-8 flex flex-col items-center gap-6">
          <div className="w-full h-56 sm:h-64 md:h-72 bg-[#050811] rounded-2xl border-4 border-black overflow-hidden shadow-2xl relative">
            <EarthPreview />
          </div>

          <div className="w-full bg-black/50 border-l-8 border-red-600 p-5 rounded-r-2xl shadow-inner">
            <p className="text-white font-bold text-base md:text-lg leading-relaxed italic tracking-tight">
              "WARNING: A critical climate crisis is unfolding on Earth, and you are humanity's last hope. 
              Apply the protocol concepts you just mastered to guarantee zero data loss. 
              Remember: <span className="text-[#39fd37]">ACK</span> signifies a valid frame, 
              while <span className="text-red-500">NAK</span> indicates corruption."
            </p>
          </div>

          <div className="flex gap-4 w-full">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 border-4 border-black rounded-2xl text-white font-black uppercase italic tracking-widest shadow-[0_6px_0_0_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Abort
            </button>
            <button 
              type="button"
              onClick={onInitialize}
              className="flex-[2] py-4 bg-[#39fd37] hover:brightness-110 border-4 border-black rounded-2xl text-black font-black uppercase italic tracking-widest shadow-[0_8px_0_0_#166534] active:translate-y-2 active:shadow-none transition-all cursor-pointer text-center"
            >
              Initialize Protocol Link
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
