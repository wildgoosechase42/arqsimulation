import React, { useEffect, useState } from 'react';

interface NavbarProps {
  visible?: boolean;
  onScrollToTop?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  isTop?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'Top', isTop: true },
  { id: 'aim', label: 'Aim' },
  { id: 'theory', label: 'Theory' },
  { id: 'pretest', label: 'Pre-Test' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'posttest', label: 'Post-Test' },
  { id: 'usecase', label: 'AI Use Case' },
  { id: 'conclusion', label: 'Conclusion' }
];

export function Navbar({ visible = true, onScrollToTop }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [scrolledPastHero, setScrolledPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.75;
      setScrolledPastHero(scrollY > heroHeight);

      if (scrollY < heroHeight) {
        setActiveSection('top');
        return;
      }

      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const isAtBottom = window.innerHeight + scrollY >= documentHeight - 150;
      if (isAtBottom) {
        setActiveSection('conclusion');
        return;
      }

      const conclusionEl = document.getElementById('conclusion');
      if (conclusionEl) {
        const rect = conclusionEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.65) {
          setActiveSection('conclusion');
          return;
        }
      }

      const sectionIds = ['aim', 'theory', 'pretest', 'simulation', 'posttest', 'usecase', 'conclusion'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onScrollToTop) {
        onScrollToTop();
      }
      return;
    }
    const el = document.getElementById(id) || document.getElementById(id.replace('-', '')) || document.getElementById(id.replace('test', '-test'));
    if (el) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const isRevealed = scrolledPastHero;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/90 border-b border-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isRevealed ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">
        <div 
          onClick={() => scrollTo('top')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-1 border border-primary/40 shadow-[0_0_12px_rgba(227,175,53,0.25)] flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="Somaiya Vidyavihar" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider text-primary uppercase leading-tight">
              VLAB &bull; EXPERIMENT 08
            </span>
            <span className="text-xs sm:text-sm md:text-base font-semibold text-foreground tracking-tight leading-tight">
              Stop-and-Wait ARQ Simulator
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs md:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-black font-bold shadow-[0_0_16px_rgba(227,175,53,0.35)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {item.isTop && <span className="text-xs">&uarr;</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
