import React from 'react';
import { motion } from 'motion/react';

interface Props {
  direction: 'FORWARD' | 'BACKWARD';
  isCorrupted: boolean;
  ackType: 'ACK' | 'NAK';
  onComplete: () => void;
}

export const DataPacket: React.FC<Props> = ({ direction, isCorrupted, ackType, onComplete }) => {
  const isForward = direction === 'FORWARD';
  
  return (
    <motion.div
      initial={{ x: isForward ? '0%' : '100%', left: isForward ? '0%' : 'auto', right: isForward ? 'auto' : '0%' }}
      animate={{ x: isForward ? '100%' : '-100%' }}
      transition={{ duration: 0.75, ease: 'linear' }}
      onAnimationComplete={onComplete}
      className="absolute top-1/2 -translate-y-1/2 z-20"
    >
      <div className={`relative p-2 rounded border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] ${
        isForward 
          ? (isCorrupted ? 'bg-red-500 scale-110' : 'bg-cyan-400') 
          : (ackType === 'ACK' ? 'bg-[#39fd37]' : 'bg-red-600')
      }`}>
        <div className="w-10 h-10 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-white text-3xl font-black">
            {isForward ? 'save' : (ackType === 'ACK' ? 'check_circle' : 'error')}
          </span>
          <span className="text-[8px] font-black text-black leading-none mt-1">
            {isForward ? (isCorrupted ? 'GLITCH' : 'DATA') : ackType}
          </span>
        </div>
        
        {isCorrupted && isForward && (
          <motion.div 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="absolute inset-0 bg-red-500/30 mix-blend-overlay"
          />
        )}
      </div>
    </motion.div>
  );
};
