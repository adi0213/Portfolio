import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const navItems = [
  { label: 'Story', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#workflow' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 1, delay: 2.4, ease: 'power3.out' });

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (mobileOpen) {
      gsap.to(mobileRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
      gsap.from(mobileRef.current.querySelectorAll('a'), {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out'
      });
    } else {
      gsap.to(mobileRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}
        style={{
          background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(242,235,224,0.06)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display font-black text-xl text-[var(--cream)] tracking-tight cursor-none"
          >
            Adith<span className="text-[var(--primary-accent)]">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--cream)] transition-colors uppercase tracking-widest cursor-none"
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:2005adith@gmail.com"
              className="font-body text-sm font-semibold px-6 py-2.5 rounded-full border border-[rgba(242,235,224,0.2)] text-[var(--cream)] hover:bg-[var(--primary-accent)] hover:border-[var(--primary-accent)] transition-all uppercase tracking-widest cursor-none"
            >
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 cursor-none"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-[var(--cream)] block transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-4 h-px bg-[var(--cream)] block transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-[var(--cream)] block transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col items-center justify-center gap-10 invisible"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
            className="font-display font-bold text-5xl text-[var(--cream)] hover:text-[var(--primary-accent)] transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
