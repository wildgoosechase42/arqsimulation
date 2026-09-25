import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpaceshipGame } from './components/SpaceshipGame';
import { Lobby } from './components/Lobby';
import { SITE_LANDING_URL } from './constants';

interface SimulationGameProps {
  onExit?: () => void;
}

export default function SimulationGame({ onExit }: SimulationGameProps) {
  const [view, setView] = useState<'lobby' | 'game' | 'website'>('lobby');

  const handleExitToSite = () => {
    if (onExit) {
      onExit();
      return;
    }
    setView('website');
    setTimeout(() => {
      try {
        window.location.href = SITE_LANDING_URL;
      } catch (e) {
        console.warn("Navigation blocked or invalid URL", e);
      }
    }, 1000);
  };

  return (
    <div className="h-full w-full bg-[#0a0a0c] overflow-hidden font-sans select-none cursor-default">
      <AnimatePresence mode="wait">
        {view === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full w-full"
          >
            <Lobby onStart={() => setView('game')} />
          </motion.div>
        )}
        {view === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <SpaceshipGame onExitToSite={handleExitToSite} />
          </motion.div>
        )}
        {view === 'website' && (
          <motion.div
            key="website"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            className="h-full w-full bg-slate-900 flex items-center justify-center p-12"
          >
            <div id="antigravity-main-website" className="text-center">
              <h1 className="text-white font-black text-6xl uppercase italic mb-4">Antigravity</h1>
              <p className="text-cyan-400 font-mono tracking-widest animate-pulse">Establishing Secure Connection to Main Site...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
