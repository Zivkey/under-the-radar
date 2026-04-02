'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Home, Layers, Film, User, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Services', href: '#services', icon: Layers },
  { label: 'Work', href: '#work', icon: Film },
  { label: 'About', href: '#about', icon: User },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

    const handleScroll = () => {
      const offset = 150;
      let newActive = 'home';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        if (sectionIds[i] === 'home') continue;
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          newActive = sectionIds[i];
          break;
        }
      }
      setActiveSection(newActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update pill position — only follows ACTIVE section (not hover)
  useEffect(() => {
    const targetLabel = navLinks.find((l) => l.href === `#${activeSection}`)?.label;
    const el = targetLabel ? linkRefs.current[targetLabel] : null;
    const nav = navRef.current;

    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - navRect.left - 6,
        width: elRect.width + 28,
      });
    }
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm font-semibold tracking-tight text-white"
        >
          UTR<span className="text-white/40">™</span>
        </a>

        <nav ref={navRef} className="relative flex items-center gap-1">
          {/* Sliding pill — only follows active section */}
          <motion.div
            className="absolute top-0 h-full rounded-md border border-white/10 bg-white/[0.04]"
            animate={{
              left: pillStyle.left,
              width: pillStyle.width,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />

          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            const isHovered = hoveredLink === link.label;
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                ref={(el) => { linkRefs.current[link.label] = el; }}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative z-10 flex items-center px-3.5 py-2"
              >
                <div className="flex items-center gap-2">
                  {/* Icon — only visible for active section */}
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        key={`icon-${link.label}`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 14, opacity: 0.6 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <Icon size={14} className="shrink-0 text-white/70" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span
                    className={cn(
                      'text-xs uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap',
                      isActive
                        ? 'text-white'
                        : isHovered
                          ? 'text-white'
                          : 'text-white/35',
                    )}
                  >
                    {link.label}
                  </span>
                </div>
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
          className="rounded-md border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/[0.04]"
        >
          Get in touch
        </a>
      </div>

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </header>
  );
}
