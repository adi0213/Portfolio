interface TimelineCardProps {
  badge: string;
  title: string;
  org: string;
  date: string;
  detail?: string;
  bullets?: string[];
}

export default function TimelineCard({
  badge,
  title,
  org,
  date,
  detail,
  bullets,
}: TimelineCardProps) {
  return (
    <div
      className="exp-card"
      style={{
        background: 'var(--crimson)',
        padding: '2rem',
        borderRadius: 'var(--radius-md)',
        borderLeft: '3px solid var(--accent-gold)',
      }}
    >
      <span
        className="label-text inline-block mb-4"
        style={{
          background: 'var(--accent-gold)',
          color: 'var(--dark-maroon)',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-pill)',
        }}
      >
        {badge}
      </span>
      <h3
        className="font-display font-bold mb-2"
        style={{ fontSize: '1.5rem', color: 'var(--accent-cream)' }}
      >
        {title}
      </h3>
      <p className="body-text mb-1" style={{ color: 'rgba(244, 228, 212, 0.7)' }}>
        {org}
      </p>
      <p className="body-sm mb-3" style={{ color: 'var(--text-muted)' }}>
        {date}
      </p>
      {detail && (
        <p className="body-sm mb-3" style={{ color: 'var(--text-muted)' }}>
          {detail}
        </p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-2 mt-3">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="body-sm flex items-start gap-2"
              style={{ color: 'rgba(244, 228, 212, 0.8)' }}
            >
              <span style={{ color: 'var(--accent-gold)', marginTop: '2px' }}>•</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
