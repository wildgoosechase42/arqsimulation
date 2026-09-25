import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DataPacket } from './DataPacket';
import { VerificationStamps } from './VerificationStamps';
import { CssEarthWin } from './CssEarthWin';
import { CssEarthLoss } from './CssEarthLoss';

type TaskState = 'IDLE' | 'SENDING' | 'WAITING' | 'RETURNING' | 'VERIFYING' | 'TIMEOUT' | 'ERROR';
type EndState = 'NONE' | 'WIN' | 'LOSS';

export const ArqTaskModal: React.FC<{ progress: number, onProgressUpdate: (p: number) => void, onClose: () => void }> = ({ progress, onProgressUpdate, onClose }) => {
  const [state, setState] = useState<TaskState>('IDLE');
  const [endState, setEndState] = useState<EndState>('NONE');
  const [successfulDeliveries, setSuccessfulDeliveries] = useState(0);
  const [frameId, setFrameId] = useState(0);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showZap, setShowZap] = useState(false);
  const [ackType, setAckType] = useState<'ACK' | 'NAK'>('ACK');
  const timerRef = useRef<number | null>(null);

  const startTask = () => {
    if ((state !== 'IDLE' && state !== 'TIMEOUT') || endState !== 'NONE') return;
    setState('SENDING');
    setIsCorrupted(false);
    setCountdown(3);
    
    setTimeout(() => {
      if (Math.random() < 0.4) {
        setShowZap(true);
        setIsCorrupted(true);
        setTimeout(() => setShowZap(false), 200);
      }
    }, 350);
  };

  const handleArrivalAtEarth = () => {
    setState('WAITING');
    setAckType(isCorrupted ? 'NAK' : 'ACK');
    
    timerRef.current = window.setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setState('TIMEOUT');
          return 0;
        }
        return prev - 1;
      });
    }, 800);
    setTimeout(() => {
      if (state !== 'TIMEOUT') {
        clearInterval(timerRef.current!);
        setState('RETURNING');
      }
    }, 600);
  };

  const handleReturnToShip = () => {
    setState('VERIFYING');
  };

  const handleVerification = (choice: 'ACK' | 'NAK') => {
    if (choice === 'ACK' && ackType === 'NAK') {
      setEndState('LOSS');
      return;
    }
    const correct = choice === ackType;
    if (correct && choice === 'ACK') {
      const nextCount = successfulDeliveries + 1;
      setSuccessfulDeliveries(nextCount);
      
      const newProgress = Math.min(100, Math.round(nextCount * 33.33));
      onProgressUpdate(newProgress);
      
      if (nextCount >= 3) {
        setEndState('WIN');
      } else {
        setFrameId(prev => prev + 1);
        setState('IDLE');
      }
    } else if (correct && choice === 'NAK') {
      setState('ERROR');
      setTimeout(() => setState('IDLE'), 800);
    } else {
      setState('TIMEOUT');
    }
  };

  const resetTask = () => {
    setEndState('NONE');
    setSuccessfulDeliveries(0);
    setFrameId(0);
    setState('IDLE');
    onProgressUpdate(0);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-8 backdrop-blur-md bg-black/40"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-3xl aspect-[1.6/1] bg-[#4a4a4a] border-8 border-black rounded-[2.5rem] shadow-[0_20px_0_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-1"
      >
        <div className="absolute top-4 left-6 right-20 flex flex-col z-10">
          <span className="text-white font-black text-xs uppercase tracking-widest drop-shadow-[1px_1px_0_#000] mb-1">TOTAL TASK PROGRESS</span>
          <div className="h-6 bg-black border-4 border-black rounded-md overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#39fd37]"
            />
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 bg-red-600 border-4 border-black flex items-center justify-center cursor-pointer active:scale-95 z-10 shadow-[0_4px_0_0_#000]"
        >
          <span className="text-white font-black text-2xl">X</span>
        </button>
        <div className="mt-20 flex-1 flex flex-col px-4 pb-4">
          <div className="bg-[#1a1a1a] border-4 border-black rounded-2xl flex-1 flex relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a2a3a_0%,_#0a0a0c_100%)] opacity-80" />
            
            <div className="w-1/4 h-full border-r-4 border-black flex flex-col items-center justify-center p-4 z-10 bg-[#3b3b3b]/60">
              <div className="mb-4 bg-black border-2 border-black px-3 py-1 rounded">
                <span className="text-[#39fd37] font-mono text-xs font-bold tracking-tighter">SN: {frameId}</span>
              </div>
              
              <div className="relative">
                <button 
                  onClick={startTask}
                  disabled={(state !== 'IDLE' && state !== 'TIMEOUT') || endState !== 'NONE'}
                  className={`w-24 h-24 rounded-full border-4 border-black flex items-center justify-center transition-all ${
                    (state === 'IDLE' || state === 'TIMEOUT') && endState === 'NONE'
                    ? 'bg-red-500 shadow-[0_8px_0_0_#991b1b] active:translate-y-2 active:shadow-none' 
                    : 'bg-gray-600 shadow-none translate-y-1 opacity-50'
                  }`}
                >
                  <span className="text-white font-black text-sm uppercase text-center leading-tight tracking-tighter">DISPATCH<br/>LINK</span>
                </button>
                {(state === 'IDLE' || state === 'TIMEOUT') && endState === 'NONE' && (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute -right-32 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                  >
                    <motion.span 
                      animate={{ x: [-10, 0, -10] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="material-symbols-outlined text-yellow-400 text-5xl drop-shadow-[2px_2px_0_#000]"
                    >
                      arrow_back
                    </motion.span>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex-1 relative">
              <AnimatePresence>
                {(state === 'SENDING' || state === 'RETURNING') && (
                  <DataPacket 
                    direction={state === 'SENDING' ? 'FORWARD' : 'BACKWARD'} 
                    isCorrupted={isCorrupted}
                    ackType={ackType}
                    onComplete={state === 'SENDING' ? handleArrivalAtEarth : handleReturnToShip}
                  />
                )}
              </AnimatePresence>
              {showZap && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 2 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <span className="material-symbols-outlined text-red-500 text-6xl animate-ping font-black">bolt</span>
                </motion.div>
              )}
              {state === 'WAITING' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-black/90 border-4 border-black p-4 rounded-xl flex flex-col items-center shadow-2xl">
                    <span className="text-white font-black text-xs uppercase mb-1 tracking-widest">TIMEOUT WINDOW</span>
                    <span className="text-red-500 font-black text-5xl italic animate-pulse">{countdown}s</span>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/4 h-full border-l-4 border-black flex flex-col items-center justify-center p-4 z-10 bg-[#3b3b3b]/60">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 rounded-full border-4 border-black bg-blue-500 overflow-hidden relative shadow-inner"
                >
                  <div className="absolute top-2 left-4 w-8 h-4 bg-green-500 rounded-full rotate-45" />
                  <div className="absolute bottom-4 right-2 w-10 h-6 bg-green-500 rounded-full -rotate-12" />
                  <div className="absolute top-10 left-2 w-6 h-10 bg-green-500 rounded-full" />
                </motion.div>
                <div className="absolute -top-4 -right-4">
                  <motion.span 
                    animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`material-symbols-outlined text-4xl ${state === 'WAITING' ? 'text-[#39fd37]' : 'text-gray-400'}`}
                  >
                    satellite_alt
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {state === 'VERIFYING' && endState === 'NONE' && (
            <VerificationStamps onChoice={handleVerification} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {endState === 'WIN' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[100] flex items-center justify-center p-3 md:p-5 bg-black/85 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#064e3b] bg-[radial-gradient(circle_at_center,_#047857_0%,_#022c22_100%)] border-8 border-black p-4 md:p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center max-w-lg w-full relative overflow-hidden space-y-3"
              >
                <div className="w-full h-32 md:h-36 rounded-xl border-4 border-black bg-black/80 overflow-hidden relative shadow-inner">
                  <CssEarthWin />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-2xl font-black">verified</span>
                  <h2 className="text-white font-black text-lg md:text-xl italic uppercase tracking-wide text-center drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                    TRANSMISSION SECURED // MISSION COMPLETE
                  </h2>
                </div>

                <div className="bg-black/50 border-l-4 border-emerald-400 rounded-r-lg px-3 py-2 w-full">
                  <p className="text-[11px] md:text-xs leading-relaxed text-emerald-100 text-center font-medium">
                    You saved the planet! Flawless telemetry maintained through deterministic ACKs and error-free Stop-and-Wait ARQ retransmission.
                  </p>
                </div>

                <div className="flex space-x-3 w-full pt-1">
                  <button 
                    onClick={resetTask}
                    className="flex-1 py-3 bg-white hover:bg-slate-100 border-4 border-black rounded-xl text-black font-black uppercase italic tracking-wider text-xs md:text-sm shadow-[0_4px_0_0_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 border-4 border-black rounded-xl text-white font-black uppercase italic tracking-wider text-xs md:text-sm shadow-[0_4px_0_0_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                  >
                    Return to Ship
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
          {endState === 'LOSS' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[100] flex items-center justify-center p-3 md:p-5 bg-black/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#7f1d1d] bg-[radial-gradient(circle_at_center,_#991b1b_0%,_#450a0a_100%)] border-8 border-black p-4 md:p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center max-w-lg w-full relative overflow-hidden space-y-3"
              >
                <div className="w-full h-32 md:h-36 rounded-xl border-4 border-black bg-black/80 overflow-hidden relative shadow-inner">
                  <CssEarthLoss />
                </div>

                <h2 className="text-white font-black text-lg md:text-xl italic uppercase tracking-wide text-center drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                  CRITICAL FAILURE // LINK COMPROMISED
                </h2>

                <div className="bg-black/50 border-l-4 border-red-500 rounded-r-lg px-3 py-2 w-full">
                  <p className="text-[11px] md:text-xs leading-relaxed text-gray-100 text-center font-medium">
                    You accepted corrupted telemetry (NAK). Without valid parity verification, error correction failed and the planet was lost.
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={resetTask}
                  className="bg-white hover:bg-gray-100 text-[#dc2626] border-4 border-black rounded-xl font-black uppercase italic tracking-widest px-8 py-2.5 text-xs md:text-sm shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  Retry Transmission
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
