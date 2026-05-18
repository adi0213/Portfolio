import { Suspense, lazy, useState, Component, ReactNode } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onSceneLoad?: (app: any) => void;
}

// Internal error boundary — prevents 403 / network failures from crashing React
class SplineBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return null; // silently hide
    return this.props.children;
  }
}

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <span
        style={{
          width: 40,
          height: 40,
          border: '2px solid rgba(201,54,28,0.2)',
          borderTopColor: 'var(--primary-accent)',
          borderRadius: '50%',
          animation: 'spline-spin 0.8s linear infinite',
          display: 'block',
        }}
      />
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(201,54,28,0.6)',
        }}
      >
        Loading 3D
      </span>
    </div>
  );
}

if (typeof document !== 'undefined') {
  const styleId = 'spline-scene-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `@keyframes spline-spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
}

export function SplineScene({ scene, className = 'w-full h-full', onSceneLoad }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (app: any) => {
    setLoaded(true);
    onSceneLoad?.(app);

    // Make background transparent
    const clearBg = () => {
      try {
        const renderer = app?._renderer ?? app?.renderer;
        if (renderer) {
          renderer.setClearColor(0x000000, 0);
          renderer.setClearAlpha(0);
        }
        const splineScene = app?._scene ?? app?.scene;
        if (splineScene) splineScene.background = null;
        const canvas = renderer?.domElement ?? app?.canvas;
        if (canvas) canvas.style.background = 'transparent';
      } catch (_) { /* ignore */ }
    };
    // Run immediately and after a few frames — Spline may reset it on first render
    clearBg();
    setTimeout(clearBg, 100);
    setTimeout(clearBg, 500);

    // Remove Spline's "Built with Spline" watermark after load
    const removeWatermark = () => {
      document.querySelectorAll<HTMLElement>('a[href*="spline.design"]').forEach(el => {
        el.style.display = 'none';
      });
      const logo = document.getElementById('logo');
      if (logo) logo.style.display = 'none';
    };

    removeWatermark();
    setTimeout(removeWatermark, 500);
    setTimeout(removeWatermark, 1500);
  };

  return (
    <SplineBoundary>
      <div className="relative w-full h-full">
        {!loaded && (
          <div className="absolute inset-0 z-10">
            <LoadingSpinner />
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <Spline
            scene={scene}
            className={className}
            onLoad={handleLoad}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
          />
        </Suspense>
      </div>
    </SplineBoundary>
  );
}

export default SplineScene;
