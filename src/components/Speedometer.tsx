import React, { useEffect, useState } from 'react';

interface SpeedometerProps {
  score: number;
  total: number;
  onRetake: () => void;
}

export function Speedometer({ score, total, onRetake }: SpeedometerProps) {
  const percentage = Math.round((score / total) * 100);
  const [animatedAngle, setAnimatedAngle] = useState(-180);

  useEffect(() => {
    const timer = setTimeout(() => {
      const targetAngle = -180 + (percentage / 100) * 180;
      setAnimatedAngle(targetAngle);
    }, 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getVerdict = (pct: number) => {
    if (pct === 100) return { title: 'PERFECT // PROTOCOL EXPERT', color: 'text-primary' };
    if (pct >= 80) return { title: 'PASSED // EXCELLENT MASTERY', color: 'text-emerald-400' };
    if (pct >= 60) return { title: 'PASSED // CORE CONCEPTS VERIFIED', color: 'text-yellow-400' };
    if (pct >= 40) return { title: 'MARGINAL // REVIEW FLOW DIAGRAMS', color: 'text-amber-500' };
    return { title: 'FAILED // RETAKE RECOMMENDED', color: 'text-red-400' };
  };

  const verdict = getVerdict(percentage);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-72 h-44 flex items-center justify-center">
        <svg viewBox="0 0 300 170" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#e3af35" />
            </linearGradient>
            <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#e3af35" />
            </filter>
          </defs>

          <path
            d="M 30 150 A 120 120 0 0 1 270 150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          <path
            d="M 30 150 A 120 120 0 0 1 270 150"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * (percentage / 100))}
            style={{
              transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />

          <line x1="30" y1="150" x2="42" y2="150" stroke="#ef4444" strokeWidth="2" />
          <line x1="150" y1="30" x2="150" y2="42" stroke="#eab308" strokeWidth="2" />
          <line x1="270" y1="150" x2="258" y2="150" stroke="#e3af35" strokeWidth="2" />

          <text x="25" y="168" fill="#a1a1aa" fontSize="10" fontFamily="monospace">0%</text>
          <text x="142" y="24" fill="#a1a1aa" fontSize="10" fontFamily="monospace">50%</text>
          <text x="260" y="168" fill="#a1a1aa" fontSize="10" fontFamily="monospace">100%</text>

          <g
            style={{
              transformOrigin: '150px 150px',
              transform: `rotate(${animatedAngle}deg)`,
              transition: 'transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <line
              x1="150"
              y1="150"
              x2="245"
              y2="150"
              stroke="#e3af35"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#needleGlow)"
            />
            <circle cx="150" cy="150" r="10" fill="#17171b" stroke="#e3af35" strokeWidth="3" />
            <circle cx="150" cy="150" r="4" fill="#e3af35" />
          </g>
        </svg>
      </div>

      <div className="mt-2 space-y-1">
        <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-foreground">
          {percentage}%
        </div>
        <div className="font-mono text-sm text-primary font-bold">
          {score} / {total} Correct
        </div>
        <div className={`font-mono text-xs tracking-wider uppercase font-semibold mt-2 ${verdict.color}`}>
          {verdict.title}
        </div>
      </div>

      <div className="mt-8 flex gap-4 w-full justify-center">
        <button
          onClick={onRetake}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          Retake Test
        </button>
      </div>
    </div>
  );
}
