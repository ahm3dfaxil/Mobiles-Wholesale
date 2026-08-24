import React, { useEffect, useState } from 'react';

export interface DriftWallItem {
  image: string;
  title: string;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  align?: 'left' | 'right' | 'center' | 'between';
}

export const HERO_ELECTRONICS_LEFT: DriftWallItem[] = [
  {
    title: 'Apple iPhone 15 Pro Titanium',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Samsung Galaxy S23 Ultra Lot',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple iPad Pro M2',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'OnePlus 12 Wholesale',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple Watch Series 9',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sony Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Xiaomi 14 Pro Bulk',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Google Pixel Fold',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Samsung Galaxy Z Flip 5',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple MacBook Air M2',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
  },
];

export const HERO_ELECTRONICS: DriftWallItem[] = [
  {
    title: 'Apple iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple MacBook Pro M3',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Google Pixel 8 Pro',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple iPad Pro 12.9',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple iPhone 14 Pro',
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Dell XPS 15 Laptop',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apple Watch Ultra',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'AirPods Pro Wholesale',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Smartphone Wholesale Stock',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Samsung Galaxy Z Fold',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'MacBook Air M2',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Xiaomi Ultra Smartphone',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'iPad Air & Tablet Lot',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Sony Xperia Flagship',
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
  },
];

export const DriftWall: React.FC<DriftWallProps> = ({
  items = HERO_ELECTRONICS,
  columns = 5,
  tileWidth = 170,
  tileHeight = 118,
  gap = 18,
  radius = 14,
  tilt = 4,
  turn = -3,
  roll = 0,
  perspective = 1600,
  depth = 20,
  speed = 13,
  direction = 'up',
  variance = 0.2,
  fade = 0.0,
  dim = 0.0,
  grayscale = false,
  className = '',
  align = 'right',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Distribute items across columns
  const columnData: DriftWallItem[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, idx) => {
    columnData[idx % columns].push(item);
  });

  const justifyClass = 
    align === 'left' ? 'justify-start left-0' :
    align === 'center' ? 'justify-center left-1/2 -translate-x-1/2' :
    align === 'between' ? 'justify-between left-0 right-0' :
    'justify-end right-0';

  return (
    <div
      className={`drift-wall-container relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
        contain: 'layout paint',
      }}
    >
      <div
        className={`drift-wall-3d flex ${justifyClass} w-full h-[140%] absolute top-1/2 -translate-y-1/2 opacity-100`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg) translateZ(-${depth}px)`,
          gap: `${gap}px`,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {columnData.map((colItems, colIdx) => {
          if (colItems.length === 0) return null;

          // Triple items for seamless continuous looping
          const loopItems = [...colItems, ...colItems, ...colItems];
          const colSpeed = speed * (1 + (colIdx % 2 === 0 ? variance : -variance));
          const isUp = direction === 'up' ? colIdx % 2 === 0 : colIdx % 2 !== 0;

          return (
            <div
              key={colIdx}
              className="drift-wall-column flex flex-col shrink-0"
              style={{
                gap: `${gap}px`,
                willChange: 'transform',
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                animation: prefersReducedMotion
                  ? 'none'
                  : `driftLoop${isUp ? 'Up' : 'Down'} ${colSpeed}s linear infinite`,
              }}
            >
              {loopItems.map((item, itemIdx) => (
                <div
                  key={`${colIdx}-${itemIdx}`}
                  className="drift-wall-tile rounded-2xl overflow-hidden bg-white border-2 border-[#DDE5E0] shadow-md relative shrink-0"
                  style={{
                    width: `${tileWidth}px`,
                    height: `${tileHeight}px`,
                    borderRadius: `${radius}px`,
                    opacity: 1 - fade,
                    filter: grayscale ? 'grayscale(100%)' : 'none',
                    willChange: 'transform',
                    transform: 'translate3d(0,0,0)',
                    backfaceVisibility: 'hidden',
                    contain: 'paint layout',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {dim > 0 && (
                    <div
                      className="absolute inset-0 bg-[#F7F5EF]/10 pointer-events-none"
                      style={{ opacity: dim }}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes driftLoopUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -33.333%, 0);
          }
        }
        @keyframes driftLoopDown {
          0% {
            transform: translate3d(0, -33.333%, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};
