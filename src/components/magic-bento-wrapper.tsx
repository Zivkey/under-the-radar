'use client';

import { useRef, useEffect, useCallback, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';

const GLOW_COLOR = '255, 255, 255';
const SPOTLIGHT_RADIUS = 350;
const PARTICLE_COUNT = 8;

/* ── Particle Card ── */
function createParticleElement(x: number, y: number, color: string) {
  const el = document.createElement('div');
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 0.8);
    box-shadow: 0 0 6px rgba(${color}, 0.4);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
}

export function MagicCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, GLOW_COLOR)
    );
    particlesInitialized.current = true;
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => { p.parentNode?.removeChild(p); } });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const tid = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current!.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.2, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(tid);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => { isHoveredRef.current = true; animateParticles(); };
    const onLeave = () => { isHoveredRef.current = false; clearAllParticles(); };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div
      ref={cardRef}
      className={`magic-bento-card magic-bento-card--border-glow ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        '--glow-color': GLOW_COLOR,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Global Spotlight ── */
export function MagicSpotlight({ gridRef }: { gridRef: React.RefObject<HTMLDivElement | null> }) {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${GLOW_COLOR}, 0.08) 0%,
        rgba(${GLOW_COLOR}, 0.04) 15%,
        rgba(${GLOW_COLOR}, 0.02) 25%,
        rgba(${GLOW_COLOR}, 0.01) 40%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        gridRef.current.querySelectorAll('.magic-bento-card').forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = { proximity: SPOTLIGHT_RADIUS * 0.5, fadeDistance: SPOTLIGHT_RADIUS * 0.75 };
      let minDist = Infinity;

      gridRef.current.querySelectorAll('.magic-bento-card').forEach(card => {
        const el = card as HTMLElement;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minDist = Math.min(minDist, dist);

        const glow = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        const rx = ((e.clientX - r.left) / r.width) * 100;
        const ry = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty('--glow-x', `${rx}%`);
        el.style.setProperty('--glow-y', `${ry}%`);
        el.style.setProperty('--glow-intensity', glow.toString());
        el.style.setProperty('--glow-radius', `${SPOTLIGHT_RADIUS}px`);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      const opacity = minDist <= proximity ? 0.6 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.6 : 0;
      gsap.to(spotlightRef.current, { opacity, duration: opacity > 0 ? 0.2 : 0.5 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef]);

  return null;
}

/* ── Grid wrapper ── */
export function MagicGrid({ children, gridRef }: { children: ReactNode; gridRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={gridRef} className="bento-section">
      {children}
    </div>
  );
}
