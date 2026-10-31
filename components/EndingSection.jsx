import React, { useRef } from 'react';
import AsciiRipple from './AsciiRipple';

export default function EndingSection() {
  const rippleRef = useRef(null);

  const officialPortals = [
    {
      icon: '🏛️',
      name: 'National Scholarship Portal',
      url: 'scholarships.gov.in',
      link: 'https://scholarships.gov.in',
      tag: 'Official NSP Gateway'
    },
    {
      icon: '♿',
      name: 'Swavlamban Card (UDID)',
      url: 'swavlambancard.gov.in',
      link: 'https://www.swavlambancard.gov.in',
      tag: 'Apply for UDID'
    },
    {
      icon: '💼',
      name: 'NSFDC Official Portal',
      url: 'nsfdc.nic.in',
      link: 'https://nsfdc.nic.in',
      tag: 'Channel Credit Portal'
    },
    {
      icon: '🦽',
      name: 'ALIMCO Assistive Devices',
      url: 'alimco.in',
      link: 'https://alimco.in',
      tag: 'ADIP Equipment Desk'
    }
  ];

  const missionText =
    'SAMARTHYA AI • STATUTORY WELFARE & CONCESSIONAL CREDIT INTELLIGENCE • ZERO MIDDLEMEN • DPDP ACT 2023 COMPLIANT • 100% DIRECT BENEFICIARY DELIVERY • PRIVACY PRESERVING CLIENT EVALUATION • EMPOWERING CITIZENS ACROSS ALL 28 STATES & 8 UNION TERRITORIES • SUB-SECOND MATCHING ENGINE • DISABILITY CERTIFICATION • SCHOLARSHIPS • MICRO-ENTERPRISE LOANS • ALIMCO ASSISTIVE GEAR • OFFICIAL NATIONAL APIS • EMPOWERING EVERY CITIZEN';

  return (
    <section className="relative py-24 px-6 bg-[#090a0f] text-white flex flex-col items-center justify-center overflow-hidden" id="section-06">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
            06 // ENDING & OFFICIAL PORTALS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2 mb-3">
            Official Government Gateways & Support
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Direct institutional application links and grievance channels for verified central and state welfare schemes.
          </p>
        </div>

        {/* Official Portal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {officialPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl">{portal.icon}</span>
                <h3 className="text-base font-bold text-white mt-3">{portal.name}</h3>
                <span className="text-xs text-slate-500">{portal.url}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-sky-400 font-medium">
                <span>{portal.tag}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* React Bits Pro ASCII Ripple - Blended Seamlessly with Background */}
        <div className="relative w-full h-[340px] my-10 overflow-hidden [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,#000_35%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,#000_35%,transparent_100%)]">
          <AsciiRipple
            ref={rippleRef}
            text={missionText}
            fontSize={15}
            lineHeight={1.22}
            textColor="#94a3b8"
            rippleColor="#38bdf8"
            troughColor="#818cf8"
            backgroundColor="transparent"
            textOpacity={0.20}
            rain={0.5}
            dragStrength={0.32}
            dropStrength={1.3}
            refraction={4}
            vignette={0.8}
            className="w-full h-full"
          />
        </div>

        {/* Final CTA Card */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/40 border border-sky-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to check your eligible schemes?</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zero paperwork required for initial evaluation. Complete your criteria intake in under 60 seconds and access verified direct entitlements.
            </p>
          </div>
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-sky-500/25 hover:scale-105 transition-all text-sm whitespace-nowrap"
          >
            Get Started Now →
          </button>
        </div>
      </div>
    </section>
  );
}
