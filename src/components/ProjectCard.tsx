interface ProjectCardProps {
  image: string;
  title: string;
  tags: string[];
  description: string;
}

export default function ProjectCard({ image, title, tags, description }: ProjectCardProps) {
  return (
    <div
      className="project-card group cursor-pointer"
      style={{
        background: 'var(--dark-maroon)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid rgba(201, 169, 110, 0.15)',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.4)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3
          className="font-display font-bold mb-3"
          style={{ fontSize: '1.5rem', color: 'var(--accent-cream)' }}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="label-text"
              style={{
                background: 'var(--crimson)',
                color: 'var(--accent-cream)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="body-sm" style={{ color: 'rgba(244, 228, 212, 0.75)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
