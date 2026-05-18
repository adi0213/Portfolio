/**
 * SplineWatermarkKiller — Global MutationObserver that watches the DOM
 * and removes Spline's "Built with Spline" watermark the instant it appears.
 * Mount once in App.tsx.
 */

import { useEffect } from 'react';

function killWatermark() {
  // All known Spline watermark selectors
  const selectors = [
    'a[href*="spline.design"]',
    '#logo',
    '[id="logo"]',
    'a[target="_blank"][rel*="noopener"][href*="spline"]',
  ];

  selectors.forEach(selector => {
    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      el.remove(); // completely remove from DOM, not just hide
    });
  });
}

export default function SplineWatermarkKiller() {
  useEffect(() => {
    // Kill immediately
    killWatermark();

    // Watch for future injections (Spline adds watermark asynchronously)
    const observer = new MutationObserver(() => {
      killWatermark();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
