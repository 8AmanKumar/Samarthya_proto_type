import React from 'react';
import ScrollFloat from './ScrollFloat';

export default function WhyUsSection() {
  return (
    <section className="relative py-20 px-6 bg-[#090a0f] text-white flex flex-col items-center justify-center overflow-hidden" id="section-04">
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header with ScrollFloat */}
        <div className="mb-12 max-w-3xl">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            04 // WHY US
          </span>
          <ScrollFloat
            effect="float"
            splitBy="chars"
            direction="up"
            order="start"
            fromColor="currentColor"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            distance={120}
            stretch={2.3}
            smoothing={0}
            containerClassName="mt-2 mb-4"
            textClassName="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Privacy-First, Middleman-Free & Frictionless
          </ScrollFloat>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Why beneficiaries trust Samarthya: zero document storage, compliance standards, instant rule scoring, and direct application routes.
          </p>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-bold text-sky-400 uppercase">01 // PRIVACY GUARANTEE</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Zero Document Cloud Storage</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never hand over physical certificates or upload confidential Aadhaar cards. Our evaluation logic runs entirely within your client device.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase">02 // INTEGRITY SHIELD</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Eliminating Predatory Middlemen</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Third-party touts exploit vulnerable applicants by charging illegal 15–30% cuts. Samarthya delivers direct accredited institutional endpoints with 0% commission.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase">03 // REAL-TIME SCORING</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Sub-Second Algorithmic Matching</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Evaluates 50+ central and state schemes in under 2 seconds with exact reason codes, income threshold calculations, and required checklists.
            </p>
          </div>
        </div>

        {/* ScrollFloat Statement Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-900/80 to-indigo-950/40 border border-indigo-500/20 text-center">
          <span className="text-xs font-mono font-semibold tracking-widest text-sky-400 uppercase">
            STATUTORY COMMITMENT
          </span>
          <ScrollFloat
            effect="float"
            splitBy="chars"
            direction="up"
            order="start"
            fromColor="currentColor"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            distance={120}
            stretch={2.3}
            smoothing={0}
            containerClassName="my-3"
            textClassName="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300"
          >
            Sub-Second Evaluation • Zero Document Storage • 100% Direct Entitlements
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
}
