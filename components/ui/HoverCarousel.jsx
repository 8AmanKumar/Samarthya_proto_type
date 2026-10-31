'use client';

import React, { useState, useEffect, useRef } from 'react';
import './HoverCarousel.css';

export default function HoverCarousel({ items, autoPlay = true, interval = 4800 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (!autoPlay || !items?.length) return;

    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveIndex(prev => (prev + 1) % items.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, items, interval]);

  return (
    <div
      className="rb-hover-carousel-wrapper"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div className="rb-hover-carousel">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              className={`rb-hover-card ${isActive ? 'is-active' : ''}`}
              style={{
                '--theme-color': item.color || '#38BDF8',
                '--theme-bg': item.bgColor || 'rgba(56, 189, 248, 0.12)'
              }}
              onPointerEnter={() => {
                isHoveredRef.current = true;
                setActiveIndex(idx);
              }}
              onClick={() => setActiveIndex(idx)}
            >
              <div className="rb-hover-card-bg" />
              <div className="rb-hover-card-content">
                <div className="rb-hover-card-top">
                  <div className="rb-pillar-icon">{item.icon}</div>
                  <span
                    className="rb-pillar-badge"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      background: `${item.color}18`
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="rb-hover-num">0{idx + 1}</span>
                </div>

                <div className="rb-hover-card-body">
                  <h3 className="rb-pillar-title">{item.title}</h3>
                  <p className="rb-pillar-desc">{item.desc}</p>
                </div>

                <div className="rb-hover-card-footer">
                  <span className="rb-hover-tag" style={{ color: item.color }}>
                    ✓ {item.tag || 'Verified Pillar'}
                  </span>
                  <span className="rb-hover-action">Pillar 0{idx + 1} →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nav dots */}
      <div className="rb-carousel-nav">
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={`rb-nav-dot ${activeIndex === idx ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(idx)}
          >
            <span className="rb-dot-bar" />
            <span>
              0{idx + 1} // {item.shortTitle || item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
