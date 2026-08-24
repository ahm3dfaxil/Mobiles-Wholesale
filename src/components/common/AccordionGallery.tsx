import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export interface AccordionItem {
  id?: string;
  image: string;
  label: string;
  count: string;
  link: string;
}

export interface AccordionGalleryProps {
  items: AccordionItem[];
  defaultIndex?: number;
  expandRatio?: number;
  trigger?: 'hover' | 'click';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  gap?: number;
  radius?: number;
  grayscale?: boolean;
  showLabels?: boolean;
  height?: number;
  className?: string;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items,
  defaultIndex = 0,
  expandRatio = 0.42,
  trigger = 'hover',
  duration = 0.55,
  ease = 'power3.out',
  gap = 10,
  radius = 18,
  grayscale = false,
  showLabels = true,
  height = 400,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const navigate = useNavigate();

  // Screen size check for mobile vertical vs desktop horizontal behavior
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Compute flex ratios for desktop horizontal accordion
  // 7 panels: active panel gets expandRatio, remaining (1 - expandRatio) divided equally
  const activeFlex = expandRatio / ((1 - expandRatio) / Math.max(1, items.length - 1));
  const collapsedFlex = 1;

  // Handle panel navigation
  const handlePanelClick = (index: number, link: string) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      navigate(link);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number, link: string) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      setActiveIndex(nextIndex);
      panelsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      setActiveIndex(prevIndex);
      panelsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePanelClick(index, link);
    }
  };

  // GSAP animation update when activeIndex or window orientation changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === activeIndex;
        const img = imagesRef.current[i];

        if (!isMobile) {
          // Desktop Horizontal Accordion Flex Animation
          gsap.to(panel, {
            flexGrow: isActive ? activeFlex : collapsedFlex,
            flexShrink: 1,
            flexBasis: '0%',
            duration: duration,
            ease: ease,
            overwrite: 'auto'
          });

          if (img) {
            gsap.to(img, {
              scale: isActive ? 1.06 : 1.0,
              filter: isActive
                ? (grayscale ? 'grayscale(0%) brightness(1)' : 'brightness(1) contrast(1.02)')
                : (grayscale ? 'grayscale(40%) brightness(0.85)' : 'brightness(0.8) contrast(0.98)'),
              duration: duration,
              ease: ease,
              overwrite: 'auto'
            });
          }
        } else {
          // Mobile Vertical Accordion Height Animation
          gsap.to(panel, {
            height: isActive ? 230 : 64,
            duration: duration,
            ease: ease,
            overwrite: 'auto'
          });

          if (img) {
            gsap.to(img, {
              scale: isActive ? 1.05 : 1.0,
              filter: isActive ? 'brightness(1)' : 'brightness(0.75)',
              duration: duration,
              ease: ease,
              overwrite: 'auto'
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, isMobile, activeFlex, collapsedFlex, duration, ease, grayscale, items.length]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden select-none ${className}`}
      style={{
        padding: '2px 0'
      }}
    >
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full transition-all`}
        style={{
          gap: `${gap}px`,
          height: isMobile ? 'auto' : `${height}px`
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={item.id || index}
              ref={(el) => (panelsRef.current[index] = el)}
              tabIndex={0}
              role="button"
              aria-expanded={isActive}
              aria-label={`${item.label} category - ${item.count}`}
              onMouseEnter={() => {
                if (trigger === 'hover' && !isMobile && activeIndex !== index) {
                  setActiveIndex(index);
                }
              }}
              onClick={() => handlePanelClick(index, item.link)}
              onKeyDown={(e) => handleKeyDown(e, index, item.link)}
              className={`relative overflow-hidden cursor-pointer transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2522] focus-visible:ring-offset-2 border border-[#DDE5E0] hover:border-[#C6A15B] bg-[#F7F5EF] group ${
                isActive ? 'shadow-md z-10' : 'shadow-2xs opacity-95'
              }`}
              style={{
                borderRadius: `${radius}px`,
                // Default initial flex for desktop before GSAP mounts
                flex: !isMobile ? (isActive ? `${activeFlex} 1 0%` : `${collapsedFlex} 1 0%`) : 'undefined',
                height: isMobile ? (isActive ? '230px' : '64px') : '100%',
                willChange: 'flex-grow, height, transform'
              }}
            >
              {/* Background Image Container with Parallax / Zoom */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-stone-900">
                <img
                  ref={(el) => (imagesRef.current[index] = el)}
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-all duration-500 transform-gpu"
                  loading="lazy"
                />
                {/* Overlay Gradients for Readability */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-100'
                      : 'bg-gradient-to-t from-black/75 via-black/40 to-black/20 opacity-90 group-hover:opacity-75'
                  }`}
                />
              </div>

              {/* Desktop Collapsed Indicator (Vertical Text or Badge) */}
              {!isMobile && !isActive && showLabels && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between items-center pointer-events-none z-10">
                  <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white/90 font-mono text-[11px] font-bold">
                    0{index + 1}
                  </div>
                  <div className="writing-mode-vertical rotate-180 text-center uppercase tracking-wider text-xs font-black text-white/90 drop-shadow-sm whitespace-nowrap overflow-hidden text-ellipsis max-h-[220px]">
                    {item.label}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
              )}

              {/* Mobile Collapsed Header */}
              {isMobile && !isActive && showLabels && (
                <div className="absolute inset-0 px-5 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                      0{index + 1}
                    </span>
                    <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight drop-shadow-sm">
                      {item.label}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-200 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/10">
                    {item.count}
                  </span>
                </div>
              )}

              {/* Expanded Active Content Layer */}
              {isActive && showLabels && (
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-20 pointer-events-none">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0B2522] bg-[#EAF3F0] px-3 py-1 rounded-full border border-[#C6A15B]/40 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006B5B] animate-pulse" />
                      Category 0{index + 1}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shadow-xs group-hover:bg-[#0B2522] group-hover:border-[#0B2522] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Text & Live Stock Count Row */}
                  <div className="space-y-2.5 max-w-full">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                      {item.label}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-white bg-[#0B2522] px-3.5 py-1.5 rounded-xl shadow-md border border-[#C6A15B]/30">
                        {item.count}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-200 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
                        View Stock <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
