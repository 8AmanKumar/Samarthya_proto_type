'use client';

import React, { useEffect, useRef } from 'react';
import './SpotlightCard.css';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
  intensity?: number;
  spotlightSize?: number;
  softness?: number;
  shape?: 'circle' | 'beam';
  borderGlow?: number;
  proximity?: number;
  smoothing?: number;
  ambient?: boolean;
  flare?: boolean;
  grain?: number;
  theme?: 'dark' | 'light';
}

const THEMES = {
  dark: {
    surface: '#0f172a',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 24px 48px -24px rgba(0, 0, 0, 0.6)',
    light: '#6366f1',
    fill: 1,
    edge: 1
  },
  light: {
    surface: '#ffffff',
    border: 'rgba(24, 24, 27, 0.1)',
    shadow: '0 1px 2px rgba(24, 24, 27, 0.04), 0 18px 40px -20px rgba(24, 24, 27, 0.16)',
    light: '#3b82f6',
    fill: 0.28,
    edge: 0.7
  }
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style,
  spotlightColor,
  intensity = 0.18,
  spotlightSize = 280,
  softness = 0.7,
  shape = 'circle',
  borderGlow = 0.6,
  proximity = 80,
  smoothing = 0.3,
  ambient = false,
  flare = true,
  grain = 0,
  theme = 'dark',
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const palette = THEMES[theme] ?? THEMES.dark;
  const color = spotlightColor ?? palette.light;

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    const edge = edgeRef.current;
    if (!root || !light || !edge) return;

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      light.style.background = `radial-gradient(circle ${spotlightSize}px at ${x}px ${y}px, ${color}, transparent 70%)`;
      light.style.opacity = String(intensity);

      edge.style.background = `radial-gradient(circle ${spotlightSize * 0.8}px at ${x}px ${y}px, rgba(147, 197, 253, ${borderGlow}), transparent 65%)`;
      edge.style.opacity = '1';
    };

    const onLeave = () => {
      light.style.opacity = '0';
      edge.style.opacity = '0';
    };

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);

    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [color, spotlightSize, intensity, borderGlow]);

  return (
    <div
      ref={rootRef}
      className={`spotlight-card${className ? ` ${className}` : ''}`}
      style={{
        '--spotlight-card-surface': palette.surface,
        '--spotlight-card-border': palette.border,
        '--spotlight-card-shadow': palette.shadow,
        ...style
      } as React.CSSProperties}
      {...rest}
    >
      <span ref={lightRef} className="spotlight-card__light" aria-hidden="true" />
      {children}
      <span className="spotlight-card__border" aria-hidden="true" />
      <span ref={edgeRef} className="spotlight-card__edge" aria-hidden="true" />
    </div>
  );
};

export default SpotlightCard;
