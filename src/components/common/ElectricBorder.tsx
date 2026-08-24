import React, { useEffect, useRef, useState } from 'react';
import './ElectricBorder.css';

export interface ElectricBorderProps {
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ElectricBorder: React.FC<ElectricBorderProps> = ({
  color = '#00A88F',
  speed = 0.75,
  chaos = 0.065,
  borderRadius = 24,
  children,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number = 0;
    let time = 0;
    let isVisible = false;
    let currentWidth = 0;
    let currentHeight = 0;

    const parseColor = (hex: string, alpha: number) => {
      let c = hex.replace('#', '').trim();
      if (c.length === 3) {
        c = c.split('').map((x) => x + x).join('');
      }
      if (c.length === 6) {
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return hex;
    };

    const margin = 16;

    const updateSize = (w: number, h: number) => {
      if (w === 0 || h === 0) return;
      currentWidth = w;
      currentHeight = h;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.ceil((w + margin * 2) * dpr);
      canvas.height = Math.ceil((h + margin * 2) * dpr);
      canvas.style.width = `${w + margin * 2}px`;
      canvas.style.height = `${h + margin * 2}px`;
      canvas.style.top = `-${margin}px`;
      canvas.style.left = `-${margin}px`;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          updateSize(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(container);

    const getRoundedRectPoint = (
      s: number,
      w: number,
      h: number,
      r: number
    ) => {
      const L_top = Math.max(0, w - 2 * r);
      const L_corner = (Math.PI / 2) * r;
      const L_right = Math.max(0, h - 2 * r);
      const L_bot = Math.max(0, w - 2 * r);
      const L_left = Math.max(0, h - 2 * r);
      const P = 2 * L_top + 2 * L_right + 4 * L_corner;

      let normS = s % P;
      if (normS < 0) normS += P;

      let x = 0;
      let y = 0;
      let nx = 0;
      let ny = 0;

      if (normS < L_top) {
        const u = normS / L_top;
        x = r + u * L_top;
        y = 0;
        nx = 0;
        ny = -1;
      } else if (normS < L_top + L_corner) {
        const a = -Math.PI / 2 + ((normS - L_top) / L_corner) * (Math.PI / 2);
        x = w - r + r * Math.cos(a);
        y = r + r * Math.sin(a);
        nx = Math.cos(a);
        ny = Math.sin(a);
      } else if (normS < L_top + L_corner + L_right) {
        const u = (normS - L_top - L_corner) / L_right;
        x = w;
        y = r + u * L_right;
        nx = 1;
        ny = 0;
      } else if (normS < L_top + 2 * L_corner + L_right) {
        const a = 0 + ((normS - L_top - L_corner - L_right) / L_corner) * (Math.PI / 2);
        x = w - r + r * Math.cos(a);
        y = h - r + r * Math.sin(a);
        nx = Math.cos(a);
        ny = Math.sin(a);
      } else if (normS < L_top + 2 * L_corner + L_right + L_bot) {
        const u = (normS - L_top - 2 * L_corner - L_right) / L_bot;
        x = w - r - u * L_bot;
        y = h;
        nx = 0;
        ny = 1;
      } else if (normS < L_top + 3 * L_corner + L_right + L_bot) {
        const a = Math.PI / 2 + ((normS - L_top - 2 * L_corner - L_right - L_bot) / L_corner) * (Math.PI / 2);
        x = r + r * Math.cos(a);
        y = h - r + r * Math.sin(a);
        nx = Math.cos(a);
        ny = Math.sin(a);
      } else if (normS < L_top + 3 * L_corner + L_right + L_bot + L_left) {
        const u = (normS - L_top - 3 * L_corner - L_right - L_bot) / L_left;
        x = 0;
        y = h - r - u * L_left;
        nx = -1;
        ny = 0;
      } else {
        const a = Math.PI + ((normS - L_top - 3 * L_corner - L_right - L_bot - L_left) / L_corner) * (Math.PI / 2);
        x = r + r * Math.cos(a);
        y = r + r * Math.sin(a);
        nx = Math.cos(a);
        ny = Math.sin(a);
      }

      return { x, y, nx, ny, P };
    };

    const render = () => {
      if (!isVisible || currentWidth === 0 || currentHeight === 0) {
        animationFrameId = 0;
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const w = currentWidth;
      const h = currentHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w + margin * 2, h + margin * 2);

      time += speed * 2.0;

      const r = Math.min(borderRadius, Math.min(w, h) / 2);
      const L_top = Math.max(0, w - 2 * r);
      const L_corner = (Math.PI / 2) * r;
      const L_right = Math.max(0, h - 2 * r);
      const P = 2 * L_top + 2 * L_right + 4 * L_corner;

      if (P > 0) {
        const step = 4.5;
        const numSteps = Math.ceil(P / step);

        const hoverMult = isHovered ? 1.4 : 1.0;
        const baseGlowAlpha = Math.min(1.0, 0.65 * hoverMult);
        const coreAlpha = Math.min(1.0, 0.95 * hoverMult);
        const shadowBlur = isHovered ? 20 : 12;

        // Pass 1: Strong Outer Energy Aura
        ctx.beginPath();
        for (let i = 0; i <= numSteps; i++) {
          const s = i * step;
          const pt = getRoundedRectPoint(s, w, h, r);

          const wave =
            Math.sin(s * 0.05 + time * 0.06) * 0.6 +
            Math.cos(s * 0.12 - time * 0.09) * 0.4;
          const offset = wave * (chaos * 35);

          const px = margin + pt.x + pt.nx * offset;
          const py = margin + pt.y + pt.ny * offset;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.strokeStyle = parseColor(color, baseGlowAlpha);
        ctx.lineWidth = 3.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = shadowBlur;
        ctx.stroke();

        // Pass 2: Main Vivid Electrical Shockwave Arc
        ctx.beginPath();
        for (let i = 0; i <= numSteps; i++) {
          const s = i * step;
          const pt = getRoundedRectPoint(s, w, h, r);

          const wave1 = Math.sin(s * 0.14 + time * 0.12) * 0.7;
          const wave2 = Math.cos(s * 0.28 - time * 0.22) * 0.5;
          const jitter = (Math.random() - 0.5) * 2.2;
          const totalOffset = (wave1 + wave2 + jitter) * (chaos * 50);

          const px = margin + pt.x + pt.nx * totalOffset;
          const py = margin + pt.y + pt.ny * totalOffset;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.strokeStyle = parseColor(color, coreAlpha);
        ctx.lineWidth = 2.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = shadowBlur / 1.5;
        ctx.stroke();

        // Pass 3: Dual High-Voltage White Core Bolts (Traveling Along Edge)
        const sparkLength = P * 0.22;
        const sparkPos1 = (time * 14) % P;
        const sparkPos2 = (time * 14 + P * 0.5) % P;

        [sparkPos1, sparkPos2].forEach((sparkPos) => {
          ctx.beginPath();
          const sparkSteps = Math.ceil(sparkLength / step);
          const startStep = Math.floor(sparkPos / step);

          for (let i = 0; i <= sparkSteps; i++) {
            const s = (startStep + i) * step;
            const pt = getRoundedRectPoint(s, w, h, r);

            const jitter = (Math.random() - 0.5) * 2.5;
            const offset = jitter * (chaos * 35);
            const px = margin + pt.x + pt.nx * offset;
            const py = margin + pt.y + pt.ny * offset;

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          ctx.strokeStyle = parseColor('#FFFFFF', 0.95);
          ctx.lineWidth = 1.8;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
          ctx.stroke();
        });
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(render);
            }
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = 0;
            }
          }
        });
      },
      { threshold: 0.01 }
    );

    intersectionObserver.observe(container);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, speed, chaos, borderRadius, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`electric-border-container ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas ref={canvasRef} className="electric-border-canvas" />
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
