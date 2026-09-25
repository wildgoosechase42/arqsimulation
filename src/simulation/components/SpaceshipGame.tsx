import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crewmate } from './Crewmate';
import { GameHUD } from './GameHUD';
import { ConsoleTerminal } from './ConsoleTerminal';
import { ArqTaskModal } from './ArqTaskModal';
import { MissionBriefing } from './MissionBriefing';
import { VentHatch } from './VentHatch';
import { 
  PLAYER_SPEED, 
  FRICTION, 
  INTERACTION_DISTANCE, 
  ROOM_WIDTH, 
  ROOM_HEIGHT, 
  CONSOLE_POS, 
  VENT_POS,
  WALL_BOUNDARIES 
} from '../constants';

export const SpaceshipGame: React.FC<{ onExitToSite: () => void }> = ({ onExitToSite }) => {
  const [pos, setPos] = useState({ x: ROOM_WIDTH / 2, y: ROOM_HEIGHT / 2 + 150 });
  const [vel, setVel] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState(false);
  const [isNearConsole, setIsNearConsole] = useState(false);
  const [isNearVent, setIsNearVent] = useState(false);
  const [activeView, setActiveView] = useState<'NONE' | 'BRIEFING' | 'TASK'>('NONE');
  const [taskProgress, setTaskProgress] = useState(0);
  const [isVenting, setIsVenting] = useState(false);
  const keys = useRef<{ [key: string]: boolean }>({});
  const requestRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const triggerVent = () => {
    if (isNearVent && !isVenting && activeView === 'NONE') {
      setIsVenting(true);
      setTimeout(onExitToSite, 800);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keys.current[key] = true;
      if (key === 'e' && isNearConsole && activeView === 'NONE') setActiveView('BRIEFING');
      if (key === 'v' && isNearVent && activeView === 'NONE') triggerVent();
      if (e.key === 'Escape') setActiveView('NONE');
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isNearConsole, isNearVent, activeView, isVenting]);

  const update = () => {
    if (activeView !== 'NONE' || isVenting) {
      requestRef.current = requestAnimationFrame(update);
      return;
    }
    let moveX = 0;
    let moveY = 0;
    if (keys.current['w'] || keys.current['arrowup']) moveY -= 1;
    if (keys.current['s'] || keys.current['arrowdown']) moveY += 1;
    if (keys.current['a'] || keys.current['arrowleft']) moveX -= 1;
    if (keys.current['d'] || keys.current['arrowright']) moveX += 1;
    if (moveX !== 0 && moveY !== 0) {
      const norm = 1 / Math.SQRT2;
      moveX *= norm;
      moveY *= norm;
    }
    const ax = moveX * PLAYER_SPEED;
    const ay = moveY * PLAYER_SPEED;
    setVel(v => {
      let nx = (v.x + ax) * FRICTION;
      let ny = (v.y + ay) * FRICTION;
      if (Math.abs(nx) < 0.1) nx = 0;
      if (Math.abs(ny) < 0.1) ny = 0;
      return { x: nx, y: ny };
    });
    setPos(p => {
      let nextX = p.x + vel.x;
      let nextY = p.y + vel.y;
      const playerRadius = 25;
      for (const b of WALL_BOUNDARIES) {
        if (nextX + playerRadius > b.x && nextX - playerRadius < b.x + b.w && nextY + playerRadius > b.y && nextY - playerRadius < b.y + b.h) {
          const hitX = p.x + playerRadius > b.x && p.x - playerRadius < b.x + b.w;
          const hitY = p.y + playerRadius > b.y && p.y - playerRadius < b.y + b.h;
          if (!hitX) nextX = p.x;
          if (!hitY) nextY = p.y;
        }
      }
      if (moveX > 0) setFacing('right');
      else if (moveX < 0) setFacing('left');
      setIsWalking(Math.abs(vel.x) > 0.5 || Math.abs(vel.y) > 0.5);
      const distConsole = Math.sqrt(Math.pow(nextX - CONSOLE_POS.x, 2) + Math.pow(nextY - CONSOLE_POS.y, 2));
      setIsNearConsole(distConsole < INTERACTION_DISTANCE);
      const distVent = Math.sqrt(Math.pow(nextX - VENT_POS.x, 2) + Math.pow(nextY - VENT_POS.y, 2));
      setIsNearVent(distVent < 50);
      return { x: nextX, y: nextY };
    });
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [vel, activeView, isVenting]);

  return (
    <div className="h-full w-full relative bg-black flex items-center justify-center overflow-hidden cursor-default">
      <div 
        ref={viewportRef}
        className="relative w-full h-full overflow-hidden flex items-center justify-center bg-[#151a21]"
      >
        <div 
          className="absolute transition-transform duration-75 ease-out"
          style={{ 
            width: ROOM_WIDTH, 
            height: ROOM_HEIGHT,
            transform: `translate(${-pos.x + (viewportRef.current?.clientWidth || 0) / 2}px, ${-pos.y + (viewportRef.current?.clientHeight || 0) / 2}px)`
          }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 border-4 border-[#2c3e50]/30 pointer-events-none">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-[#2c3e50]/10" />
            ))}
          </div>
          <div className="absolute top-[300px] left-[100px] w-40 h-10 bg-cyan-900/20 border border-cyan-500/30 blur-sm animate-pulse" />
          <div className="absolute top-[300px] right-[100px] w-40 h-10 bg-cyan-900/20 border border-cyan-500/30 blur-sm animate-pulse" />
          {WALL_BOUNDARIES.map((b, i) => (
            <div key={i} className="absolute bg-[#2c3e50] border-4 border-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]" style={{ left: b.x, top: b.y, width: b.w, height: b.h }}>
              <div className="absolute inset-2 border border-white/5" />
            </div>
          ))}
          <VentHatch x={VENT_POS.x} y={VENT_POS.y} isOpen={isVenting} isNear={isNearVent} />
          <ConsoleTerminal x={CONSOLE_POS.x} y={CONSOLE_POS.y} isHighlighted={isNearConsole} />
          <Crewmate x={pos.x} y={pos.y} facing={facing} isWalking={isWalking} isVenting={isVenting} />
        </div>
      </div>
      <GameHUD isNearConsole={isNearConsole} isNearVent={isNearVent} onUse={() => setActiveView('BRIEFING')} onVent={triggerVent} taskProgress={taskProgress} />
      <AnimatePresence>
        {activeView === 'BRIEFING' && <MissionBriefing onInitialize={() => setActiveView('TASK')} onClose={() => setActiveView('NONE')} />}
        {activeView === 'TASK' && (
          <ArqTaskModal 
            progress={taskProgress} 
            onProgressUpdate={(p) => {
              setTaskProgress(p);
            }}
            onClose={() => setActiveView('NONE')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
