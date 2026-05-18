import { useScrollIndicator } from '@/hooks/useScrollIndicator';

export default function ScrollIndicator() {
  const visible = useScrollIndicator();

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-400"
      style={{
        bottom: '2rem',
        opacity: visible ? 0.5 : 0,
        zIndex: 1,
      }}
    >
      <div
        className="relative"
        style={{ width: '1px', height: '40px', backgroundColor: 'var(--accent-cream)' }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 scroll-dot"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-cream)',
            top: 0,
          }}
        />
      </div>
    </div>
  );
}
