import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  'FastAPI', 'Flutter', 'Python', 'IoT', 'ESP32', 'MQTT', 'MySQL', 'InfluxDB',
  'REST APIs', 'System Design', 'Penetration Testing', 'Secure API Design',
  'FastAPI', 'Flutter', 'Python', 'IoT', 'ESP32', 'MQTT', 'MySQL', 'InfluxDB',
  'REST APIs', 'System Design', 'Penetration Testing', 'Secure API Design',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headRef.current?.children || [], {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
      });

      // Animated line expand
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 1.2, ease: 'power3.out', transformOrigin: 'left',
        scrollTrigger: { trigger: lineRef.current, start: 'top 90%' }
      });

      // Columns slide
      gsap.from(col1Ref.current, {
        x: -50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: col1Ref.current, start: 'top 80%' }
      });
      gsap.from(col2Ref.current, {
        x: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: col2Ref.current, start: 'top 80%' }
      });

      // Count-up stats
      const counters = statsRef.current?.querySelectorAll('[data-count]');
      counters?.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count') || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          onUpdate() { el.textContent = Math.round(obj.val) + '+'; }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#0a0a0a] overflow-hidden">

      {/* ── PINNED NARRATIVE HEADER ── */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 pt-32 pb-20">
        <div ref={headRef} className="flex flex-col gap-3">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)]">Chapter 01 — Who I Am</span>
          <h2
            className="font-display font-black text-[var(--cream)] leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            The Story
          </h2>
        </div>

        <div ref={lineRef} className="w-full h-px bg-[rgba(242,235,224,0.08)] my-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Col 1 — Story text */}
          <div ref={col1Ref} className="flex flex-col gap-8">
            <p className="font-body text-[1.3rem] leading-relaxed font-light" style={{ color: 'rgba(242,235,224,0.8)' }}>
              I'm a <span className="text-[var(--cream)] font-semibold">B.Tech IT student</span> at GEC Barton Hill who decided that building things that actually <em>matter</em> was the only path worth taking.
            </p>
            <p className="font-body text-[1.1rem] leading-relaxed" style={{ color: 'rgba(242,235,224,0.55)' }}>
              From wiring up ESP32 sensors at 2 AM to optimizing FastAPI endpoints that need to handle thousands of requests — I've built systems that run in the real world: IoT energy monitors, disease surveillance networks, and mobility platforms.
            </p>
            <p className="font-body text-[1.1rem] leading-relaxed" style={{ color: 'rgba(242,235,224,0.55)' }}>
              As <span className="text-[var(--cream)]">former CFO of Nexforz Ressync</span>, I learned that the most powerful engineers don't just write code — they understand <em>why</em> it needs to exist.
            </p>

            {/* Achievements */}
            <div className="flex flex-col gap-3 pt-4 border-t border-[rgba(242,235,224,0.06)]">
              {[
                { year: '2025', label: 'Runner-Up — Define 3.0 Hackathon' },
                { year: '2026', label: 'Best Product Video — Dekathon' },
              ].map(a => (
                <div key={a.label} className="flex items-center gap-6">
                  <span className="font-body text-xs text-[var(--primary-accent)] font-semibold tracking-widest w-10">{a.year}</span>
                  <span className="font-body text-sm text-[rgba(242,235,224,0.7)]">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 — Stats + Certifications */}
          <div ref={col2Ref} className="flex flex-col gap-10">
            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {[
                { count: 4, label: 'Major Projects' },
                { count: 3, label: 'Certifications' },
                { count: 2, label: 'Hackathon Awards' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-2 p-6 border border-[rgba(242,235,224,0.06)] rounded-2xl hover:border-[var(--primary-accent)] transition-colors">
                  <span
                    data-count={s.count}
                    className="font-display font-bold text-[var(--cream)]"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                  >
                    0+
                  </span>
                  <span className="font-body text-xs text-[var(--text-secondary)] uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-col gap-3">
              <h3 className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[var(--primary-accent)] mb-2">Certified In</h3>
              {[
                { name: 'Certified Penetration Tester (CPT v3)', org: 'RedTeam Hacker Academy' },
                { name: 'Google AI Essentials', org: 'Coursera · Google' },
                { name: 'Generative AI with Vertex AI', org: 'Google Cloud' },
                { name: 'AWS APAC Solutions Architecture', org: 'Forage' },
              ].map((c) => (
                <div key={c.name} className="flex justify-between items-center py-3 border-b border-[rgba(242,235,224,0.05)] group">
                  <span className="font-body text-sm text-[rgba(242,235,224,0.75)] group-hover:text-[var(--cream)] transition-colors">{c.name}</span>
                  <span className="font-body text-xs text-[var(--text-secondary)] hidden md:block">{c.org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE STRIP ── */}
      <div className="py-8 border-y border-[rgba(242,235,224,0.06)] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap">
          <div className="marquee-track">
            {marqueeItems.map((item, i) => (
              <span key={i} className="font-display italic text-2xl font-bold text-[rgba(242,235,224,0.08)] hover:text-[rgba(201,54,28,0.5)] transition-colors shrink-0">
                {item} <span className="text-[var(--primary-accent)] not-italic font-normal">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
