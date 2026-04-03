'use client';

import { useRef } from 'react';
import { Scissors, TrendingUp, Layers, Image, Clock, Eye } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/reveal';
import { MagicCard, MagicSpotlight, MagicGrid } from '@/components/magic-bento-wrapper';
import '@/components/magic-bento.css';

export function ServicesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative z-10 bg-black py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
            What we do
          </p>
          <h2 className="text-4xl font-semibold text-white mb-6 max-w-2xl">
            We craft stories that keep viewers watching.
          </h2>
          <p className="text-base leading-relaxed text-white/40 mb-16 max-w-xl">
            From raw footage to viral content — we handle every step of the
            creative process so you can focus on what matters.
          </p>
        </Reveal>

        {/* Magic Bento Grid */}
        <MagicSpotlight gridRef={gridRef} />
        <MagicGrid gridRef={gridRef}>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
            {/* Large — Post Production */}
            <StaggerItem className="md:col-span-2 md:row-span-2">
              <MagicCard className="h-full !rounded-2xl !border-white/5 !bg-white/[0.02] !p-6 sm:!p-10 !aspect-auto !min-h-0">
                <div className="flex flex-col h-full">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <Scissors className="mb-4 sm:mb-6 h-6 w-6 sm:h-8 sm:w-8 text-white/50" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                    Post Production
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40 mb-8 max-w-md">
                    We take your raw footage and turn it into a story worth watching.
                    Every cut, transition, and effect is intentional — designed to keep
                    your audience locked in from start to finish.
                  </p>
                  <ul className="space-y-3 mt-auto">
                    {['Precision editing & pacing', 'Cinematic color grading', 'Sound design & mixing', 'Motion graphics & VFX'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                        <span className="h-1 w-1 rounded-full bg-white/30 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </MagicCard>
            </StaggerItem>

            {/* Channel Strategy */}
            <StaggerItem>
              <MagicCard className="h-full !rounded-2xl !border-white/5 !bg-white/[0.02] !p-8 !aspect-auto !min-h-0">
                <div>
                  <TrendingUp className="mb-5 h-6 w-6 text-white/50" />
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Channel Strategy
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40">
                    Data-driven growth plans, content calendars, and audience
                    analysis that turn channels into communities.
                  </p>
                </div>
              </MagicCard>
            </StaggerItem>

            {/* Thumbnail Design */}
            <StaggerItem>
              <MagicCard className="h-full !rounded-2xl !border-white/5 !bg-white/[0.02] !p-8 !aspect-auto !min-h-0">
                <div>
                  <Image className="mb-5 h-6 w-6 text-white/50" />
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Thumbnail Design
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40">
                    Click-worthy thumbnails engineered for maximum CTR — tested,
                    refined, and proven to perform.
                  </p>
                </div>
              </MagicCard>
            </StaggerItem>

            {/* Full Management — wide */}
            <StaggerItem className="md:col-span-3">
              <MagicCard className="!rounded-2xl !border-white/5 !bg-white/[0.02] !p-10 !aspect-auto !min-h-0">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <Layers className="mb-5 h-6 w-6 text-white/50" />
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Full Channel Management
                    </h3>
                    <p className="text-sm leading-relaxed text-white/40 max-w-lg">
                      End-to-end YouTube management — from content ideation and scripting
                      to publishing, optimization, and analytics. We become your creative team
                      so you don&apos;t have to build one.
                    </p>
                  </div>
                  <div className="flex gap-6 md:gap-10">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Hands-off</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">A→Z</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Pipeline</p>
                    </div>
                  </div>
                </div>
              </MagicCard>
            </StaggerItem>
          </StaggerContainer>
        </MagicGrid>

        {/* Stats strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4">
              <Scissors className="h-5 w-5 text-white/20 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Projects delivered</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Eye className="h-5 w-5 text-white/20 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">10M+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Views generated</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <TrendingUp className="h-5 w-5 text-white/20 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">3x</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Avg growth rate</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-white/20 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Turnaround time</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
