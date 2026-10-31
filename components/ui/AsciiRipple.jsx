'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';
import './AsciiRipple.css';

const DEFAULT_TEXT =
  'Low tide leaves the rock shelf glazed and quiet, and the pools that remain are small enough to hold in one long look. A shrimp no bigger than a comma drifts above the sand, its shadow arriving a moment before it does. The surface is a second sky. Cloud passes through it, then a gull, then the tremble of my own breath as I lean too close. Nothing here is still, only slow. Anemones open with the patience of clocks. Weed lifts and settles as though the water were remembering a wave it once carried farther up the shore. When a drop falls from my sleeve the whole pool answers at once, rings running outward until they meet the stone and come back folded over themselves, smaller, quieter, braided into a pattern that was never quite round. Light bends through the moving glass and the sand below it wavers, letters on a page read through tears. I count the returns. Four, five, then the surface forgets and the sky is whole again. Farther out the real sea keeps its own time, heavy and unhurried, sending the same news up the channel it has always sent. The pool listens. It repeats every word in a smaller voice, and then, when it is sure no one is watching, it goes back to being a mirror.';

const DEFAULT_CHARS = '·.,:;-~=+*%#@';
const STEP_DT = 1 / 90;

const hash = (x, y, seed) => {
  const val = 43758.5453 * Math.sin(127.1 * x + 311.7 * y + 74.7 * seed);
  return val - Math.floor(val);
};

const clamp01 = val => (val < 0 ? 0 : val > 1 ? 1 : val);

const parseColor = color => {
  if (typeof document === 'undefined') return [255, 255, 255, 1];
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [255, 255, 255, 1];
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2], data[3] / 255];
};

const lerpColor = (c1, c2, t) => {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  const a = (c1[3] + (c2[3] - c1[3]) * t).toFixed(3);
  return `rgba(${r},${g},${b},${a})`;
};

const stepWave = (sim, speed, viscosity, damping, edges) => {
  const { w, h, prev, cur, next, mask } = sim;
  const c = 1 - damping;
  const h_coeff = speed + viscosity;
  let maxEnergy = 0;

  for (let y = 1; y < h - 1; y++) {
    const rowOffset = y * w;
    for (let x = 1; x < w - 1; x++) {
      const idx = rowOffset + x;
      const current = cur[idx];
      const laplacian = cur[idx - 1] + cur[idx + 1] + cur[idx - w] + cur[idx + w] - 4 * current;
      const val = 0.996 * current + (current - prev[idx]) * c * mask[idx] + h_coeff * laplacian;
      next[idx] = val;
      const absVal = val < 0 ? -val : val;
      if (absVal > maxEnergy) maxEnergy = absVal;
    }
  }

  if (edges === 'reflect') {
    for (let x = 0; x < w; x++) {
      next[x] = next[x + w];
      next[(h - 1) * w + x] = next[(h - 2) * w + x];
    }
    for (let y = 0; y < h; y++) {
      next[y * w] = next[y * w + 1];
      next[y * w + w - 1] = next[y * w + w - 2];
    }
  }

  sim.prev = cur;
  sim.cur = next;
  sim.next = prev;
  sim.energy = maxEnergy;
};

const calmWave = sim => {
  sim.cur.fill(0);
  sim.prev.fill(0);
  sim.next.fill(0);
  sim.energy = 0;
};

const addImpulse = (sim, x, y, radius, strength) => {
  const cellX = x / sim.cell + 1;
  const cellY = y / sim.cell + 1;
  const radCells = Math.max(1, radius / sim.cell);
  const minX = Math.max(1, Math.floor(cellX - radCells));
  const maxX = Math.min(sim.w - 2, Math.ceil(cellX + radCells));
  const minY = Math.max(1, Math.floor(cellY - radCells));
  const maxY = Math.min(sim.h - 2, Math.ceil(cellY + radCells));
  const invRadSq = 1 / (radCells * radCells);

  for (let cy = minY; cy <= maxY; cy++) {
    for (let cx = minX; cx <= maxX; cx++) {
      const dx = cx - cellX;
      const dy = cy - cellY;
      const distSq = 1 - (dx * dx + dy * dy) * invRadSq;
      if (distSq > 0) {
        sim.cur[cy * sim.w + cx] -= strength * distSq * distSq * (3 - 2 * distSq);
      }
    }
  }
  if (sim.energy < strength) sim.energy = strength;
};

const sampleField = (sim, x, y, out) => {
  const cellX = x / sim.cell + 1;
  const cellY = y / sim.cell + 1;
  const ix = Math.min(sim.w - 3, Math.max(1, Math.floor(cellX)));
  const iy = Math.min(sim.h - 3, Math.max(1, Math.floor(cellY)));
  const fx = clamp01(cellX - ix);
  const fy = clamp01(cellY - iy);

  const { w, cur } = sim;
  const idx = iy * w + ix;

  const top = cur[idx] + (cur[idx + 1] - cur[idx]) * fx;
  const bottom = cur[idx + w] + (cur[idx + w + 1] - cur[idx + w]) * fx;
  out[0] = top + (bottom - top) * fy;

  const gx1 = cur[idx + 1] - cur[idx - 1];
  const gx2 = cur[idx + w + 1] - cur[idx + w - 1];
  out[1] = (gx1 + (gx2 - gx1) * fy) * 0.5;

  const gy1 = cur[idx + w] - cur[idx - w];
  const gy2 = cur[idx + w + 1] - cur[idx - w + 1];
  out[2] = (gy1 + (gy2 - gy1) * fx) * 0.5;
};

const AsciiRipple = forwardRef(
  (
    {
      text = DEFAULT_TEXT,
      chars = DEFAULT_CHARS,
      fontSize = 16,
      lineHeight = 1.2,
      fontFamily = 'ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace',
      fontWeight = 400,
      textColor = '#f5f5f4',
      rippleColor = '#ffffff',
      troughColor = '#ad57ff',
      backgroundColor = 'transparent',
      textOpacity = 0.15,
      resolution = 3,
      speed = 0.55,
      damping = 0.045,
      viscosity = 0.4,
      edges = 'absorb',
      dropStrength = 1.2,
      dropRadius = 26,
      dragStrength = 0.3,
      dragRadius = 16,
      rain = 0,
      rainStrength = 0.6,
      sensitivity = 2.2,
      slopeGain = 1,
      refraction = 4,
      scramble = 1,
      scrambleSpeed = 90,
      dither = 0.5,
      vignette = 0.6,
      interactive = true,
      className = '',
      style = {},
      ...restProps
    },
    ref
  ) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const textGridRef = useRef(null);
    const simRef = useRef(null);
    const animFrameRef = useRef(0);
    const isRunningRef = useRef(false);
    const lastTimeRef = useRef(0);
    const simAccRef = useRef(0);
    const rainAccRef = useRef(0);
    const sampleVecRef = useRef(new Float32Array(3));
    const reducedMotionRef = useRef(false);
    const loopCallbackRef = useRef(() => {});
    const pointerRef = useRef({
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      inside: false,
      pending: false
    });

    const fontStyle = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const colorRamps = useMemo(() => {
      const baseC = parseColor(textColor);
      const ripC = parseColor(rippleColor);
      const trgC = parseColor(troughColor);
      const up = [];
      const down = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        up.push(lerpColor(baseC, ripC, t));
        down.push(lerpColor(baseC, trgC, t));
      }
      return { up, down };
    }, [textColor, rippleColor, troughColor]);

    const config = {
      chars,
      font: fontStyle,
      speed,
      damping,
      viscosity,
      edges,
      dropStrength,
      dropRadius,
      dragStrength,
      dragRadius,
      rain,
      rainStrength,
      sensitivity,
      slopeGain,
      refraction,
      scramble,
      scrambleSpeed,
      dither,
      vignette,
      textOpacity,
      resolution,
      interactive,
      backgroundColor,
      ramps: colorRamps
    };

    const configRef = useRef(config);
    useEffect(() => {
      configRef.current = config;
    });

    const renderFrame = useCallback(
      time => {
        const canvas = canvasRef.current;
        const grid = textGridRef.current;
        const sim = simRef.current;
        if (!canvas || !grid || !sim) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cfg = configRef.current;
        const { cols, rows, charW, lineH, base } = grid;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const dpr = canvas.width / Math.max(1, width);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, width, height);
        ctx.font = cfg.font;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';

        const glyphs = cfg.chars.length ? cfg.chars : DEFAULT_CHARS;
        const glyphLen = glyphs.length;
        const hasEnergy = sim.energy > 0.0015;
        const scrambleSeed = Math.floor(time / Math.max(16, cfg.scrambleSpeed));
        const sampleOut = sampleVecRef.current;
        const res = cfg.resolution;
        const displaced = [];

        ctx.globalAlpha = cfg.textOpacity;
        ctx.fillStyle = cfg.ramps.up[0];

        for (let row = 0; row < rows; row++) {
          const rowChars = base[row];
          const centerY = row * lineH + lineH / 2;
          let staticStr = '';

          if (hasEnergy) {
            for (let col = 0; col < cols; col++) {
              sampleField(sim, col * charW + charW / 2, centerY, sampleOut);
              const heightVal = sampleOut[0];
              const slopeX = sampleOut[1] * res;
              const slopeY = sampleOut[2] * res;
              const slopeMag = Math.sqrt(slopeX * slopeX + slopeY * slopeY);
              const intensity = clamp01(
                (Math.abs(heightVal) * cfg.sensitivity + slopeMag * cfg.slopeGain - 0.12) * 1.14
              );

              if (intensity < 0.02) {
                staticStr += rowChars[col];
                continue;
              }

              const targetCol = Math.min(
                cols - 1,
                Math.max(0, Math.round(col + slopeX * cfg.refraction * 2))
              );
              const targetRow = Math.min(
                rows - 1,
                Math.max(0, Math.round(row + slopeY * cfg.refraction))
              );
              let ch = base[targetRow][targetCol];

              const threshold = 0.5 + (hash(col, row, 0) - 0.5) * cfg.dither;
              if (intensity * cfg.scramble >= threshold) {
                const jitter = (hash(col, row, scrambleSeed) - 0.5) * glyphLen * 0.3;
                const glyphIdx = Math.max(
                  0,
                  Math.min(glyphLen - 1, Math.round(intensity * (glyphLen - 1) + jitter))
                );
                ch = glyphs[glyphIdx];
              }

              if (ch === ' ') {
                staticStr += ' ';
                continue;
              }

              const ramp = heightVal >= 0 ? cfg.ramps.up : cfg.ramps.down;
              displaced.push({
                x: col * charW,
                y: centerY,
                ch,
                color: ramp[Math.round(24 * intensity)]
              });
              staticStr += ' ';
            }
          } else {
            staticStr = rowChars.join('');
          }

          ctx.fillText(staticStr, 0, centerY);
        }

        if (displaced.length) {
          ctx.globalAlpha = 1;
          let activeColor = '';
          for (let i = 0; i < displaced.length; i++) {
            const item = displaced[i];
            if (item.color !== activeColor) {
              ctx.fillStyle = item.color;
              activeColor = item.color;
            }
            ctx.fillText(item.ch, item.x, item.y);
          }
        }

        // Vignette fade at container boundaries
        if (cfg.vignette > 0) {
          ctx.globalAlpha = 1;
          const vSize = clamp01(cfg.vignette) * (Math.min(width, height) / 2);
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';

          const drawGrad = (x0, y0, x1, y1) => {
            const grad = ctx.createLinearGradient(x0, y0, x1, y1);
            grad.addColorStop(0, 'rgba(0,0,0,1)');
            grad.addColorStop(0.3, 'rgba(0,0,0,0.6)');
            grad.addColorStop(0.7, 'rgba(0,0,0,0.15)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
          };

          drawGrad(0, 0, vSize, 0);
          drawGrad(width, 0, width - vSize, 0);
          drawGrad(0, 0, 0, vSize);
          drawGrad(0, height, 0, height - vSize);
          ctx.restore();
        }

        // Background color
        if (cfg.backgroundColor && cfg.backgroundColor !== 'transparent') {
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = cfg.backgroundColor;
          ctx.fillRect(0, 0, width, height);
          ctx.globalCompositeOperation = 'source-over';
        }
      },
      []
    );

    const stopLoop = useCallback(() => {
      isRunningRef.current = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = 0;
    }, []);

    const tick = useCallback(
      time => {
        const sim = simRef.current;
        const grid = textGridRef.current;
        if (!sim || !grid) {
          isRunningRef.current = false;
          return;
        }

        const cfg = configRef.current;
        const dt = Math.min(0.1, (time - lastTimeRef.current) / 1000 || 0);
        lastTimeRef.current = time;

        const ptr = pointerRef.current;
        if (ptr.pending && cfg.interactive && cfg.dragStrength > 0) {
          const dx = ptr.x - ptr.lastX;
          const dy = ptr.y - ptr.lastY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.5) {
            const steps = Math.min(6, Math.max(1, Math.ceil(dist / cfg.dragRadius)));
            const str =
              (cfg.dragStrength * Math.min(1, dist / (1.5 * cfg.dragRadius))) / steps;
            for (let s = 1; s <= steps; s++) {
              const f = s / steps;
              addImpulse(sim, ptr.lastX + dx * f, ptr.lastY + dy * f, cfg.dragRadius, str);
            }
          }
          ptr.lastX = ptr.x;
          ptr.lastY = ptr.y;
          ptr.pending = false;
        }

        const isRaining = cfg.rain > 0 && !(ptr.inside && cfg.interactive);
        if (isRaining) {
          rainAccRef.current += dt * cfg.rain;
          while (rainAccRef.current >= 1) {
            rainAccRef.current -= 1;
            addImpulse(
              sim,
              Math.random() * grid.cols * grid.charW,
              Math.random() * grid.rows * grid.lineH,
              cfg.dropRadius * (0.6 + 0.6 * Math.random()),
              cfg.rainStrength * (0.6 + 0.8 * Math.random())
            );
          }
        } else {
          rainAccRef.current = 0;
        }

        const sSpeed = 0.02 + 0.4 * clamp01(cfg.speed);
        const sVisc = Math.min(0.49 - sSpeed, 0.12 * clamp01(cfg.viscosity));
        const sDamp = Math.min(0.5, Math.max(0, cfg.damping));

        simAccRef.current += dt;
        let subSteps = 0;
        while (simAccRef.current >= STEP_DT && subSteps < 4) {
          stepWave(sim, sSpeed, sVisc, sDamp, cfg.edges);
          simAccRef.current -= STEP_DT;
          subSteps++;
        }
        if (subSteps === 4) simAccRef.current = 0;

        if (sim.energy < 0.0015 && !isRaining) {
          calmWave(sim);
          renderFrame(time);
          isRunningRef.current = false;
          animFrameRef.current = 0;
          return;
        }

        renderFrame(time);
        animFrameRef.current = requestAnimationFrame(t => loopCallbackRef.current(t));
      },
      [renderFrame]
    );

    useEffect(() => {
      loopCallbackRef.current = tick;
    }, [tick]);

    const startLoop = useCallback(() => {
      if (isRunningRef.current || reducedMotionRef.current) return;
      isRunningRef.current = true;
      lastTimeRef.current = performance.now();
      simAccRef.current = 0;
      animFrameRef.current = requestAnimationFrame(t => loopCallbackRef.current(t));
    }, []);

    const resize = useCallback(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.font = fontStyle;
      const charWidth = ctx.measureText('M').width || 0.6 * fontSize;
      const rowHeight = fontSize * lineHeight;

      // Build grid matrix
      const cols = Math.max(1, Math.ceil(w / charWidth));
      const rows = Math.max(1, Math.ceil(h / rowHeight));
      const words = text.split(/\s+/).filter(Boolean);
      const base = [];
      let wordIdx = 0;

      for (let r = 0; r < rows; r++) {
        let line = '';
        while (line.length < cols && words.length) {
          if (line.length > 0) line += ' ';
          line += words[wordIdx % words.length];
          wordIdx++;
        }
        base.push(line.padEnd(cols, ' ').slice(0, cols).split(''));
      }

      textGridRef.current = {
        cols,
        rows,
        charW: charWidth,
        lineH: rowHeight,
        base
      };

      // Simulation cell dimensions
      const cell = rowHeight / Math.max(1, Math.min(4, resolution));
      const simW = Math.max(4, Math.ceil(w / cell) + 2);
      const simH = Math.max(4, Math.ceil(h / cell) + 2);
      const len = simW * simH;
      const mask = new Float32Array(len);
      const absorbMargin = edges === 'absorb' ? Math.max(3, Math.round(0.08 * Math.min(simW, simH))) : 0;

      for (let y = 0; y < simH; y++) {
        for (let x = 0; x < simW; x++) {
          let m = 1;
          if (absorbMargin > 0) {
            const d = Math.min(x, y, simW - 1 - x, simH - 1 - y);
            if (d < absorbMargin) {
              const f = d / absorbMargin;
              m = 1 - (1 - f) * (1 - f) * 0.22;
            }
          }
          mask[y * simW + x] = m;
        }
      }

      simRef.current = {
        w: simW,
        h: simH,
        cell,
        prev: new Float32Array(len),
        cur: new Float32Array(len),
        next: new Float32Array(len),
        mask,
        energy: 0
      };

      renderFrame(performance.now());
      if (rain > 0) startLoop();
    }, [renderFrame, fontStyle, fontSize, lineHeight, text, resolution, edges, rain, startLoop]);

    useEffect(() => {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMotion = () => {
        reducedMotionRef.current = media.matches;
        if (media.matches) {
          stopLoop();
          if (simRef.current) calmWave(simRef.current);
          renderFrame(performance.now());
        }
      };
      handleMotion();
      media.addEventListener('change', handleMotion);
      return () => media.removeEventListener('change', handleMotion);
    }, [renderFrame, stopLoop]);

    useEffect(() => {
      let isCancelled = false;
      const fontPromise =
        typeof document !== 'undefined' && document.fonts?.ready
          ? Promise.race([document.fonts.ready, new Promise(res => setTimeout(res, 1500))])
          : Promise.resolve();

      fontPromise.then(() => {
        if (!isCancelled) resize();
      });

      const container = containerRef.current;
      const observer = new ResizeObserver(() => resize());
      if (container) observer.observe(container);

      return () => {
        isCancelled = true;
        observer.disconnect();
      };
    }, [resize]);

    useEffect(() => {
      renderFrame(performance.now());
    }, [colorRamps, chars, textOpacity, vignette, backgroundColor, renderFrame]);

    useEffect(() => () => stopLoop(), [stopLoop]);

    const getPos = e => {
      const container = containerRef.current;
      if (!container) return null;
      const rect = container.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    useImperativeHandle(
      ref,
      () => ({
        drop: (x, y, strength = dropStrength, radius = dropRadius) => {
          const sim = simRef.current;
          if (sim && !reducedMotionRef.current) {
            addImpulse(sim, x, y, radius, strength);
            startLoop();
          }
        },
        calm: () => {
          const sim = simRef.current;
          if (sim) {
            calmWave(sim);
            renderFrame(performance.now());
          }
        }
      }),
      [dropStrength, dropRadius, startLoop, renderFrame]
    );

    return (
      <div
        ref={containerRef}
        className={`ascii-ripple ${className}`}
        style={style}
        onPointerMove={e => {
          if (!interactive || reducedMotionRef.current) return;
          const pos = getPos(e);
          if (!pos) return;
          const ptr = pointerRef.current;
          if (!ptr.inside) {
            ptr.lastX = pos.x;
            ptr.lastY = pos.y;
            ptr.inside = true;
          }
          ptr.x = pos.x;
          ptr.y = pos.y;
          ptr.pending = true;
          startLoop();
        }}
        onPointerLeave={() => {
          pointerRef.current.inside = false;
          pointerRef.current.pending = false;
          if (rain > 0) startLoop();
        }}
        onPointerDown={e => {
          if (!interactive || reducedMotionRef.current) return;
          const pos = getPos(e);
          const sim = simRef.current;
          if (!pos || !sim) return;
          addImpulse(sim, pos.x, pos.y, dropRadius, dropStrength);
          const ptr = pointerRef.current;
          ptr.x = ptr.lastX = pos.x;
          ptr.y = ptr.lastY = pos.y;
          ptr.inside = true;
          startLoop();
        }}
        {...restProps}
      >
        <canvas ref={canvasRef} className="ascii-ripple-canvas" aria-hidden="true" />
      </div>
    );
  }
);

AsciiRipple.displayName = 'AsciiRipple';

export default AsciiRipple;
