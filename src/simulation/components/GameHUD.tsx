import React from 'react';
import { motion } from 'motion/react';

interface Props {
  isNearConsole: boolean;
  isNearVent: boolean;
  onUse: () => void;
  onVent: () => void;
  taskProgress: number;
}

export const GameHUD: React.FC<Props> = ({ isNearConsole, isNearVent, onUse, onVent, taskProgress }) => {
  return (
    <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-40">
      <div className="flex flex-col">
        <div className="bg-black/80 border-4 border-black p-4 rounded-2xl w-fit backdrop-blur-sm shadow-2xl">
          <h2 className="text-white font-black text-xl uppercase italic tracking-tighter drop-shadow-[2px_2px_0_#000]">MIRA HQ // COMMS</h2>
          <div className="flex items-center space-x-3 mt-2">
            <div className={`w-4 h-4 rounded-full border-2 border-black ${taskProgress === 100 ? 'bg-[#39fd37]' : 'bg-yellow-500 animate-pulse'}`} />
            <span className="text-white text-xs font-black uppercase tracking-widest text-shadow-sm">Protocol: ARQ Telemetry ({taskProgress}%)</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end p-4 space-x-6">
        <button
          onClick={onVent}
          disabled={!isNearVent}
          className={`pointer-events-auto cursor-pointer w-24 h-24 rounded-full border-8 border-black flex flex-col items-center justify-center transition-all shadow-[0_10px_0_0_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-none ${
            isNearVent ? 'bg-blue-500 opacity-100 scale-110' : 'bg-gray-700 opacity-20 scale-100 grayscale'
          }`}
        >
          <span className="material-symbols-outlined text-4xl text-black font-black">logout</span>
          <span className="text-black font-black text-[10px] uppercase -mt-1 tracking-tighter">VENT / EXIT [V]</span>
        </button>
        <button
          onClick={onUse}
          disabled={!isNearConsole}
          className={`pointer-events-auto cursor-pointer w-28 h-28 rounded-full border-8 border-black flex flex-col items-center justify-center transition-all shadow-[0_12px_0_0_rgba(0,0,0,0.5)] active:translate-y-2 active:shadow-none ${
            isNearConsole ? 'bg-yellow-500 opacity-100 scale-110' : 'bg-gray-700 opacity-20 scale-100 grayscale'
          }`}
        >
          <span className="material-symbols-outlined text-5xl text-black font-black">pan_tool_alt</span>
          <span className="text-black font-black text-xs uppercase -mt-1 tracking-widest">USE [E]</span>
        </button>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
};
