import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ServicesSection } from "@/components/services-section";
import { WorkSection } from "@/components/work-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

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
      <AboutSection />

      {/* Contact */}
      <ContactSection />

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
