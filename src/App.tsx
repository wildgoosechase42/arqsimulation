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

  const transitionTo = useCallback((targetStage: number) => {
    if (isTransitioning || targetStage === stage) return;
    setIsTransitioning(true);
    setStage(targetStage);
    animate(progress, targetStage, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setTimeout(() => setIsTransitioning(false), 200);
      }
    });
  }, [stage, isTransitioning, progress]);

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      if (scrollY <= 5) {
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
        if (stageRef.current === 1 && e.deltaY < -20) {
          if (e.cancelable) e.preventDefault();
          transitionTo(0);
          return;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= 5 && (stageRef.current === 0 || isTransitioningRef.current)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const scrollY = window.scrollY;
      
      if (scrollY <= 5) {
        if (Math.abs(deltaY) > 30) {
          if (deltaY > 0 && stageRef.current === 0) {
            transitionTo(1);
          } else if (deltaY < 0 && stageRef.current === 1) {
            transitionTo(0);
          }
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
