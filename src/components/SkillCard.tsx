import { type LucideIcon } from 'lucide-react';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: string;
}

export default function SkillCard({ icon: Icon, title, skills }: SkillCardProps) {
  return (
    <div
      className="skill-card"
      style={{
        background: 'var(--crimson)',
        padding: '2rem',
        borderRadius: 'var(--radius-md)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        border: '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <Icon size={32} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
      <h3
        className="font-display font-bold mb-3"
        style={{ fontSize: '1.25rem', color: 'var(--accent-cream)' }}
      >
        {title}
      </h3>
      <p className="body-text" style={{ color: 'rgba(244, 228, 212, 0.8)' }}>
        {skills}
      </p>
    </div>
  );
}
