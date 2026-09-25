import React from 'react';
import { motion } from 'motion/react';

interface Props {
  x: number;
  y: number;
  isOpen: boolean;
  isNear: boolean;
}

export const VentHatch: React.FC<Props> = ({ x, y, isOpen, isNear }) => {
  return (
    <div 
      className="absolute z-0"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
        <span className="text-white font-black text-xl uppercase italic drop-shadow-[2px_2px_0_#000]">EXIT</span>
      </div>
      <div className="relative w-28 h-20 bg-[#1e272e] border-4 border-black rounded-sm overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-around py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1 w-full bg-black/40" />
          ))}
        </div>
        
        <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-500 border border-black rounded-full" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 border border-black rounded-full" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-yellow-500 border border-black rounded-full" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-yellow-500 border border-black rounded-full" />
        <motion.div 
          animate={{ x: isOpen ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 bg-[#3d3d3d] border-4 border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] z-10"
        >
          <div className="absolute inset-2 border-2 border-black/20 flex flex-col justify-center space-y-2">
             <div className="h-1 w-full bg-black/10" />
             <div className="h-1 w-full bg-black/10" />
          </div>
        </motion.div>
      </div>
      {isNear && !isOpen && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap z-30">
          <div className="bg-black/90 text-[#38bdf8] px-3 py-1 rounded border-2 border-white text-xs font-black animate-bounce shadow-xl">
            [V] VENT / EXIT
          </div>
        </div>
      )}
      <div className="absolute -inset-4 bg-yellow-500/10 blur-xl animate-pulse" />
    </div>
  );
};
