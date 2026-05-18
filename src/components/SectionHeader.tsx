interface SectionHeaderProps {
  label: string;
  title: string;
  titleClass?: string;
}

export default function SectionHeader({ label, title, titleClass = 'section-title' }: SectionHeaderProps) {
  return (
    <div className="section-header mb-16 md:mb-24">
      <span
        className="label-text block mb-4"
        style={{ color: 'var(--accent-gold)' }}
      >
        {label}
      </span>
      <h2
        className={titleClass}
        style={{ color: 'var(--accent-cream)' }}
      >
        {title}
      </h2>
    </div>
  );
}
