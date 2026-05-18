import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[rgba(242,235,224,0.06)] bg-[#070707] relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="font-display font-black text-[var(--cream)] text-xl">Adith<span className="text-[var(--primary-accent)]">.</span></span>
          <span className="font-body text-xs text-[var(--text-secondary)] uppercase tracking-widest">
            © {new Date().getFullYear()} — Trivandrum, Kerala
          </span>
        </div>

        <div className="flex items-center gap-8">
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/adith0213' },
            { label: 'GitHub', href: 'https://github.com/adi0213' },
            { label: 'Email', href: 'mailto:2005adith@gmail.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="font-body text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--cream)] transition-colors cursor-none"
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 border border-[rgba(242,235,224,0.1)] rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--cream)] hover:border-[var(--primary-accent)] transition-colors cursor-none"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
