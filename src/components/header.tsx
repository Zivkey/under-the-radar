'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function FlipLink({
  text,
  isActive,
  href,
  onClick,
}: {
  text: string;
  isActive: boolean;
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [shouldFlip, setShouldFlip] = useState(false);
  const wasActive = useRef(isActive);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      setShouldFlip(true);
      const timer = setTimeout(() => setShouldFlip(false), 600);
      wasActive.current = isActive;
      return () => clearTimeout(timer);
    }
    wasActive.current = isActive;
  }, [isActive]);

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'relative block px-3.5 py-2 text-xs uppercase tracking-[0.12em] transition-colors duration-300 overflow-hidden',
        isActive ? 'text-white' : 'text-white/30 hover:text-white/60',
      )}
    >
      {/* Wrapper with fixed height = 1 line */}
      <span className="relative block overflow-hidden" style={{ height: '1em', lineHeight: '1em' }}>
        {/* Top — visible by default, flips up */}
        <span className="flex" style={{ height: '1em' }}>
          {text.split('').map((letter, i) => (
            <span
              key={`t-${i}`}
              className="inline-block transition-transform duration-300 ease-in-out"
              style={{
                transform: shouldFlip ? 'translateY(-100%)' : 'translateY(0)',
                transitionDelay: shouldFlip ? `${i * 30}ms` : '0ms',
              }}
            >
              {letter}
            </span>
          ))}
        </span>

        {/* Bottom — hidden below, flips in */}
        <span className="absolute top-0 left-0 flex" style={{ height: '1em' }}>
          {text.split('').map((letter, i) => (
            <span
              key={`b-${i}`}
              className="inline-block transition-transform duration-300 ease-in-out"
              style={{
                transform: shouldFlip ? 'translateY(0)' : 'translateY(100%)',
                transitionDelay: shouldFlip ? `${i * 30}ms` : '0ms',
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [activeSection, setActiveSection] = useState<string>('home');

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

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <FlipLink
                key={link.label}
                text={link.label}
                isActive={isActive}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
              />
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
