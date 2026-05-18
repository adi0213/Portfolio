import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(obj.val)).padStart(2, '0');
        }
      }
    })
    .to(lineRef.current, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, 0)
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete() {
        if (loaderRef.current) loaderRef.current.style.display = 'none';
      }
    }, '+=0.1');
  }, []);

  return (
    <div ref={loaderRef} id="page-loader">
      <div ref={countRef} id="loader-count">00</div>
      <div ref={lineRef} id="loader-line" style={{ width: 0 }} />
    </div>
  );
}
