import React from 'react';
import ScrollExpand from './ScrollExpand';

export default function BenefitsSection() {
  return (
    <section className="relative w-full bg-[#07090e] text-white overflow-hidden" id="section-03">
      {/* ScrollExpand Interactive Experience */}
      <ScrollExpand
        src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1600&auto=format&fit=crop&q=80"
        alt="Beneficiary Empowerment and Direct Welfare"
        title="Direct Entitlements & Financial Relief"
        scrollHint="Scroll to Expand Entitlements"
        useWindowScroll={true}
        startWidth={44}
        startHeight={56}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.0}
        holdDistance={0.3}
        overlayScrim={0.55}
      >
        <div className="max-w-4xl mx-auto px-6 py-8 text-center flex flex-col items-center">
          <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase mb-3">
            03 // STATUTORY ENTITLEMENTS & ARBITRAGE
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Subsidized Institutional Credit vs Commercial Market
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
            Eliminating predatory lending barriers through direct central channel credit: 4.0% floor interest, up to 33% capital subsidy, and 12-month incubation moratorium.
          </p>

          {/* Quick Rate Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
            <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-red-500/30">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Commercial Bank Lending</span>
              <div className="text-2xl font-bold text-white mt-2">12.5% – 16.0% p.a.</div>
              <p className="text-xs text-slate-400 mt-2">Requires real-estate collateral, 2 salaried guarantors, zero capital subsidy, and immediate month-1 EMI.</p>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-emerald-500/40">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Samarthya Concessional Channel</span>
              <div className="text-2xl font-bold text-emerald-300 mt-2">4.0% – 6.5% p.a.</div>
              <p className="text-xs text-slate-300 mt-2">Zero collateral under Credit Guarantee Fund, 33% capital subsidy deducted from principal, and up to 12 months moratorium.</p>
            </div>
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}
