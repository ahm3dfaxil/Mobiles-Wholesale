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

  // GSAP animation update for desktop horizontal accordion
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === activeIndex;
        const img = imagesRef.current[i];

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
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex, isMobile, activeFlex, collapsedFlex, duration, ease, grayscale, items.length]);

  // Handle mobile scroll snap index detection
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 12 : 280;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < items.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden select-none ${className}`}
      style={{
        padding: '2px 0'
      }}
    >
      {/* MOBILE VIEW: Premium Horizontal Swipe Carousel */}
      {isMobile ? (
        <div className="w-full space-y-3">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-3 py-2 px-1 scrollbar-none w-full"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory'
            }}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id || index}
                  onClick={() => navigate(item.link)}
                  className={`snap-center shrink-0 w-[82vw] max-w-[320px] h-[330px] relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'border-[#D4AF62] shadow-xl ring-2 ring-[#D4AF62]/40 scale-[1.01] z-10'
                      : 'border-[#D8E2DE] shadow-md opacity-90'
                  } bg-stone-900 group`}
                  style={{
                    borderRadius: `${radius}px`,
                    scrollSnapAlign: 'center'
                  }}
                >
                  {/* Background Category Image */}
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                    {/* Top Row: Category Badge & Arrow */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#071715] bg-[#E5F3EF] px-3 py-1 rounded-full border border-[#D4AF62] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A88F] animate-pulse" />
                        0{index + 1} / 0{items.length}
                      </span>

                      <span className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xs group-hover:bg-[#063F35] transition-colors">
                        <ArrowUpRight className="w-4 h-4 text-[#D4AF62]" />
                      </span>
                    </div>

                    {/* Bottom Row: Category Title, Count & View Stock CTA */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-2xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                          {item.label}
                        </h3>
                        <span className="inline-block text-xs font-bold text-[#DCE8E4] mt-0.5">
                          {item.count}
                        </span>
                      </div>

                      <div className="pt-1">
                        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-[#063F35] hover:bg-[#007A68] px-4 py-2 rounded-xl shadow-md border border-[#D4AF62]/40 transition-colors">
                          <span>View Stock</span>
                          <ChevronRight className="w-4 h-4 text-[#D4AF62]" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  if (mobileScrollRef.current) {
                    const card = mobileScrollRef.current.children[idx] as HTMLElement;
                    if (card) {
                      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'w-6 bg-[#00A88F]' : 'w-2 bg-[#D8E2DE]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* DESKTOP VIEW: Pristine Horizontal GSAP Accordion */
        <div
          className="flex flex-row w-full transition-all"
          style={{
            gap: `${gap}px`,
            height: `${height}px`
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
                  if (trigger === 'hover' && activeIndex !== index) {
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
                  flex: isActive ? `${activeFlex} 1 0%` : `${collapsedFlex} 1 0%`,
                  height: '100%',
                  willChange: 'flex-grow, transform'
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
                {!isActive && showLabels && (
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

                {/* Desktop Expanded Active Content Layer */}
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
      )}
    </div>
  );
};
