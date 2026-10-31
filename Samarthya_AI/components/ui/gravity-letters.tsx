"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";

export interface GravityLettersProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  lineHeight?: number;
  colors?: [string, string];
  grain?: "glyph" | "dot" | "square";
  charset?: string;
  grainSize?: number;
  grainScale?: number;
  gravity?: number;
  anchor?: "top" | "bottom";
  cut?: boolean;
  cutWidth?: number;
  throwForce?: number;
  clickToCollapse?: boolean;
  collapseSpeed?: number;
  erosion?: number;
  healDelay?: number;
  holdTime?: number;
  rebuild?: "sweep" | "rise" | "random";
  rebuildDuration?: number;
  paused?: boolean;
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface GravityLettersRef {
  collapse: (x?: number, y?: number) => void;
  rebuild: () => void;
}

export const GravityLetters = forwardRef<GravityLettersRef, GravityLettersProps>(function GravityLetters(
  {
    text = "Empowering Beneficiaries with Intelligent Access",
    fontSize = 72,
    fontWeight = 800,
    fontFamily = "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
    lineHeight = 1.08,
    colors = ["#F8FAFC", "#818CF8"],
    grain = "glyph",
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%$",
    grainSize = 6,
    grainScale = 1,
    gravity = 1,
    anchor = "top",
    cut = true,
    cutWidth = 10,
    throwForce = 1.2,
    clickToCollapse = true,
    collapseSpeed = 1400,
    erosion = 0.08,
    healDelay = 1.8,
    holdTime = 0.8,
    rebuild = "sweep",
    rebuildDuration = 0.7,
    paused = false,
    quality = 1,
    className = "",
    style = {},
    children,
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    collapse: (x, y) => engineRef.current?.collapse?.(x, y),
    rebuild: () => engineRef.current?.rebuild?.(),
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let destroyed = false;
    let animFrame: number;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    container.prepend(canvas);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
      });
    } catch {
      // Fallback
    }

    // Engine options
    const options = {
      text,
      fontSize,
      fontWeight,
      fontFamily,
      lineHeight,
      colors,
      grain,
      charset,
      grainSize,
      grainScale,
      gravity,
      anchor,
      cut,
      cutWidth,
      throwForce,
      clickToCollapse,
      collapseSpeed,
      erosion,
      healDelay,
      holdTime,
      rebuild,
      rebuildDuration,
      paused,
      quality,
    };

    if (window && (window as any).GravityLettersEngine) {
      engineRef.current = new (window as any).GravityLettersEngine(container, options);
    }

    return () => {
      destroyed = true;
      if (animFrame) cancelAnimationFrame(animFrame);
      if (engineRef.current) {
        engineRef.current.destroy?.();
        engineRef.current = null;
      }
      canvas.remove();
      renderer?.dispose();
    };
  }, [
    text,
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    colors,
    grain,
    charset,
    grainSize,
    grainScale,
    gravity,
    anchor,
    cut,
    cutWidth,
    throwForce,
    clickToCollapse,
    collapseSpeed,
    erosion,
    healDelay,
    holdTime,
    rebuild,
    rebuildDuration,
    paused,
    quality,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative isolate w-full min-h-[160px] overflow-hidden select-none cursor-pointer ${className}`}
      style={{ touchAction: "none", ...style }}
    >
      <h1 className="sr-only" aria-label={text}>
        {text}
      </h1>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
});

export default GravityLetters;
