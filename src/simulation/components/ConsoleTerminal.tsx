import React from 'react';

interface Props {
  x: number;
  y: number;
  isHighlighted: boolean;
}

export const ConsoleTerminal: React.FC<Props> = ({ x, y, isHighlighted }) => {
  return (
    <div 
      className="absolute z-10"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="absolute -inset-x-20 -inset-y-4 border-y-8 border-yellow-500/20 bg-yellow-500/5 rotate-[-2deg]" />
      <div className="absolute -inset-x-20 -bottom-8 h-4 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] opacity-60" />
      <div className={`relative w-32 h-20 bg-[#34495e] border-4 border-black rounded-lg shadow-xl transition-all duration-300 ${isHighlighted ? 'scale-110' : ''}`}>
        <div className="absolute top-2 left-2 right-2 bottom-4 bg-[#2c3e50] border-2 border-black rounded-md flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-[#0a0a0c] flex flex-col p-1 space-y-1">
            <div className="h-1 w-full bg-cyan-500/50 animate-pulse" />
            <div className="h-4 w-full flex items-center justify-center">
              <span className="material-symbols-outlined text-cyan-400 text-sm animate-bounce">satellite_alt</span>
            </div>
            <div className="h-1 w-full bg-cyan-500/20" />
          </div>
        </div>
        <div className="absolute bottom-1 inset-x-2 flex justify-around">
          <div className="w-2 h-2 bg-red-500 rounded-full border border-black" />
          <div className="w-2 h-2 bg-green-500 rounded-full border border-black" />
          <div className="w-2 h-2 bg-blue-500 rounded-full border border-black" />
        </div>
        {isHighlighted && (
          <div className="absolute -inset-4 border-4 border-cyan-400 rounded-2xl animate-pulse blur-sm" />
        )}
      </div>
      {isHighlighted && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/80 text-white px-3 py-1 rounded border-2 border-white text-xs font-black animate-bounce">
            [E] USE CONSOLE
          </div>
        </div>
      )}
    </div>
  );
};
