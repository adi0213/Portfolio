import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = ['BACKEND ENGINEER', 'IoT DEVELOPER', 'FLUTTER BUILDER', 'OPEN TO WORK'];

// Split text helper
function splitToChars(el: HTMLElement) {
  const text = el.textContent || '';
  el.textContent = '';
  el.setAttribute('aria-label', text);
  return text.split('').map((char) => {
    const span = document.createElement('span');
    span.className = 'split-char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
    return span;
  });
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headline chars
      const chars = headlineRef.current ? splitToChars(headlineRef.current) : [];

      // Main entrance TL
      const tl = gsap.timeline({ delay: 2.2 }); // after loader

      tl.from(chars, {
        y: 120,
        opacity: 0,
        rotateX: -80,
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
        transformOrigin: '0% 50%',
        transformPerspective: 900,
      })
      .from(lineRef.current, { scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left' }, '-=0.4')
      .from(subRef.current?.children || [], { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from(roleRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .from(ctaRef.current?.children || [], { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(portraitRef.current, { x: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '<0.3');

      // Bg text parallax on scroll
      gsap.to(bgTextRef.current, {
        y: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Portrait parallax
      gsap.to(portraitRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Role text cycler
      let roleIdx = 0;
      const cycleRole = () => {
        roleIdx = (roleIdx + 1) % roles.length;
        if (roleRef.current) {
          gsap.to(roleRef.current, {
            y: -10, opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete() {
              if (roleRef.current) roleRef.current.textContent = roles[roleIdx];
              gsap.to(roleRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
            }
          });
        }
      };
      const interval = setInterval(cycleRole, 2500);

      return () => clearInterval(interval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#0a0a0a] pt-24 pb-16"
    >
      {/* Background huge text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-start overflow-hidden select-none pointer-events-none"
        style={{ top: '-5%' }}
      >
        <span
          className="font-display font-black leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(8rem, 25vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(242,235,224,0.04)',
            letterSpacing: '-0.05em',
          }}
        >
          ADITH
        </span>
      </div>

      {/* Radial light bleed */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(201,54,28,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 md:px-16 flex flex-col lg:flex-row items-end justify-between gap-16">
        
        {/* Left — Content */}
        <div className="flex-1 flex flex-col gap-6 max-w-2xl">

          {/* Eye-brow */}
          <div ref={subRef} className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#C9361C] inline-block" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-[rgba(242,235,224,0.5)]">
              Trivandrum, Kerala · Available for work
            </span>
          </div>

          {/* Main headline */}
          <div className="overflow-hidden">
            <h1
              ref={headlineRef}
              className="font-display font-black text-[var(--cream)] leading-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}
            >
              Adith S
            </h1>
          </div>

          {/* Separator line */}
          <div ref={lineRef} className="w-full h-px bg-[rgba(242,235,224,0.12)]" />

          {/* Animated role */}
          <div ref={roleRef}
            className="font-body font-semibold text-[var(--primary-accent)] uppercase tracking-[0.15em] text-lg"
          >
            {roles[0]}
          </div>

          {/* CTA Row */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="magnetic-btn font-body font-semibold text-sm uppercase tracking-[0.1em] px-8 py-4 border border-[rgba(242,235,224,0.2)] rounded-full text-[var(--cream)] hover:border-[var(--primary-accent)] transition-colors"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="btn-fill" />
              <span className="relative z-10">Explore Work</span>
            </a>
            <a
              href="mailto:2005adith@gmail.com"
              className="font-body font-semibold text-sm uppercase tracking-[0.1em] px-8 py-4 bg-[var(--primary-accent)] rounded-full text-white hover:bg-[#a82a15] transition-colors"
            >
              Let's Talk
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-6 pt-2">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/adith0213' },
              { label: 'GitHub', href: 'https://github.com/adi0213' },
              { label: 'Email', href: 'mailto:2005adith@gmail.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="font-body text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--cream)] transition-colors border-b border-transparent hover:border-[var(--primary-accent)] pb-0.5"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile portrait — visible only on small screens */}
          <div className="lg:hidden mt-8 flex justify-center">
            <div
              className="relative overflow-hidden"
              style={{ width: '280px', height: '320px', borderRadius: '50% 50% 48% 52% / 60% 60% 40% 40%' }}
            >
              <img
                src="/hero-portrait.jpg"
                alt="Adith S"
                className="w-full h-full object-cover object-top"
                style={{ filter: 'grayscale(10%) contrast(1.05)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(201,54,28,0.35) 100%)' }} />
            </div>
          </div>
        </div>

        {/* Right — Spline 3D Scene (falls back to portrait if scene unavailable) */}
        <div ref={portraitRef} className="relative hidden lg:block flex-shrink-0">
          {/* 3D Scene Container — must have explicit size */}
          <div
            className="relative overflow-hidden"
            style={{ width: '480px', height: '580px', borderRadius: '50% 50% 48% 52% / 60% 60% 40% 40%' }}
          >
            {/* Portrait fallback — always visible underneath */}
            <img
              src="/hero-portrait.jpg"
              alt="Adith S"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(10%) contrast(1.05)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(201,54,28,0.35) 100%)' }} />

            {/* Spline 3D layer on top — replace URL with your own Spline export URL */}
            {/* To use: Export your scene from spline.design → Code → React, copy the URL below */}
            {/*
            <div className="absolute inset-0 z-10">
              <SplineScene
                scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            */}
          </div>

          {/* Floating tag */}
          <div className="absolute -bottom-4 -left-8 glass-card px-5 py-3 rounded-2xl z-10">
            <p className="font-body text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Status</p>
            <p className="font-body font-semibold text-sm text-[var(--cream)]">Available for Hire 🚀</p>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">Scroll</span>
        <div className="w-px h-12 bg-[var(--text-secondary)] relative overflow-hidden">
          <div
            className="absolute top-0 w-full bg-[var(--primary-accent)]"
            style={{
              height: '40%',
              animation: 'scrollLine 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
