import React from 'react';
import { motion } from 'motion/react';

export const TaskCompleteOverlay: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-[#4a4a4a] border-8 border-black p-12 rounded-[3rem] shadow-[0_20px_0_0_rgba(0,0,0,0.5)] flex flex-col items-center max-w-md w-full"
    >
      <div className="w-32 h-32 bg-[#39fd37] border-8 border-black rounded-full flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-7xl text-white font-black">check</span>
      </div>
      
      <h1 className="text-white font-black text-5xl italic uppercase tracking-tighter text-center mb-4 drop-shadow-[4px_4px_0_#000]">Task Complete</h1>
      
      <button 
        onClick={onRestart}
        className="mt-6 px-8 py-4 bg-blue-500 border-4 border-black rounded-xl text-white font-black uppercase italic tracking-widest shadow-[0_8px_0_0_#1d4ed8] active:translate-y-1 active:shadow-none transition-all"
      >
        Repeat Mission
      </button>
    </motion.div>
  );
};
