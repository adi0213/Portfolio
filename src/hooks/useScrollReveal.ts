import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}

export function useScrollReveal(
  selector: string,
  options: ScrollRevealOptions = {}
) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.set(elements, { opacity: 0, y: options.y ?? 40 });

    const tween = gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      ease: 'power3.out',
      stagger: options.stagger ?? 0.1,
      scrollTrigger: {
        trigger: elements[0].parentElement,
        start: options.start ?? 'top 80%',
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [selector, options.y, options.stagger, options.start, options.duration]);
}
