import { DottedSurfaceInverted } from "@/components/ui/dotted-surface-inverted";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Reveal } from "@/components/reveal";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <div className="flex flex-col">
      <SmoothScroll />
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* Work */}
      <WorkSection />

      {/* About */}
      <section id="about" className="relative z-10 bg-black py-32 scroll-mt-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">
              About us
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 max-w-3xl">
              We don&apos;t just edit.
              <br />
              <span className="text-white/20">We obsess.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-16" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-white/50">
                We&apos;re a tight crew of editors, colorists, motion designers, and
                strategists who eat, sleep, and breathe content. Born from late-night
                editing sessions and a shared belief that every second of footage
                deserves respect.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-lg leading-relaxed text-white/50">
                We&apos;ve helped creators go from zero to millions — not with hacks,
                but with craft. Every cut is intentional. Every thumbnail is tested.
                Every strategy is backed by data, not guesswork.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-16" />
          </Reveal>

          <Reveal delay={0.35}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '01', title: 'Craft over speed', desc: 'We take the time to get it right — no shortcuts, no templates.' },
                { number: '02', title: 'Data meets taste', desc: 'We study what works, then make it look like nothing else.' },
                { number: '03', title: 'Your voice, amplified', desc: 'We don\'t impose a style — we find yours and turn it up.' },
                { number: '04', title: 'Always iterating', desc: 'Every project teaches us something. We never stop refining.' },
              ].map((value) => (
                <div key={value.number} className="group">
                  <p className="text-3xl font-bold text-white/10 mb-4 group-hover:text-white/25 transition-colors duration-500">
                    {value.number}
                  </p>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/30">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative z-10 scroll-mt-20 min-h-screen overflow-hidden">
        <DottedSurfaceInverted className="size-full" />

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
