'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // As user scrolls: text moves down + scales down (goes "into the distance")
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Dots move up (parallax offset)
  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: dotsY }} className="absolute inset-0">
        <DottedSurface className="size-full" />
      </motion.div>

      <motion.div
        style={{ y, scale, opacity }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-10 left-1/2 size-[200%] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
            'blur-[30px]',
          )}
        />
        <h1 className="text-6xl font-bold text-white tracking-tight">
          UnderTheRadar
          <sup className="text-xs align-super ml-0.5 opacity-60">™</sup>
        </h1>
        <p className="text-sm tracking-[0.3em] uppercase text-white/50">
          Post Production&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Youtube Agency
        </p>
      </motion.div>
    </section>
  );
}
