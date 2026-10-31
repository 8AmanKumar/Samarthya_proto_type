import React from 'react';
import HoverCarousel from './HoverCarousel';

export default function MissionSection() {
  const missionPillars = [
    {
      icon: '⚖️',
      badge: 'RPwD ACT 2016',
      title: 'Statutory Framework & Rights',
      shortTitle: 'Statutory Rights',
      desc: 'Comprehensive rule evaluation based on the Rights of Persons with Disabilities Act 2016 and MoSJE central directives. Transparent score-based eligibility that eliminates subjective gatekeeping.',
      color: '#38BDF8',
      bgColor: 'rgba(56, 189, 248, 0.15)',
      tag: 'MoSJE Statutory Norms'
    },
    {
      icon: '🛡️',
      badge: 'DPDP ACT 2023',
      title: 'Client-Side Privacy Architecture',
      shortTitle: 'DPDP Privacy',
      desc: 'Zero central document retention. All criteria evaluation, rule scoring, and income bracket evaluations run purely on your local device without sending identity papers to cloud databases.',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      tag: 'Zero Cloud Retention'
    },
    {
      icon: '💼',
      badge: 'NSFDC CHANNEL CREDIT',
      title: 'Concessional Micro-Finance',
      shortTitle: 'Subsidized Credit',
      desc: 'Direct institutional channel access to NSFDC, NBCFDC, and NSKFDC state credit desks, bridging young divyang and scheduled caste entrepreneurs with subsidized low-interest capital.',
      color: '#818CF8',
      bgColor: 'rgba(99, 102, 241, 0.15)',
      tag: 'Direct State Desk'
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-[#090a0f] text-white flex flex-col items-center justify-center overflow-hidden" id="section-02">
      <div className="max-w-6xl w-full mx-auto">
        <div className="rb-mission-split">
          {/* Left Column: Big Heading & Narrative */}
          <div className="rb-mission-left">
            <span className="text-xs font-semibold tracking-widest text-sky-400 uppercase mb-3 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              02 // WEBSITE DETAIL & MISSION
            </span>
            <h2 className="rb-mission-headline">
              Bridging Entitlements with <span className="rb-gradient-text">Intelligent Guidance</span>
            </h2>
            <p className="rb-mission-lead">
              Solving the last-mile delivery crisis for welfare schemes and concessional channel credit across India through zero-document client privacy, statutory scorecards, and sub-second rule evaluation.
            </p>

            {/* Metrics Grid */}
            <div className="rb-mission-metrics">
              <div className="rb-mission-metric-item">
                <span className="rb-metric-num">50+</span>
                <span className="rb-metric-lbl">Central & State Schemes</span>
              </div>
              <div className="rb-mission-metric-item">
                <span className="rb-metric-num">&lt; 2.0s</span>
                <span className="rb-metric-lbl">Rule Latency</span>
              </div>
              <div className="rb-mission-metric-item">
                <span className="rb-metric-num">100%</span>
                <span className="rb-metric-lbl">DPDP Device Private</span>
              </div>
              <div className="rb-mission-metric-item">
                <span className="rb-metric-num">4.0%</span>
                <span className="rb-metric-lbl">Subsidized Floor APR</span>
              </div>
            </div>

            <div className="rb-carousel-cue">
              <span className="rb-cue-pulse" />
              <span>Hover over cards to expand statutory pillars →</span>
            </div>
          </div>

          {/* Right Column: Hover Carousel */}
          <div className="rb-mission-right">
            <HoverCarousel items={missionPillars} />
          </div>
        </div>
      </div>
    </section>
  );
}
