import React, { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [lang, setLang] = useState('en');
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({});
  const [giantOffset, setGiantOffset] = useState({ x: 0, y: 0 });
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(4.0);
  const [tenureMonths, setTenureMonths] = useState(60);

  const containerRef = useRef(null);

  const content = {
    en: {
      brandTag: 'FINTECH STATUTORY',
      kicker: 'FINTECH STATUTORY EMPOWERMENT',
      line1: 'Tell us your situation.',
      line2Tail: 'Understand your options.',
      line3: 'Take the right next step.',
      subtitle: 'Intelligent Credit Access & Channel Partner Routing Platform',
      selectorLabel: 'SELECT OR EXPLORE YOUR PATHWAY:',
      ctaPrimary: 'Check Eligibility',
      ctaSecondary: 'EMI Calculator',
      trust: [
        { strong: '< 2s', label: 'Instant Match' },
        { strong: '50+', label: 'Central & State Schemes' },
        { strong: '4.0%', label: 'Subsidized APR' },
        { strong: '100%', label: 'DPDP Safe' }
      ],
      nav: {
        schemes: 'Schemes',
        emi: 'EMI Calculator',
        map: 'Partner Map',
        docs: 'Documents',
        btn: 'Check Eligibility'
      },
      scenarios: [
        { id: 'business', text: 'Starting an artisan micro-enterprise', icon: '💼', rate: '4.0% APR', scheme: 'NSFDC Term Loan' },
        { id: 'education', text: 'Financing higher & professional education', icon: '🎓', rate: '0% Interest Sub.', scheme: 'NHFDC Education Loan' },
        { id: 'assistive', text: 'Procuring assistive tech & adaptive aids', icon: '♿', rate: '100% Grant', scheme: 'ADIP Welfare Scheme' },
        { id: 'green', text: 'Solar micro-grid & electric rickshaw unit', icon: '⚡', rate: '5.0% APR', scheme: 'Green Business Scheme' }
      ]
    },
    hi: {
      brandTag: 'फिनटेक सांविधिक',
      kicker: 'सांविधिक वित्तीय सशक्तिकरण',
      line1: 'अपनी स्थिति बताएं.',
      line2Tail: 'अपने विकल्प समझें.',
      line3: 'सही अगला कदम उठाएं.',
      subtitle: 'इंटेलिजेंट क्रेडिट एक्सेस और चैनल पार्टनर रूटिंग प्लेटफ़ॉर्म',
      selectorLabel: 'अपनी स्थिति या योजना मार्ग चुनें:',
      ctaPrimary: 'पात्रता जांचें',
      ctaSecondary: 'ईएमआई कैलकुलेटर',
      trust: [
        { strong: '< 2 सेकंड', label: 'त्वरित मिलान' },
        { strong: '50+', label: 'केंद्रीय व राज्य योजनाएं' },
        { strong: '4.0%', label: 'रियायती ब्याज दर' },
        { strong: '100%', label: 'पूर्ण गोपनीयता' }
      ],
      nav: {
        schemes: 'योजनाएं',
        emi: 'ईएमआई कैलकुलेटर',
        map: 'पार्टनर मैप',
        docs: 'दस्तावेज़',
        btn: 'पात्रता जांचें'
      },
      scenarios: [
        { id: 'business', text: 'कारीगर सूक्ष्म उद्यम शुरू करना', icon: '💼', rate: '4.0% APR', scheme: 'NSFDC सावधि ऋण' },
        { id: 'education', text: 'उच्च एवं व्यावसायिक शिक्षा की फंडिंग', icon: '🎓', rate: '100% सब्सिडी', scheme: 'NHFDC शिक्षा ऋण' },
        { id: 'assistive', text: 'सहायक उपकरण व तकनीक अनुदान प्राप्त करना', icon: '♿', rate: '100% अनुदान', scheme: 'ADIP कल्याण योजना' },
        { id: 'green', text: 'सोलर यूनिट व ई-रिक्शा सूक्ष्म व्यवसाय', icon: '⚡', rate: '5.0% APR', scheme: 'हरित व्यवसाय योजना' }
      ]
    }
  };

  const t = content[lang];
  const activeScenario = t.scenarios[scenarioIdx] || t.scenarios[0];

  // Mouse tilt parallax calculation
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${-yPct * 6}deg) rotateY(${xPct * 8}deg)`
    });

    setGiantOffset({
      x: xPct * -18,
      y: yPct * -12
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    });
    setGiantOffset({ x: 0, y: 0 });
  };

  // Quick EMI calculation logic
  const r = (interestRate / 12) / 100;
  const n = tenureMonths;
  const emi = Math.round((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  const rComm = (14 / 12) / 100;
  const emiComm = Math.round((loanAmount * rComm * Math.pow(1 + rComm, n)) / (Math.pow(1 + rComm, n) - 1));
  const totalSavings = Math.round((emiComm * n) - (emi * n));

  return (
    <div className="relative w-full bg-[#0A0A0C] text-[#E2E8F0] overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      
      {/* ======================================================================
          TOP NAVIGATION
          - Left: "SAMARTHYA AI" + 3 glowing minimal geometric icons (Magenta circle, Teal triangle, Gold square)
          - Right: Language switcher ("English / हिंदी"), Links ("Schemes", "EMI Calculator", "Partner Map", "Documents"),
                   glowing magenta pill button "Check Eligibility"
          ====================================================================== */}
      <header className="fixed top-0 left-0 right-0 h-[76px] bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-6 lg:px-12 transition-all">
        {/* Left Brand Container */}
        <div className="flex items-center gap-4 select-none cursor-pointer">
          {/* Three Glowing Minimal Geometric Icons */}
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/[0.03] border border-white/10 rounded-full">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#FF007F] inline-block"
              style={{ boxShadow: '0 0 10px #FF007F, 0 0 18px rgba(255,0,127,0.65)' }}
            />
            <span
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[11px] border-b-[#00F0FF] inline-block"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.7))' }}
            />
            <span
              className="w-2.5 h-2.5 rounded-[1.5px] bg-[#FFB800] inline-block"
              style={{ boxShadow: '0 0 10px #FFB800, 0 0 16px rgba(255,184,0,0.6)' }}
            />
          </div>

          {/* Logo Title */}
          <div className="flex items-center gap-2">
            <span className="font-['Outfit'] font-black tracking-[0.14em] text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 uppercase">
              SAMARTHYA AI
            </span>
            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FF007F]/15 border border-[#FF007F]/40 text-[#FF66B2] uppercase hidden sm:inline-block">
              {t.brandTag}
            </span>
          </div>
        </div>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Language Switcher: "English / हिंदी" */}
          <div className="flex items-center bg-white/[0.04] border border-white/10 px-1.5 py-1 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white/15 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
            <span className="text-white/20 px-1 select-none">/</span>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === 'hi' ? 'bg-white/15 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              हिंदी
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#schemes" className="hover:text-white transition-colors">{t.nav.schemes}</a>
            <button onClick={() => setIsEmiModalOpen(true)} className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">
              {t.nav.emi}
            </button>
            <a href="#partner-map" className="hover:text-white transition-colors">{t.nav.map}</a>
            <a href="#documents" className="hover:text-white transition-colors">{t.nav.docs}</a>
          </nav>

          {/* Glowing Magenta Pill Button: "Check Eligibility" */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('page-match') || document.getElementById('section-02');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF007F] to-[#D8006E] text-white font-['Outfit'] font-bold text-sm tracking-wide border border-white/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              boxShadow: '0 0 24px rgba(255,0,127,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{t.nav.btn}</span>
          </button>
        </div>
      </header>

      {/* ======================================================================
          HERO STAGE: HIGH-CONTRAST FINTECH HERO SECTION
          ====================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden">
        
        {/* Ambient Radial Lighting Glows */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF007F]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-[#00F0FF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#FFB800]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Ambient Subtle Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        {/* GIANT BOLD GEOMETRIC SANS-SERIF WHITE TYPOGRAPHY (Behind figure) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-10"
          style={{
            transform: `translate(calc(-50% + ${giantOffset.x}px), calc(-50% + ${giantOffset.y}px))`
          }}
        >
          <span
            className="font-['Outfit'] font-black text-[clamp(4.2rem,12vw,13rem)] leading-none tracking-tight text-white/90 uppercase block"
            style={{
              textShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 120px rgba(255,0,127,0.18)'
            }}
          >
            SAMARTHYA AI
          </span>
        </div>

        {/* MAIN DUAL-COLUMN GRID */}
        <div className="relative z-20 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* MIDDLE-LEFT: FOREGROUND & STACKED TYPOGRAPHY */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow Badge with Geometric Triad */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121217]/90 border border-white/10 mb-6 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]" />
              <span className="font-['Inter'] text-[11px] font-bold tracking-widest text-slate-300 uppercase">
                {t.kicker}
              </span>
            </div>

            {/* Stacked Typography */}
            <h1 className="font-['Outfit'] font-extrabold text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.12] tracking-tight text-white mb-5 flex flex-col gap-2">
              <span>{t.line1}</span>
              
              <span className="flex flex-wrap items-baseline gap-2 text-slate-200">
                <span
                  onClick={() => setScenarioIdx((scenarioIdx + 1) % t.scenarios.length)}
                  className="inline-flex items-baseline border-b-2 border-[#00F0FF] shadow-[0_2px_10px_rgba(0,240,255,0.3)] pb-0.5 px-1 cursor-pointer hover:border-[#FF007F] transition-colors"
                  title="Click to cycle scenario"
                >
                  <span className="text-[#00F0FF] font-bold">{activeScenario.text}</span>
                  <span className="text-[#00F0FF] animate-pulse ml-0.5">|</span>
                </span>
                <span>{t.line2Tail}</span>
              </span>

              <span>
                <span
                  className="text-[#FF007F] font-black"
                  style={{
                    textShadow: '0 0 35px rgba(255,0,127,0.7), 0 0 70px rgba(255,0,127,0.35)'
                  }}
                >
                  {t.line3}
                </span>
              </span>
            </h1>

            {/* Subtle Subtitle Below */}
            <p className="font-['Inter'] text-slate-400 text-base lg:text-lg max-w-xl leading-relaxed mb-8">
              {t.subtitle}
            </p>

            {/* Interactive Situation Selector Chips */}
            <div className="flex flex-col gap-2.5 mb-8 w-full">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                {t.selectorLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {t.scenarios.map((sc, i) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setScenarioIdx(i)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                      i === scenarioIdx
                        ? 'bg-[#FF007F]/20 border border-[#FF007F] text-white shadow-[0_0_16px_rgba(255,0,127,0.4)]'
                        : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <span>{sc.icon}</span>
                    <span>{sc.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF007F] to-[#D8006E] text-white font-['Outfit'] font-bold text-base tracking-wide border border-white/30 shadow-[0_0_30px_rgba(255,0,127,0.55)] hover:scale-105 transition-all"
              >
                <span>{t.ctaPrimary}</span>
                <span>&rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEmiModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#121217]/80 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-sm hover:border-[#00F0FF] hover:text-white hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all"
              >
                <span>⚡</span>
                <span>{t.ctaSecondary}</span>
              </button>
            </div>

            {/* Micro-Trust Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-white/10 text-xs text-slate-400">
              {t.trust.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div>
                    <strong className="text-white font-semibold">{item.strong}</strong> {item.label}
                  </div>
                  {idx < t.trust.length - 1 && <span className="text-white/20">&bull;</span>}
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* CENTERPIECE: 3D PORTRAIT & HOLOGRAPHIC GATEWAY */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              className="relative w-full max-w-[500px] aspect-[1/1.05] flex items-center justify-center transition-transform duration-200 ease-out"
              style={tiltStyle}
            >
              {/* Outer Holographic Ambient Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF007F]/25 via-[#00F0FF]/15 to-transparent blur-3xl pointer-events-none" />

              {/* Holographic Gateway Rings */}
              <div
                className="absolute w-[90%] h-[94%] rounded-[50%_50%_46%_46%/60%_60%_40%_40%] border-[1.5px] border-[#00F0FF]/35 pointer-events-none animate-[spin_24s_linear_infinite]"
                style={{ boxShadow: '0 0 30px rgba(0,240,255,0.25), inset 0 0 30px rgba(255,0,127,0.2)' }}
              />
              <div
                className="absolute w-[78%] h-[82%] rounded-[50%_50%_46%_46%/60%_60%_40%_40%] border border-[#FF007F]/40 pointer-events-none animate-[spin_18s_linear_infinite_reverse]"
                style={{ boxShadow: '0 0 25px rgba(255,0,127,0.3)' }}
              />

              {/* Stylized 3D Portrait with Sharp Neon-Magenta Rim Lighting */}
              <div className="relative w-full h-full flex items-center justify-center z-20">
                <img
                  src="assets/hero/samarthya_hero_portrait.jpg"
                  alt="Empowered Indian entrepreneur and student illuminated in neon-magenta rim lighting before a holographic geometric gateway"
                  className="w-full h-full object-cover object-top rounded-3xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  style={{
                    maskImage: 'radial-gradient(ellipse 90% 90% at 50% 48%, black 65%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 48%, black 65%, transparent 98%)'
                  }}
                />
              </div>

              {/* Floating 3D Geometric Elements */}
              {/* 1. Neon Magenta Circle */}
              <div
                className="absolute top-[10%] right-[6%] w-10 h-10 rounded-full border-2 border-[#FF007F] bg-[#FF007F]/10 z-30 animate-bounce"
                style={{ boxShadow: '0 0 20px #FF007F, inset 0 0 10px rgba(255,0,127,0.6)' }}
              />

              {/* 2. Electric Teal Prism Triangle */}
              <div
                className="absolute top-[14%] left-[6%] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-[#00F0FF]/90 z-30 animate-pulse"
                style={{ filter: 'drop-shadow(0 0 16px rgba(0,240,255,0.7))' }}
              />

              {/* 3. Warm Gold Square */}
              <div
                className="absolute bottom-[20%] left-[2%] w-8 h-8 border-2 border-[#FFB800] bg-[#FFB800]/15 rotate-45 z-30"
                style={{ boxShadow: '0 0 18px rgba(255,184,0,0.65)' }}
              />

              {/* Floating Real-time Metric Chip */}
              <div className="absolute bottom-[10%] right-[2%] bg-[#121217]/90 backdrop-blur-md border border-[#FF007F]/40 px-4 py-3 rounded-2xl flex items-center gap-3 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,127,0.25)]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF007F]/20 to-[#00F0FF]/20 border border-white/20 flex items-center justify-center text-sm">
                  ⚡
                </div>
                <div className="flex flex-col">
                  <span className="font-['Outfit'] font-extrabold text-white text-base leading-none">
                    {activeScenario.rate}
                  </span>
                  <span className="font-['Inter'] text-[10px] font-semibold text-[#00F0FF] uppercase tracking-wider mt-1">
                    {activeScenario.scheme}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================================
          INTERACTIVE FINTECH EMI MODAL
          ====================================================================== */}
      {isEmiModalOpen && (
        <div className="fixed inset-0 bg-[#0A0A0C]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#121217] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,0,127,0.15)]">
            <button
              onClick={() => setIsEmiModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-[#FF007F]/20 hover:border-[#FF007F] flex items-center justify-center transition-colors"
            >
              &times;
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-['Outfit'] font-extrabold text-xl text-white">Statutory EMI Calculator</h3>
                <p className="text-xs text-slate-400">Subsidized state floor rates (4%-6%) vs Commercial banks (14%+)</p>
              </div>
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-300">Loan Amount</span>
                  <span className="font-bold text-[#00F0FF]">₹ {loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="25000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#FF007F]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-300">Statutory Rate (APR)</span>
                  <span className="font-bold text-[#FF007F]">{interestRate.toFixed(1)}% APR</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="8.0"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#00F0FF]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-300">Tenure</span>
                  <span className="font-bold text-[#FFB800]">{tenureMonths} Months ({(tenureMonths/12).toFixed(0)} Yrs)</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="12"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#FFB800]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Monthly Concessional EMI</span>
                <span className="font-['Outfit'] font-black text-2xl text-white">₹{emi.toLocaleString('en-IN')}/mo</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#00F0FF] mb-1">Savings vs 14% Loan</span>
                <span className="font-['Outfit'] font-black text-2xl text-[#FF007F]">₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEmiModalOpen(false)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF007F] to-[#D8006E] text-white font-['Outfit'] font-bold text-sm tracking-wide border border-white/30 shadow-[0_0_20px_rgba(255,0,127,0.5)]"
            >
              Apply for Subsidized Credit &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
