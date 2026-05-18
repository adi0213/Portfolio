/**
 * SplinePet — Floating interactive 3D companion
 * Powered by the real Spline scene — full colors, animations & pointer tracking.
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplineScene } from '@/components/SplineScene';

const SPLINE_URL = 'https://prod.spline.design/ma8rlpgNrwSmU9OA/scene.splinecode';

/** Clear the Spline renderer + scene background so it's fully transparent */
function clearSplineBackground(app: any) {
  try {
    // THREE.WebGLRenderer
    const renderer = app?._renderer ?? app?.renderer;
    if (renderer) {
      renderer.setClearColor(0x000000, 0);
      renderer.setClearAlpha(0);
    }
    // THREE.Scene background
    const scene = app?._scene ?? app?.scene;
    if (scene) scene.background = null;

    // Also scrub the canvas CSS background
    const canvas = app?.canvas ?? renderer?.domElement;
    if (canvas) canvas.style.background = 'transparent';
  } catch (_) { /* ignore */ }
}

export default function SplinePet() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Skip on touch/mobile — no 3D widget on phones
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!visible || !wrapRef.current) return;

    gsap.fromTo(
      wrapRef.current,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.55)' }
    );

    const float = gsap.to(wrapRef.current, {
      y: '-=10',
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });

    return () => { float.kill(); };
  }, [visible]);

  // Bounce on toggle
  useEffect(() => {
    if (!visible || !wrapRef.current) return;
    gsap.fromTo(wrapRef.current, { scale: 0.9 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  }, [expanded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  const SIZE = expanded ? 300 : 120;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200, userSelect: 'none' }}>

      {/* ── Collapsed decorations ─────────────────────── */}
      {!expanded && (
        <>
          {/* Tooltip */}
          <div style={{
            position: 'absolute', bottom: '100%', left: '50%',
            transform: 'translateX(-50%)', marginBottom: '10px',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '10px',
              textTransform: 'uppercase', letterSpacing: '0.2em',
              padding: '4px 12px', borderRadius: '999px',
              background: 'rgba(201,54,28,0.12)', border: '1px solid rgba(201,54,28,0.35)',
              color: 'rgba(201,54,28,0.9)', backdropFilter: 'blur(10px)',
            }}>
              Click me!
            </span>
          </div>

          {/* Spinning conic border */}
          <div style={{
            position: 'absolute', inset: '-4px', borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0%, #C9361C 20%, transparent 40%, #7B61FF 60%, transparent 80%, #C9361C 100%)',
            animation: 'spin-border 3s linear infinite', zIndex: -1,
          }} />
          <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: '#0a0a0a', zIndex: -1 }} />

          {/* Pulse rings */}
          <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1px solid rgba(201,54,28,0.3)', animation: 'pulse-ring 2s ease-out infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: '-22px', borderRadius: '50%', border: '1px solid rgba(201,54,28,0.12)', animation: 'pulse-ring 2s ease-out infinite', animationDelay: '0.6s', pointerEvents: 'none' }} />

          {/* Radar sweep */}
          <div style={{ position: 'absolute', inset: '-3px', borderRadius: '50%', overflow: 'hidden', animation: 'spin-border 2.5s linear infinite', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'conic-gradient(from 0deg, rgba(201,54,28,0.35) 0deg, transparent 70deg)' }} />
          </div>

          {/* Orbit dot — red CW */}
          <div style={{ position: 'absolute', width: `${SIZE + 32}px`, height: `${SIZE + 32}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'orbit-cw 3s linear infinite', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '7px', height: '7px', borderRadius: '50%', background: '#C9361C', boxShadow: '0 0 8px #C9361C, 0 0 20px rgba(201,54,28,0.6)' }} />
          </div>
          {/* Orbit dot — purple CCW */}
          <div style={{ position: 'absolute', width: `${SIZE + 32}px`, height: `${SIZE + 32}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'orbit-ccw 3.8s linear infinite', animationDelay: '-1.2s', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '5px', height: '5px', borderRadius: '50%', background: '#7B61FF', boxShadow: '0 0 8px #7B61FF, 0 0 16px rgba(123,97,255,0.5)' }} />
          </div>
          {/* Orbit dot — cream CW slow */}
          <div style={{ position: 'absolute', width: `${SIZE + 32}px`, height: `${SIZE + 32}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'orbit-cw 4.6s linear infinite', animationDelay: '-2.4s', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#F2EBE0', boxShadow: '0 0 6px #F2EBE0' }} />
          </div>
        </>
      )}

      {/* ── Main container ─────────────────────────────── */}
      <div
        ref={wrapRef}
        onClick={() => setExpanded(v => !v)}
        style={{
          position: 'relative',
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          cursor: 'pointer',
          transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), height 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Inner glow */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: expanded ? '24px' : '50%',
          boxShadow: expanded
            ? '0 0 80px rgba(201,54,28,0.5), 0 0 160px rgba(201,54,28,0.2)'
            : '0 0 40px rgba(201,54,28,0.35), 0 0 80px rgba(201,54,28,0.12)',
          transition: 'box-shadow 0.5s ease, border-radius 0.5s ease',
          pointerEvents: 'none',
        }} />

        {/* Dark scene background + clip to shape */}
        <div style={{
          width: '100%', height: '100%',
          borderRadius: expanded ? '24px' : '50%',
          overflow: 'hidden', position: 'relative',
          background: 'transparent',
          transition: 'border-radius 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Real Spline scene — full animations, colors & pointer tracking, transparent bg */}
          <SplineScene
            scene={SPLINE_URL}
            className="w-full h-full"
            onSceneLoad={clearSplineBackground}
          />
        </div>

        {/* Close button */}
        {expanded && (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            style={{
              position: 'absolute', top: '8px', right: '8px',
              width: '28px', height: '28px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(10,10,10,0.8)', border: '1px solid rgba(242,235,224,0.15)',
              color: 'rgba(242,235,224,0.7)', fontSize: '14px',
              cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 30,
            }}
          >✕</button>
        )}

        {/* Live dot */}
        <div style={{
          position: 'absolute', bottom: expanded ? '8px' : '4px', right: expanded ? '8px' : '4px',
          width: '10px', height: '10px', borderRadius: '50%',
          background: '#22c55e', boxShadow: '0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.4)',
          animation: 'pulse-dot 2s ease-in-out infinite', zIndex: 30,
        }} />
      </div>

      {/* Label */}
      {expanded && (
        <div style={{ marginTop: '12px', textAlign: 'center', animation: 'fadeUp 0.4s ease forwards' }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(242,235,224,0.35)' }}>
            My 3D Companion
          </p>
        </div>
      )}
    </div>
  );
}
