'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Global ref so other components can stop/start Lenis
let lenisInstance: Lenis | null = null;

export function stopScroll() {
  lenisInstance?.stop();
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

export function startScroll() {
  lenisInstance?.start();
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

export function SmoothScroll() {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
