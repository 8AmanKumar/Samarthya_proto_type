"use client";

import React from "react";

export interface CarouselCardItem {
  id: string;
  indexTag: string; // e.g. "#01 // ADIP GRANT"
  title: string;
  subtitle: string;
  badge: string;
  stat: string;
  statLabel: string;
  accent: "indigo" | "emerald" | "cyan" | "violet" | "amber";
  icon: string;
  wireframeType: "waveform" | "chart" | "matrix" | "radar";
}

export interface CurvedBackgroundCarouselProps {
  cards?: CarouselCardItem[];
  radius?: number; // Cylinder radius in px, default 720
  cardWidth?: number; // default 250
  cardHeight?: number; // default 330
  perspective?: number; // default 1400
  durationSeconds?: number; // default 45s for pure continuous constant-speed rotation
  className?: string;
}

const DEFAULT_CARDS: CarouselCardItem[] = [
  {
    id: "adip-grant",
    indexTag: "#01 // ADIP GRANT",
    title: "Assistive Tech Aid",
    subtitle: "AI Wheelchairs & Hearing Diagnostics",
    badge: "100% Subsidy",
    stat: "₹50,000",
    statLabel: "Direct Aid",
    accent: "cyan",
    icon: "🦽",
    wireframeType: "waveform"
  },
  {
    id: "nsfdc-credit",
    indexTag: "#02 // NSFDC 6.5%",
    title: "Concessional Credit",
    subtitle: "Collateral-Free Term Loans for SC/PwD",
    badge: "Statutory Rate",
    stat: "6.5%",
    statLabel: "Annual APR",
    accent: "emerald",
    icon: "🏦",
    wireframeType: "chart"
  },
  {
    id: "post-matric",
    indexTag: "#03 // POST-MATRIC",
    title: "Higher Education Grant",
    subtitle: "Full Tuition + Tech Device Allowance",
    badge: "Auto-Sanction",
    stat: "₹1.25L",
    statLabel: "Annual Benefit",
    accent: "indigo",
    icon: "🎓",
    wireframeType: "radar"
  },
  {
    id: "udid-instant",
    indexTag: "#04 // UDID INSTANT",
    title: "Zero-Doc Verification",
    subtitle: "Instant Swavlamban Portal Sync",
    badge: "Zero Docs",
    stat: "Instant",
    statLabel: "API Check",
    accent: "violet",
    icon: "🪪",
    wireframeType: "matrix"
  },
  {
    id: "wispr-voice",
    indexTag: "#05 // WISPR VOICE",
    title: "Multilingual Neural Flow",
    subtitle: "Voice-First Criteria Intake Engine",
    badge: "12 Languages",
    stat: "< 1.5s",
    statLabel: "Voice Engine",
    accent: "cyan",
    icon: "🎙️",
    wireframeType: "waveform"
  },
  {
    id: "dpdp-vault",
    indexTag: "#06 // DPDP VAULT",
    title: "Privacy Cryptographic Vault",
    subtitle: "Zero-Knowledge Local Verification",
    badge: "100% Private",
    stat: "Zero Byte",
    statLabel: "Server PII",
    accent: "emerald",
    icon: "🔒",
    wireframeType: "matrix"
  },
  {
    id: "nhfdc-trust",
    indexTag: "#07 // NHFDC TRUST",
    title: "Divyangjan Enterprise",
    subtitle: "Self-Employment Capital & Mentorship",
    badge: "Micro-Credit",
    stat: "₹50.0L",
    statLabel: "Cap Scheme",
    accent: "amber",
    icon: "💼",
    wireframeType: "chart"
  },
  {
    id: "scholarship-tier1",
    indexTag: "#08 // SCHOLARSHIP+",
    title: "Tier 1 Top-Class Matrix",
    subtitle: "Full Ride across IITs, IIMs & AIIMS",
    badge: "National Pool",
    stat: "100%",
    statLabel: "Fee Covered",
    accent: "indigo",
    icon: "🏛️",
    wireframeType: "radar"
  },
  {
    id: "alimco-matrix",
    indexTag: "#09 // ALIMCO MATRIX",
    title: "Robotic Prosthetics",
    subtitle: "Bionic Limbs & Smart Sensor Camps",
    badge: "Camp Live",
    stat: "GPS Live",
    statLabel: "District Routing",
    accent: "emerald",
    icon: "🦾",
    wireframeType: "waveform"
  },
  {
    id: "statutory-ai",
    indexTag: "#10 // STATUTORY AI",
    title: "SIH26093 Rule Engine",
    subtitle: "Deterministic Gazette Act Validation",
    badge: "Statutory SLA",
    stat: "< 2.0s",
    statLabel: "Rule Match Time",
    accent: "violet",
    icon: "⚡",
    wireframeType: "matrix"
  },
  {
    id: "dbt-express",
    indexTag: "#11 // DBT EXPRESS",
    title: "Direct Benefit Transfer",
    subtitle: "Aadhaar Bridge Direct PFMS Payouts",
    badge: "PFMS Active",
    stat: "Direct",
    statLabel: "Bank Credit",
    accent: "cyan",
    icon: "💳",
    wireframeType: "chart"
  },
  {
    id: "grievance-sla",
    indexTag: "#12 // ESCALATION BOT",
    title: "Grievance Auto-Escalate",
    subtitle: "Automated 48h Magistrate Escalation",
    badge: "24/7 AI Bot",
    stat: "48h SLA",
    statLabel: "Strict Timeline",
    accent: "indigo",
    icon: "🚨",
    wireframeType: "radar"
  }
];

export const CurvedBackgroundCarousel: React.FC<CurvedBackgroundCarouselProps> = ({
  cards = DEFAULT_CARDS,
  radius = 720,
  cardWidth = 250,
  cardHeight = 330,
  perspective = 1400,
  durationSeconds = 45,
  className = ""
}) => {
  const totalCards = cards.length;
  const angleStep = 360 / totalCards;

  const renderCardContent = (card: CarouselCardItem) => (
    <>
      {/* Holographic Top Sheen */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Subtle Scanline Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)"
        }}
      />

      {/* Card Header: Monogram Icon & Badge */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl p-1.5 rounded-lg bg-white/5 border border-white/10">
            {card.icon}
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-300/80">
            {card.badge}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
      </div>

      {/* Card Center: Visual Preview */}
      <div className="my-2 relative z-10">
        {card.wireframeType === "chart" && (
          <div className="w-full h-20 relative flex items-end gap-1.5 px-3 py-2 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden">
            <div className="w-1/6 bg-emerald-500/30 rounded-t" style={{ height: "35%" }} />
            <div className="w-1/6 bg-emerald-500/40 rounded-t" style={{ height: "55%" }} />
            <div className="w-1/6 bg-emerald-500/50 rounded-t" style={{ height: "45%" }} />
            <div className="w-1/6 bg-emerald-500/70 rounded-t" style={{ height: "78%" }} />
            <div className="w-1/6 bg-emerald-400 rounded-t relative shadow-[0_0_12px_rgba(16,185,129,0.8)]" style={{ height: "92%" }}>
              <div className="w-1.5 h-1.5 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
            </div>
            <div className="w-1/6 bg-emerald-500/40 rounded-t" style={{ height: "65%" }} />
          </div>
        )}
        {card.wireframeType === "waveform" && (
          <div className="w-full h-20 relative flex items-center justify-center gap-1 px-3 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden">
            {[40, 75, 95, 60, 85, 100, 70, 90, 50, 80, 65, 35].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-cyan-400 to-indigo-400 rounded-full"
                style={{ height: `${h}%`, opacity: 0.7 + (h / 300) }}
              />
            ))}
          </div>
        )}
        {card.wireframeType === "matrix" && (
          <div className="w-full h-20 relative p-2 bg-slate-950/50 rounded-xl border border-white/5 font-mono text-[9px] text-violet-300/80 flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center text-violet-400 border-b border-violet-500/20 pb-1">
              <span>UDID: 8829-X01</span>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
            </div>
            <div className="grid grid-cols-3 gap-1 opacity-80">
              <span className="bg-violet-950/60 p-1 rounded text-[8px]">ACT: 2016</span>
              <span className="bg-violet-950/60 p-1 rounded text-[8px]">SEC: 24-A</span>
              <span className="bg-violet-950/60 p-1 rounded text-[8px]">99% MATCH</span>
            </div>
            <div className="w-full bg-violet-500/15 h-1.5 rounded-full overflow-hidden">
              <div className="bg-violet-400 h-full w-4/5 rounded-full shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            </div>
          </div>
        )}
        {card.wireframeType === "radar" && (
          <div className="w-full h-20 relative flex items-center justify-around px-3 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden">
            <div className="w-10 h-10 rounded-full border border-indigo-500/40 flex items-center justify-center relative">
              <div className="w-7 h-7 rounded-full border border-cyan-400/50" />
              <span className="text-sm absolute">{card.icon}</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400">Status</span>
              <span className="text-xs font-semibold text-white tracking-wide">{card.badge}</span>
              <span className="text-[8.5px] font-mono text-indigo-300">SIH-26093 Matrix</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Title & Stat */}
      <div className="relative z-10 space-y-1">
        <h3 className="text-sm font-semibold text-white tracking-wide leading-tight">
          {card.title}
        </h3>
        <p className="text-[11px] text-slate-300/70 leading-normal line-clamp-1">
          {card.subtitle}
        </p>
        <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
          <span className="text-[9.5px] font-mono text-slate-400">{card.statLabel}</span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {card.stat}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`curved-carousel-stage absolute inset-0 overflow-hidden z-[1] flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%"
      }}
      aria-hidden="true"
    >
      {/* Autonomous Continuous Constant-Speed 3D Rotating Ring (Zero Cursor Interception) */}
      <div
        className="curved-carousel-cylinder relative w-0 h-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          animation: `revolveCylinder ${durationSeconds}s linear infinite`,
          willChange: "transform"
        }}
      >
        {cards.map((card, i) => {
          const cardAngle = i * angleStep;
          return (
            <div
              key={card.id}
              className="carousel-card-wrap absolute top-1/2 left-1/2 pointer-events-none"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                marginLeft: `-${cardWidth / 2}px`,
                marginTop: `-${cardHeight / 2}px`,
                transformStyle: "preserve-3d",
                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`
              }}
            >
              {/* Front Face (Facing Outward) */}
              <div
                className="carousel-3d-card absolute inset-0 rounded-2xl p-4 flex flex-col justify-between overflow-hidden border border-indigo-400/30 bg-slate-900/65 backdrop-blur-md shadow-[0_0_40px_rgba(99,102,241,0.22)] pointer-events-none"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                {renderCardContent(card)}
              </div>

              {/* Back Face (Facing Inward at Center-Depth, Upright & Non-Mirrored) */}
              <div
                className="carousel-3d-card absolute inset-0 rounded-2xl p-4 flex flex-col justify-between overflow-hidden border border-indigo-400/30 bg-slate-900/65 backdrop-blur-md shadow-[0_0_40px_rgba(99,102,241,0.22)] pointer-events-none"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                {renderCardContent(card)}
              </div>

              {/* Minimalist Monospace Index Underneath in 3D Space (Both Front and Back) */}
              <div
                className="carousel-card-tag absolute top-full left-0 right-0 text-center mt-3 text-xs font-mono tracking-widest text-indigo-300/80 whitespace-nowrap pointer-events-none"
                style={{
                  transform: "translateZ(10px)",
                  textShadow: "0 0 12px rgba(129,140,248,0.5)",
                  backfaceVisibility: "hidden"
                }}
              >
                {card.indexTag}
              </div>
              <div
                className="carousel-card-tag absolute top-full left-0 right-0 text-center mt-3 text-xs font-mono tracking-widest text-indigo-300/80 whitespace-nowrap pointer-events-none"
                style={{
                  transform: "rotateY(180deg) translateZ(10px)",
                  textShadow: "0 0 12px rgba(129,140,248,0.5)",
                  backfaceVisibility: "hidden"
                }}
              >
                {card.indexTag}
              </div>
            </div>
          );
        })}
      </div>

      {/* Radial Vignette & Center Depth Mask (Keeps Hero Text Ultra-Legible) */}
      <div
        className="carousel-depth-mask absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(9,10,15,0.72) 18%, rgba(9,10,15,0.25) 58%, rgba(9,10,15,0.92) 100%)"
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default CurvedBackgroundCarousel;
