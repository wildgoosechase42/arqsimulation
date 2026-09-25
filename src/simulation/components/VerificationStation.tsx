import React from 'react';
import { motion } from 'motion/react';

interface Props {
  onChoice: (choice: 'ACK' | 'NAK') => void;
}

export const VerificationStamps: React.FC<Props> = ({ onChoice }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-x-0 bottom-10 z-40 flex justify-center space-x-12 px-12"
    >
      <div className="bg-[#3b3b3b] border-4 border-black p-6 rounded-[2rem] flex space-x-8 shadow-[0_8px_0_0_#000]">
        <button
          onClick={() => onChoice('ACK')}
          className="group relative flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-[#39fd37] border-4 border-black rounded-2xl flex items-center justify-center shadow-[0_6px_0_0_#166534] active:translate-y-1 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-white text-4xl font-black">thumb_up</span>
          </div>
          <span className="mt-2 text-white font-black text-[10px] uppercase tracking-tighter">Approve / ACK</span>
        </button>
        <button
          onClick={() => onChoice('NAK')}
          className="group relative flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-red-500 border-4 border-black rounded-2xl flex items-center justify-center shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-none transition-all">
            <span className="material-symbols-outlined text-white text-4xl font-black">thumb_down</span>
          </div>
          <span className="mt-2 text-white font-black text-[10px] uppercase tracking-tighter">Reject / Corrupt</span>
        </button>
      </div>
    </motion.div>
  );
};
