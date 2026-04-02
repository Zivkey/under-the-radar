import { DottedSurface } from "@/components/ui/dotted-surface";
import { DottedSurfaceInverted } from "@/components/ui/dotted-surface-inverted";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <DottedSurface className="size-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
              "blur-[30px]"
            )}
          />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl font-bold text-white tracking-tight">
              UnderTheRadar
              <sup className="text-xs align-super ml-0.5 opacity-60">™</sup>
            </h1>
            <p className="text-sm tracking-[0.3em] uppercase text-white/50">
              Post Production&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Youtube Agency
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* Work — Zoom Parallax */}
      <WorkSection />

      {/* About */}
      <section id="about" className="relative z-10 bg-black py-24 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
                About us
              </p>
              <h2 className="text-4xl font-bold text-white mb-6">
                We don&apos;t just edit.
                <span className="text-white/20"> We obsess.</span>
              </h2>
              <p className="text-base leading-relaxed text-white/40 mb-4">
                We&apos;re a tight crew of editors, colorists, and strategists who
                live and breathe content. We know what works because we&apos;ve tested
                everything that doesn&apos;t.
              </p>
              <p className="text-base leading-relaxed text-white/40">
                Every frame, every cut, every thumbnail — crafted with intention.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: 'Projects' },
                  { number: '10M+', label: 'Views' },
                  { number: '3x', label: 'Avg growth' },
                  { number: '24h', label: 'Turnaround' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <p className="text-2xl font-bold text-white mb-1">{stat.number}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 scroll-mt-20 min-h-screen overflow-hidden">
        {/* Inverted dotted surface from ceiling */}
        <DottedSurfaceInverted className="size-full" />

        {/* Content over the dots */}
        <div className="relative z-10 py-32">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-3xl p-10 md:p-14">
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
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-10">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <span className="font-mono text-xs text-white/20">
            © 2026 UnderTheRadar™
          </span>
          <span className="text-xs text-white/20">
            Post Production / Youtube Agency
          </span>
        </div>
      </footer>
    </div>
  );
}
