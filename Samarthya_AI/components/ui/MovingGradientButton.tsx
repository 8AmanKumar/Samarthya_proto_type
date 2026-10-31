"use client";

import React, { useState } from "react";

export interface MovingGradientButtonFont {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface MovingGradientButtonColors {
  fill: string;
  hoverFill: string;
  textColor: string;
  hoverTextColor: string;
}

export interface MovingGradientButtonBorder {
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
}

export interface MovingGradientButtonStroke {
  color: string;
  headColor: string;
  count: number;
  speed: number;
  trail: number;
  movement: "continuous" | "hover";
  direction: "cw" | "ccw";
}

export interface MovingGradientButtonIcon {
  side: "left" | "right";
  symbol: string | React.ReactNode;
  size: number;
  color: string;
  hoverColor: string;
}

export interface MovingGradientButtonProps {
  label: string;
  padding?: string;
  rounded?: number;
  font?: MovingGradientButtonFont;
  colors?: MovingGradientButtonColors;
  border?: MovingGradientButtonBorder;
  stroke?: MovingGradientButtonStroke;
  addIcon?: boolean;
  icon?: MovingGradientButtonIcon;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function MovingGradientButton({
  label,
  padding = "12px 22px",
  rounded = 100,
  font = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "1.2em",
    letterSpacing: "-0.01em",
  },
  colors = {
    fill: "#0D101D",
    hoverFill: "#15192E",
    textColor: "#F8FAFC",
    hoverTextColor: "#FFFFFF",
  },
  border = {
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "rgba(99, 102, 241, 0.22)",
  },
  stroke = {
    color: "#4F46E5",
    headColor: "#38BDF8",
    count: 2,
    speed: 35,
    trail: 70,
    movement: "continuous",
    direction: "cw",
  },
  addIcon = true,
  icon = {
    side: "right",
    symbol: "→",
    size: 16,
    color: "#818CF8",
    hoverColor: "#38BDF8",
  },
  onClick,
  className = "",
  style = {},
  children,
}: MovingGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation duration based on speed
  const animDuration = Math.max(1.5, 70 / Math.max(1, stroke.speed));
  const isContinuous = stroke.movement === "continuous";
  const isPlaying = isContinuous || isHovered;
  const isCw = stroke.direction === "cw";

  // Build conic-gradient string for 1 or 2 beams
  const count = Math.max(1, stroke.count || 2);
  let conicGradient = "";
  if (count === 1) {
    conicGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 40deg, ${stroke.color} 75deg, ${stroke.headColor} 90deg, transparent 91deg, transparent 360deg)`;
  } else {
    // 2 opposing beams
    conicGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 35deg, ${stroke.color} 75deg, ${stroke.headColor} 90deg, transparent 91deg, transparent 215deg, ${stroke.color} 255deg, ${stroke.headColor} 270deg, transparent 271deg, transparent 360deg)`;
  }

  const currentFill = isHovered ? colors.hoverFill : colors.fill;
  const currentTextColor = isHovered ? colors.hoverTextColor : colors.textColor;
  const currentIconColor = isHovered ? icon.hoverColor : icon.color;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(e as any);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`moving-gradient-button-root ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: `${rounded}px`,
        overflow: "hidden",
        padding: `${border.borderWidth}px`,
        cursor: "pointer",
        userSelect: "none",
        outline: "none",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease",
        transform: isHovered ? "translateY(-1px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? `0 10px 25px -5px ${stroke.color}44, 0 0 16px ${stroke.headColor}33`
          : "0 4px 14px rgba(0, 0, 0, 0.4)",
        ...style,
      }}
    >
      {/* Background Static Border Track */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${rounded}px`,
          border: `${border.borderWidth}px ${border.borderStyle} ${border.borderColor}`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Rotating Glow Beam Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-150%",
          background: conicGradient,
          animation: `${isCw ? "mgb-spin-cw" : "mgb-spin-ccw"} ${animDuration}s linear infinite`,
          animationPlayState: isPlaying ? "running" : "paused",
          opacity: isPlaying ? (isHovered ? 1 : 0.85) : 0,
          filter: "blur(6px)",
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Sharp Rotating Beam Core */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-150%",
          background: conicGradient,
          animation: `${isCw ? "mgb-spin-cw" : "mgb-spin-ccw"} ${animDuration}s linear infinite`,
          animationPlayState: isPlaying ? "running" : "paused",
          opacity: isPlaying ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Inner Button Body */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          width: "100%",
          height: "100%",
          padding: padding,
          borderRadius: `${Math.max(0, rounded - border.borderWidth)}px`,
          backgroundColor: currentFill,
          color: currentTextColor,
          fontFamily: font.fontFamily,
          fontWeight: font.fontWeight as any,
          fontSize: `${font.fontSize}px`,
          lineHeight: font.lineHeight,
          letterSpacing: font.letterSpacing,
          transition: "background-color 0.25s ease, color 0.25s ease",
          whiteSpace: "nowrap",
        }}
      >
        {addIcon && icon.side === "left" && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: `${icon.size}px`,
              color: currentIconColor,
              transition: "color 0.25s ease, transform 0.25s ease",
              transform: isHovered ? "translateX(-2px)" : "translateX(0)",
            }}
          >
            {icon.symbol}
          </span>
        )}

        <span>{label}</span>
        {children}

        {addIcon && icon.side === "right" && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: `${icon.size}px`,
              color: currentIconColor,
              transition: "color 0.25s ease, transform 0.25s ease",
              transform: isHovered ? "translateX(3px)" : "translateX(0)",
            }}
          >
            {icon.symbol}
          </span>
        )}
      </div>

      <style>{`
        @keyframes mgb-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes mgb-spin-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

export default MovingGradientButton;
