'use client';

import { useRef } from 'react';
import { Reveal } from '@/components/reveal';
import { MagicCard, MagicSpotlight, MagicGrid } from '@/components/magic-bento-wrapper';
import '@/components/magic-bento.css';

const values = [
  { number: '01', title: 'Craft over speed', desc: 'We take the time to get it right — no shortcuts, no templates.' },
  { number: '02', title: 'Data meets taste', desc: 'We study what works, then make it look like nothing else.' },
  { number: '03', title: 'Your voice, amplified', desc: "We don't impose a style — we find yours and turn it up." },
  { number: '04', title: 'Always iterating', desc: 'Every project teaches us something. We never stop refining.' },
];

export function AboutSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="relative z-10 bg-black py-32 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">
            About us
          </p>
          <h2 className="text-4xl font-semibold text-white mb-6 max-w-2xl">
            We don&apos;t just edit.
            <br />
            <span className="text-white/20">We obsess.</span>
          </h2>
        </Reveal>

        <MagicSpotlight gridRef={gridRef} />
        <MagicGrid gridRef={gridRef}>
          <Reveal delay={0.1}>
            <MagicCard className="!rounded-2xl !border-white/5 !bg-white/[0.02] !p-10 !aspect-auto !min-h-0 mt-10 md:mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <p className="text-lg leading-relaxed text-white/50">
                  We&apos;re a tight crew of editors, colorists, motion designers, and
                  strategists who eat, sleep, and breathe content. Born from late-night
                  editing sessions and a shared belief that every second of footage
                  deserves respect.
                </p>
                <p className="text-lg leading-relaxed text-white/50">
                  We&apos;ve helped creators go from zero to millions — not with hacks,
                  but with craft. Every cut is intentional. Every thumbnail is tested.
                  Every strategy is backed by data, not guesswork.
                </p>
              </div>
            </MagicCard>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-10" />
          </Reveal>

          <Reveal delay={0.35}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {values.map((value) => (
                <MagicCard
                  key={value.number}
                  className="!rounded-2xl !border-white/5 !bg-white/[0.02] !p-8 !aspect-auto !min-h-0"
                >
                  <p className="text-3xl font-bold text-white/10 mb-4">
                    {value.number}
                  </p>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/30">
                    {value.desc}
                  </p>
                </MagicCard>
              ))}
            </div>
          </Reveal>
        </MagicGrid>
      </div>
    </section>
  );
}
