import React, { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { animate, useMotionValue } from 'motion/react';
import { Scene } from './components/Scene';
import { Hero } from './components/Hero';
import { PostProcessing } from './components/PostProcessing';
import { Navbar } from './components/Navbar';
import { TheorySection } from './components/TheorySection';
import { PreTestSection } from './components/PreTestSection';
import { SimulationSection } from './components/SimulationSection';
import { PostTestSection } from './components/PostTestSection';
import { AIUseCaseSection } from './components/AIUseCaseSection';
import { Conclusion, ConclusionSection } from './components/Conclusion';

export default function App() {
  const [stage, setStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progress = useMotionValue(0);
  const touchStartY = useRef<number | null>(null);


  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const stageRef = useRef(stage);
  stageRef.current = stage;
  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;

  const transitionTo = useCallback((targetStage: number) => {
    if (isTransitioningRef.current || targetStage === stageRef.current) return;
    if (targetStage === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
    setIsTransitioning(true);
    setStage(targetStage);
    animate(progress, targetStage, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setTimeout(() => setIsTransitioning(false), 200);
      }
    });
  }, [progress]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      if (stageRef.current === 0) {
        if (e.cancelable) e.preventDefault();
        if (e.deltaY > 20) {
          transitionTo(1);
        }
        return;
      }
      if (isTransitioningRef.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (stageRef.current === 1 && scrollY <= 5 && e.deltaY < -20) {
        if (e.cancelable) e.preventDefault();
        transitionTo(0);
        return;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stageRef.current === 0 || isTransitioningRef.current) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const scrollY = window.scrollY;
      
      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0 && stageRef.current === 0) {
          transitionTo(1);
        } else if (deltaY < 0 && stageRef.current === 1 && scrollY <= 5) {
          transitionTo(0);
        }
      }
      touchStartY.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        (activeEl instanceof HTMLElement && (
          activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.isContentEditable
        )) ||
        (e.target instanceof HTMLElement && (
          e.target.tagName === 'INPUT' ||
          e.target.tagName === 'TEXTAREA' ||
          e.target.tagName === 'SELECT' ||
          e.target.isContentEditable
        ))
      ) {
        return;
      }

      const isDownKey =
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        (e.key === ' ' && !e.shiftKey && !(e.target instanceof HTMLButtonElement));

      const isUpKey =
        e.key === 'ArrowUp' ||
        e.key === 'PageUp' ||
        (e.key === ' ' && e.shiftKey && !(e.target instanceof HTMLButtonElement));

      if (isTransitioningRef.current) {
        if (isDownKey || isUpKey) {
          if (e.cancelable) e.preventDefault();
        }
        return;
      }

      const scrollY = window.scrollY;

      if (stageRef.current === 0) {
        if (isDownKey) {
          if (e.cancelable) e.preventDefault();
          transitionTo(1);
          return;
        }
        if (isUpKey && scrollY <= 5) {
          if (e.cancelable) e.preventDefault();
          return;
        }
      }

      if (stageRef.current === 1 && scrollY <= 5) {
        if (isUpKey) {
          if (e.cancelable) e.preventDefault();
          transitionTo(0);
          return;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [transitionTo]);

  return (
    <div className="relative w-full min-h-screen bg-[#020205] selection:bg-primary/30">
      <style>{`
        .text-glow-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.65);
        }
        .vignette-text-box {
          background: radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 80%);
        }
      `}</style>
      <Navbar visible={stage > 0} onScrollToTop={() => transitionTo(0)} />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Canvas
            shadows
            gl={{ 
              antialias: true, 
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0
            }}
          >
            <Suspense fallback={null}>
              <Scene progress={progress} />
              <PostProcessing />
            </Suspense>
          </Canvas>
        </div>
        <Hero stage={stage} progress={progress} onBack={() => transitionTo(0)} />
        
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 pointer-events-none"
             style={{ opacity: stage === 0 ? 0.75 : 0 }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary/80 opacity-90 text-glow-shadow font-semibold">
            Scroll to initialize protocol
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 animate-pulse" />
        </div>
      </div>
      <TheorySection />
      <PreTestSection />
      <SimulationSection />
      <PostTestSection />
      <AIUseCaseSection />
      <Conclusion onReturnToTop={() => transitionTo(0)} />
    </div>
  );
}
