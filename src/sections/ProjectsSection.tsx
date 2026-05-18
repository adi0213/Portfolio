import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Smart Mobility Platform',
    sub: 'Bicycle Rental & Tracking',
    tech: ['FastAPI', 'Python', 'REST APIs', 'QR Auth'],
    desc: 'A complete backend ecosystem for bicycle rental — auth flows, ride sessions, real-time GPS tracking, and QR-based secure unlocking via RESTful APIs.',
    color: '#C9361C',
    image: '/images/bicycle_rental_project.png',
  },
  {
    id: '02',
    title: 'AI Disease Alert System',
    sub: 'Outbreak Detection & Chatbot',
    tech: ['AI/ML', 'Python', 'Chatbot', 'Data Analysis'],
    desc: 'Trend-driven AI that detects early signals of disease outbreaks, triggers automated alerts, and provides a conversational interface for health authorities.',
    color: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200&h=800',
  },
  {
    id: '03',
    title: 'IoT Energy Monitor',
    sub: 'Smart Appliance Tracking',
    tech: ['ESP32', 'MQTT', 'FastAPI', 'InfluxDB'],
    desc: 'Real-time appliance-level energy monitoring using ESP32 hardware, MQTT data pipelines, and a FastAPI backend with time-series analytics.',
    color: '#4ECDC4',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=1200&h=800',
  },
  {
    id: '04',
    title: 'Infant Cardiac Monitor',
    sub: 'Post-Op Healthcare System',
    tech: ['System Design', 'Real-time Alerts', 'Data Pipelines'],
    desc: 'Post-operative monitoring system with structured patient data handling, real-time anomaly detection, and automated notification workflows for clinical teams.',
    color: '#FF6B9D',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200&h=800',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headRef.current?.children || [], {
        y: 50, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
      });

      // Cards — staggered clip-path reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });

        // Image zoom on hover via GSAP
        const img = card.querySelector('img');
        const onEnter = () => gsap.to(img, { scale: 1.08, duration: 0.8, ease: 'power2.out' });
        const onLeave = () => gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' });
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-[#0a0a0a] py-32 overflow-hidden">

      {/* Chapter label */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 mb-16">
        <div ref={headRef} className="flex flex-col gap-3">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)]">Chapter 02 — The Work</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="font-display font-black text-[var(--cream)] leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
            >
              Projects
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-xs text-sm leading-relaxed">
              Four systems built to solve real problems — each one a story of research, iteration, and shipping.
            </p>
          </div>
        </div>
      </div>

      {/* Project Cards — large featured layout */}
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative overflow-hidden rounded-3xl"
            style={{ aspectRatio: '16/10', cursor: 'none' }}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scale(1)', willChange: 'transform' }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)`
            }} />

            {/* Accent glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 50% 80%, ${project.color}, transparent 60%)` }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              {/* Top row */}
              <div className="flex justify-between items-start">
                <span className="font-display font-bold text-4xl" style={{ color: project.color, opacity: 0.5 }}>
                  {project.id}
                </span>
                <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                  {project.tech.map(t => (
                    <span key={t} className="font-body text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 text-white/60 backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom */}
              <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: project.color }}>{project.sub}</p>
                <h3 className="font-display font-bold text-white text-3xl leading-tight mb-3">{project.title}</h3>
                <p className="font-body text-sm text-white/50 max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.desc}
                </p>
              </div>
            </div>

            {/* Border on hover */}
            <div
              className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/10 transition-colors duration-500 pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
