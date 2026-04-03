'use client';

import { useRef } from 'react';
import { DottedSurfaceInverted } from '@/components/ui/dotted-surface-inverted';
import { Reveal } from '@/components/reveal';
import { MagicCard, MagicSpotlight, MagicGrid } from '@/components/magic-bento-wrapper';
import { ContactForm } from '@/components/contact-form';
import '@/components/magic-bento.css';

export function ContactSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative z-10 scroll-mt-20 min-h-screen overflow-hidden">
      <DottedSurfaceInverted className="size-full" />

      <div className="relative z-10 py-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <MagicSpotlight gridRef={gridRef} />
            <MagicGrid gridRef={gridRef}>
              <MagicCard className="!rounded-2xl !border-white/10 !bg-black !p-6 sm:!p-10 md:!p-14 !aspect-auto !min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
                      Let&apos;s talk
                    </p>
                    <h2 className="text-4xl font-semibold text-white mb-6">
                      Ready to go under the radar?
                    </h2>
                    <p className="text-base leading-relaxed text-white/40 mb-8">
                      Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </p>
                    <div className="flex flex-col gap-4 text-sm text-white/30">
                      <a href="mailto:hello@undertheradar.com" className="transition-colors hover:text-white/60">
                        hello@undertheradar.com
                      </a>
                      <p>Belgrade, Serbia</p>
                    </div>
                  </div>

                  <ContactForm />
                </div>
              </MagicCard>
            </MagicGrid>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
