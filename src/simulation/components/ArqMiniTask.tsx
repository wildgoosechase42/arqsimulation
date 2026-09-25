import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DataPacket } from './DataPacket';
import { VerificationStamps } from './VerificationStamps';
import { CssEarthWin } from './CssEarthWin';
import { CssEarthLoss } from './CssEarthLoss';

type TaskState = 'IDLE' | 'SENDING' | 'WAITING' | 'RETURNING' | 'VERIFYING' | 'TIMEOUT' | 'ERROR';
type EndState = 'NONE' | 'WIN' | 'LOSS';

export const ArqMiniTask: React.FC<{ progress: number, onProgressUpdate: (p: number) => void }> = ({ progress, onProgressUpdate }) => {
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
      if (Math.random() < 0.35) {
        setShowZap(true);
        setIsCorrupted(true);
        setTimeout(() => setShowZap(false), 300);
      }
    }, 1200);
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
    }, 1000);
    setTimeout(() => {
      if (state !== 'TIMEOUT') {
        clearInterval(timerRef.current!);
        setState('RETURNING');
      }
    }, 1500);
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
      setTimeout(() => setState('IDLE'), 1500);
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
    <div className="relative w-full max-w-3xl aspect-[1.6/1] bg-[#4a4a4a] border-4 border-black rounded-[2.5rem] shadow-[0_12px_0_0_rgba(0,0,0,0.4)] overflow-hidden flex flex-col p-1 group">
      <div className="absolute top-4 left-6 right-16 flex flex-col">
        <div className="flex justify-between mb-1">
          <span className="text-white font-black text-shadow-sm text-xs uppercase tracking-widest drop-shadow-[1px_1px_0_#000]">Total Task Progress</span>
        </div>
        <div className="h-6 bg-black border-4 border-black rounded-md overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#39fd37]"
          />
        </div>
      </div>
      <div className="mt-16 flex-1 flex flex-col px-4 pb-4">
        <div className="bg-[#1a1a1a] border-4 border-black rounded-2xl flex-1 flex relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a2a3a_0%,_#0a0a0c_100%)] opacity-50" />
          
          <div className="w-1/4 h-full border-r-4 border-black flex flex-col items-center justify-center p-4 z-10 bg-[#3b3b3b]/80">
            <div className="mb-4 bg-black border-2 border-black px-2 py-1 rounded">
              <span className="text-[#39fd37] font-mono text-[10px] font-bold">FRAME: {frameId}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={startTask}
                disabled={(state !== 'IDLE' && state !== 'TIMEOUT') || endState !== 'NONE'}
                className={`w-24 h-24 rounded-full border-4 border-black flex items-center justify-center transition-all ${
                  (state === 'IDLE' || state === 'TIMEOUT') && endState === 'NONE'
                  ? 'bg-red-500 shadow-[0_6px_0_0_#991b1b] active:translate-y-1 active:shadow-[0_2px_0_0_#991b1b]' 
                  : 'bg-gray-600 shadow-none translate-y-1 opacity-50'
                }`}
              >
                <span className="text-white font-black text-xs uppercase text-center leading-tight">Dispatch<br/>Link</span>
              </button>
              {(state === 'IDLE' || state === 'TIMEOUT') && endState === 'NONE' && (
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute -right-24 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                >
                  <motion.span 
                    animate={{ x: [-5, 0, -5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="material-symbols-outlined text-yellow-400 text-3xl drop-shadow-[1px_1px_0_#000]"
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
            {state === 'WAITING' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-black/80 border-4 border-black p-4 rounded-xl flex flex-col items-center">
                  <span className="text-white font-black text-sm uppercase mb-1">Timeout Timer</span>
                  <span className="text-red-500 font-black text-4xl italic animate-pulse">{countdown}</span>
                </div>
              </div>
            )}
          </div>
          <div className="w-1/4 h-full border-l-4 border-black flex flex-col items-center justify-center p-4 z-10 bg-[#3b3b3b]/80">
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border-4 border-black bg-blue-500 overflow-hidden relative shadow-inner"
              >
                <div className="absolute top-2 left-4 w-8 h-4 bg-green-500 rounded-full rotate-45" />
                <div className="absolute bottom-4 right-2 w-10 h-6 bg-green-500 rounded-full -rotate-12" />
                <div className="absolute top-10 left-2 w-6 h-10 bg-green-500 rounded-full" />
              </motion.div>
              <div className="absolute -top-4 -right-4">
                <span className={`material-symbols-outlined text-4xl ${state === 'WAITING' ? 'text-[#39fd37] animate-bounce' : 'text-gray-400'}`}>satellite_alt</span>
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
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-3 md:p-5 bg-black/85 backdrop-blur-md">
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
              </div>
            </motion.div>
          </div>
        )}
        {endState === 'LOSS' && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-3 md:p-5 bg-black/80 backdrop-blur-md">
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
