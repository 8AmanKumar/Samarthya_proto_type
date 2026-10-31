import React from 'react';
import BounceCards from './BounceCards';

export default function MissionSection() {
  // Samarthya Portal authentic welfare & accessibility visuals
  const welfareImages = [
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=480&h=480&fit=crop',
      alt: 'Student and Beneficiary Welfare',
      label: 'Student Welfare'
    },
    {
      src: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=480&h=480&fit=crop',
      alt: 'Community Welfare & ALIMCO Camps',
      label: 'Community Camps'
    },
    {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&h=480&fit=crop',
      alt: 'Digital Welfare Schemes & Entitlement Rules',
      label: 'Digital Schemes'
    },
    {
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=480&h=480&fit=crop',
      alt: 'Inclusive Assistive Technology',
      label: 'Inclusive Tech'
    }
  ];

  const handleCardClick = (index, card) => {
    console.log(`Card clicked: ${index}`, card);
    // Trigger scheme modal or navigation
    const targetSection = document.getElementById('section-05') || document.getElementById('section-03');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 px-6 bg-[#0a0b10] text-white flex flex-col items-center justify-center overflow-visible">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mb-12">
        <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
          02 // WEBSITE DETAIL & MISSION
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
          Bridging Entitlements with Intelligent Guidance
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Solving the last-mile delivery crisis for welfare schemes and concessional channel credit across India through zero-document privacy and sub-second evaluation.
        </p>
      </div>

      {/* BounceCards Interactive Container */}
      <div className="w-full flex items-center justify-center my-6">
        <BounceCards
          images={welfareImages}
          containerWidth={460}
          containerHeight={300}
          cardSize={180}
          spread={75}
          rotation={8}
          arc={-20} // Negative value arches the cards upwards cleanly
          pushDistance={140}
          hoverScale={1.05}
          bounciness={0.5}
          animationDelay={0.3}
          animationStagger={0.05}
          borderWidth={4}
          borderColor="#1e293b" // Deep slate border matches dark portal theme
          radius={20}
          shadow={true}
          enableHover={true}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Quick Info Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl w-full text-center">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xl font-bold text-indigo-400">50+</div>
          <div className="text-xs text-slate-400 mt-1">Verified Schemes</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xl font-bold text-teal-400">&lt; 2.0s</div>
          <div className="text-xs text-slate-400 mt-1">Rule Latency</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xl font-bold text-indigo-400">100%</div>
          <div className="text-xs text-slate-400 mt-1">DPDP Compliant</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xl font-bold text-teal-400">4.0%</div>
          <div className="text-xs text-slate-400 mt-1">Floor Interest</div>
        </div>
      </div>

    </section>
  );
}
