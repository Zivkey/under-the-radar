'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Home, Layers, Film, User, Mail, Menu, X } from 'lucide-react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Pill position — desktop only
  useEffect(() => {
    const targetLabel = navLinks.find((l) => l.href === `#${activeSection}`)?.label;
    const el = targetLabel ? linkRefs.current[targetLabel] : null;
    const nav = navRef.current;

    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - navRect.left - 2,
        width: elRect.width + 18,
      });
    }
  }, [activeSection]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (mobileOpen) {
      const close = () => setMobileOpen(false);
      window.addEventListener('scroll', close, { passive: true });
      return () => window.removeEventListener('scroll', close);
    }
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50" style={{ touchAction: 'manipulation' }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm font-semibold tracking-tight text-white"
        >
          UTR<span className="text-white/40">™</span>
        </a>

        {/* Desktop nav */}
        <nav ref={navRef} className="relative hidden md:flex items-center gap-1">
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
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        key={`icon-${link.label}`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 14, opacity: 0.4 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.4, 0, 0.2, 1],
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

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
          className="hidden md:block rounded-md border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/[0.04]"
        >
          Get in touch
        </a>

        {/* Hamburger button — mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/70 transition-colors hover:text-white hover:border-white/20"
        >
          {mobileOpen ? <X size={18} className="pointer-events-none" /> : <Menu size={18} className="pointer-events-none" />}
        </button>
      </div>

      {/* Bottom line */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden bg-black/90 backdrop-blur-xl border-t border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200',
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/40 hover:text-white/70',
                    )}
                  >
                    <Icon size={16} className={cn('pointer-events-none', isActive ? 'text-white/60' : 'text-white/25')} />
                    <span className="text-sm uppercase tracking-[0.12em]">
                      {link.label}
                    </span>
                  </a>
                );
              })}

              <div className="h-px bg-white/5 my-2" />

              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.15em] text-white/70 transition-all hover:text-white hover:border-white/20"
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
