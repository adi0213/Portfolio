import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: '01', title: 'System Design', detail: 'API architecture planning, database schema, and scalability blueprinting before a single line is written.' },
  { num: '02', title: 'IoT & Data Pipelines', detail: 'MQTT broker setup, ESP32 firmware, real-time streaming into InfluxDB or custom time-series stores.' },
  { num: '03', title: 'Backend Development', detail: 'Modular FastAPI services with JWT auth, async handlers, and clean separation of concerns.' },
  { num: '04', title: 'Security & Hardening', detail: 'Vulnerability assessment, penetration testing, and implementing secure API design patterns throughout.' },
  { num: '05', title: 'Optimization', detail: 'Profiling, API cost reduction, infrastructure right-sizing, and query performance tuning.' },
  { num: '06', title: 'Ship & Document', detail: 'Production deployment with thorough technical documentation, handoff, and ongoing system monitoring.' },
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headRef.current?.children || [], {
        y: 50, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
      });

      // Stagger rows with a left line growing
      const items = listRef.current?.querySelectorAll('.stage-item');
      items?.forEach((item) => {
        const line = item.querySelector('.stage-line');
        const content = item.querySelectorAll('.stage-content > *');

        gsap.from(line, {
          scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left',
          scrollTrigger: { trigger: item, start: 'top 85%' }
        });
        gsap.from(content, {
          y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workflow" className="relative py-32 overflow-hidden bg-[#070707]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div ref={headRef} className="flex flex-col gap-3 mb-20">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)]">Chapter 03 — How I Work</span>
          <h2
            className="font-display font-black text-[var(--cream)] leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            Process
          </h2>
        </div>

        {/* Stage list */}
        <div ref={listRef} className="flex flex-col">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="stage-item group border-t border-[rgba(242,235,224,0.06)] py-8 relative cursor-none"
            >
              <div className="stage-line absolute top-0 left-0 right-0 h-px bg-[var(--primary-accent)]" style={{ transform: 'scaleX(0)' }} />

              <div className="stage-content flex flex-col lg:grid lg:grid-cols-12 gap-3 lg:gap-6 lg:items-center">
                <span className="font-display font-bold text-3xl lg:text-4xl text-[rgba(242,235,224,0.1)] group-hover:text-[var(--primary-accent)] transition-colors duration-300 lg:col-span-1">
                  {stage.num}
                </span>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-[var(--cream)] lg:col-span-4">
                  {stage.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed lg:col-span-6 lg:max-w-xl">
                  {stage.detail}
                </p>
                <div className="hidden lg:flex lg:col-span-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-body text-[var(--primary-accent)] text-xl">↗</span>
                </div>
              </div>
            </div>
          ))}
          {/* Final line */}
          <div className="border-t border-[rgba(242,235,224,0.06)]" />
        </div>

      </div>
    </section>
  );
}
