import React from 'react';
import { motion } from 'motion/react';

interface Props {
  x: number;
  y: number;
  facing: 'left' | 'right';
  isWalking: boolean;
  isVenting?: boolean;
}

export const Crewmate: React.FC<Props> = ({ x, y, facing, isWalking, isVenting = false }) => {
  return (
    <div 
      className="absolute z-20 pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div 
        animate={{ 
          y: isVenting ? 40 : (isWalking ? [0, -8, 0] : 0),
          rotate: isVenting ? 20 : (isWalking ? [0, 2, -2, 0] : 0),
          scale: isVenting ? 0.2 : 1,
          opacity: isVenting ? 0 : 1
        }}
        transition={{ 
          duration: isVenting ? 0.8 : 0.4, 
          repeat: isVenting ? 0 : Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
        style={{ transform: `scaleX(${facing === 'left' ? -1 : 1})` }}
      >
        <div className="absolute -left-6 top-6 w-8 h-14 bg-red-700 border-4 border-black rounded-lg" />
        <div className="w-16 h-20 bg-red-600 border-4 border-black rounded-t-[3rem] rounded-b-[1.5rem] relative">
          <div className="absolute top-4 left-6 w-12 h-8 bg-cyan-200 border-4 border-black rounded-full overflow-hidden shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.1)]">
            <div className="absolute top-1 left-2 w-6 h-2 bg-white rounded-full opacity-60" />
          </div>
        </div>
        <div className="flex justify-around px-2 -mt-1">
          <motion.div 
            animate={{ y: isWalking ? [0, 4, 0] : 0 }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0 }}
            className="w-6 h-6 bg-red-600 border-4 border-black rounded-b-lg" 
          />
          <motion.div 
            animate={{ y: isWalking ? [0, 4, 0] : 0 }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
            className="w-6 h-6 bg-red-600 border-4 border-black rounded-b-lg" 
          />
        </div>
      </motion.div>
    </div>
  );
};
