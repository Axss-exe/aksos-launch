'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface SiteHeaderProps {
  navItems?: NavItem[];
  cta?: NavItem;
}

export function SiteHeader({ 
  navItems = [
    { label: 'What We Build', href: '#what-we-build' },
    { label: 'ATIS', href: '#atis' },
    { label: 'RITA', href: '#rita' },
    { label: 'Batana', href: '/batana' },
  ],
  cta = { label: 'Enter Batana', href: '/batana' }
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: tokens.animation.duration.normal, ease: tokens.animation.easing.easeOut }}
    >
      <a href="/#top" className="wordmark">
        <img src="/aksos-symbol-traced.svg" alt="AKSOS" />
        <span>AKSOS</span>
      </a>

      <nav className={isOpen ? 'nav-open' : ''}>
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            whileHover={{ color: tokens.color.signal }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </motion.a>
        ))}
        
        <motion.a
          href={cta.href}
          className="btn btn-primary"
          target={cta.external ? '_blank' : undefined}
          rel={cta.external ? 'noopener noreferrer' : undefined}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(false)}
        >
          {cta.label}
        </motion.a>
      </nav>

      <button 
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.X
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: tokens.animation.duration.fast }}
            />
          ) : (
            <motion.Menu
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: tokens.animation.duration.fast }}
            />
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
