import React from 'react';
import ScrollFloat from './ScrollFloat';

/**
 * ScrollFloat Demo - Verbatim React Bits Usage Example
 */
export default function ScrollFloatDemo() {
  return (
    <div style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0b10', color: '#ffffff' }}>
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
      >
        React Bits
      </ScrollFloat>
    </div>
  );
}
