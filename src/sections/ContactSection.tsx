import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fill animation driven by scroll
      gsap.from(bgRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power4.out',
        transformOrigin: 'left',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });

      // Heading
      gsap.from(headRef.current?.children || [], {
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 80%' }
      });

      // Card
      gsap.from(cardRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
      });

      // Floating particle animation
      const particles = sectionRef.current?.querySelectorAll('.particle');
      particles?.forEach((p) => {
        gsap.to(p, {
          y: `${gsap.utils.random(-40, 40)}px`,
          x: `${gsap.utils.random(-20, 20)}px`,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 overflow-hidden bg-[#0a0a0a]">

      {/* Accent background slab */}
      <div
        ref={bgRef}
        className="absolute inset-x-8 md:inset-x-16 top-0 bottom-0 rounded-[3rem]"
        style={{ background: 'rgba(201,54,28,0.04)', transformOrigin: 'left' }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle absolute pointer-events-none rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: 'var(--primary-accent)',
            opacity: Math.random() * 0.4 + 0.1,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">

        {/* Header */}
        <div ref={headRef} className="flex flex-col gap-3 mb-20">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)]">Chapter 04 — The Beginning</span>
          <h2
            className="font-display font-black text-[var(--cream)] leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            Let's Build
          </h2>
        </div>

        {/* Main contact card */}
        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="flex flex-col gap-8">
            <p className="font-body text-2xl font-light leading-relaxed" style={{ color: 'rgba(242,235,224,0.7)' }}>
              Whether it's a scalable backend, an IoT system, or a product that needs a technical co-founder —
              <span className="text-[var(--cream)] font-normal"> I'm ready to build it with you.</span>
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:2005adith@gmail.com"
                className="group flex items-center gap-4 py-4 border-b border-[rgba(242,235,224,0.08)] hover:border-[var(--primary-accent)] transition-colors"
              >
                <span className="font-body text-xs uppercase tracking-widest text-[var(--primary-accent)] w-16">Email</span>
                <span className="font-body text-[var(--cream)] group-hover:underline underline-offset-4">2005adith@gmail.com</span>
                <span className="ml-auto text-[var(--text-secondary)] group-hover:text-[var(--primary-accent)] transition-colors">↗</span>
              </a>
              <a
                href="tel:+916282974781"
                className="group flex items-center gap-4 py-4 border-b border-[rgba(242,235,224,0.08)] hover:border-[var(--primary-accent)] transition-colors"
              >
                <span className="font-body text-xs uppercase tracking-widest text-[var(--primary-accent)] w-16">Phone</span>
                <span className="font-body text-[var(--cream)] group-hover:underline underline-offset-4">+91 6282 974 781</span>
                <span className="ml-auto text-[var(--text-secondary)] group-hover:text-[var(--primary-accent)] transition-colors">↗</span>
              </a>
              <a
                href="https://linkedin.com/in/adith0213"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 py-4 border-b border-[rgba(242,235,224,0.08)] hover:border-[var(--primary-accent)] transition-colors"
              >
                <span className="font-body text-xs uppercase tracking-widest text-[var(--primary-accent)] w-16">LinkedIn</span>
                <span className="font-body text-[var(--cream)] group-hover:underline underline-offset-4">/in/adith0213</span>
                <span className="ml-auto text-[var(--text-secondary)] group-hover:text-[var(--primary-accent)] transition-colors">↗</span>
              </a>
              <a
                href="https://github.com/adi0213"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 py-4 border-b border-[rgba(242,235,224,0.08)] hover:border-[var(--primary-accent)] transition-colors"
              >
                <span className="font-body text-xs uppercase tracking-widest text-[var(--primary-accent)] w-16">GitHub</span>
                <span className="font-body text-[var(--cream)] group-hover:underline underline-offset-4">@adi0213</span>
                <span className="ml-auto text-[var(--text-secondary)] group-hover:text-[var(--primary-accent)] transition-colors">↗</span>
              </a>
            </div>
          </div>

          {/* Right — QR codes + portrait */}
          <div className="flex flex-col items-center gap-10">
            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://linkedin.com/in/adith0213"
                    alt="LinkedIn QR"
                    className="w-full h-full"
                  />
                </div>
                <span className="font-body text-xs uppercase tracking-widest text-[var(--text-secondary)]">LinkedIn</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-2xl">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/adi0213"
                    alt="GitHub QR"
                    className="w-full h-full"
                  />
                </div>
                <span className="font-body text-xs uppercase tracking-widest text-[var(--text-secondary)]">GitHub</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-[rgba(242,235,224,0.06)] text-center max-w-xs">
              <p className="font-display italic text-[var(--cream)] text-xl mb-2">
                "Build things that matter."
              </p>
              <p className="font-body text-xs text-[var(--text-secondary)] uppercase tracking-widest">Adith S · Trivandrum, Kerala</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
