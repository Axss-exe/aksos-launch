'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import { useBreakpoint } from '@/lib/hooks';

// =============================================================================
// COMPONENT: SiteHeader
// 
// Purpose: Primary navigation header
// Visitor Question: "Where am I? Where can I go?"
// New Idea: Clear navigation that doesn't compete with content
// Evidence: Logo, navigation links, mobile menu
// Interaction: Mobile menu toggle, scroll state
// 
// Doctrine Compliance:
// - Pattern: Fixed header with scroll awareness
// - Density: Low
// - Rhythm: Always accessible
// - Visual: Restrained, functional
// =============================================================================

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
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isOpen && !isMobile) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  return (
    <motion.header
      className="site-header"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: tokens.zIndex.fixed,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${tokens.spacing['4']} ${tokens.spacing['8']}`,
        backgroundColor: isScrolled ? tokens.color.paper : tokens.color.background,
        borderBottom: isScrolled ? `1px solid ${tokens.color.line}` : 'none',
        boxShadow: isScrolled ? tokens.shadow.sm : 'none',
      }}
    >
      {/* Logo / Wordmark */}
      <motion.a
        href="/#top"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spacing['2'],
          fontFamily: tokens.font.serif,
          fontSize: tokens.text.xl,
          fontWeight: tokens.weight.semibold,
          color: tokens.color.ink,
          textDecoration: 'none',
        }}
        whileHover={{ opacity: 0.8 }}
        whileTap={{ scale: 0.98 }}
      >
        <img 
          src="/aksos-symbol-traced.svg" 
          alt="AKSOS" 
          style={{
            width: tokens.spacing['6'],
            height: tokens.spacing['6'],
          }}
        />
        <span>AKSOS</span>
      </motion.a>

      {/* Desktop Navigation */}
      <motion.nav
        style={{
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          gap: tokens.spacing['8'],
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.sm,
              fontWeight: tokens.weight.normal,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
            }}
            whileHover={{ 
              color: tokens.color.ink,
              cursor: 'pointer'
            }}
            whileTap={{ scale: 0.98 }}
          >
            {item.label}
          </motion.a>
        ))}
        
        {/* Desktop CTA */}
        <motion.a
          href={cta.href}
          target={cta.external ? '_blank' : undefined}
          rel={cta.external ? 'noopener noreferrer' : undefined}
          style={{
            fontFamily: tokens.font.sans,
            fontSize: tokens.text.sm,
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            letterSpacing: tokens.letterSpacing.wide,
            textTransform: 'uppercase' as const,
            textDecoration: 'none',
            padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          whileHover={{ 
            color: tokens.color.signal,
            borderColor: tokens.color.signal,
            backgroundColor: 'rgba(138, 68, 50, 0.05)',
            cursor: 'pointer'
          }}
          whileTap={{ scale: 0.98 }}
        >
          {cta.label}
        </motion.a>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button 
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        style={{
          display: isMobile ? 'block' : 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: tokens.spacing['2'],
        }}
        whileHover={{ opacity: 0.8 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} color={tokens.color.ink} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} color={tokens.color.ink} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: tokens.zIndex.modal,
              backgroundColor: tokens.color.overlay,
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-nav-panel"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: tokens.zIndex.modal + 1,
              display: 'flex',
              flexDirection: 'column',
              padding: `${tokens.spacing['8']} ${tokens.spacing['8']}`,
              backgroundColor: tokens.color.paper,
              borderBottom: `1px solid ${tokens.color.line}`,
            }}
          >
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: tokens.spacing['8'],
              }}
            >
              <motion.a
                href="/#top"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing['2'],
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text.xl,
                  fontWeight: tokens.weight.semibold,
                  color: tokens.color.ink,
                  textDecoration: 'none',
                }}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
              >
                <img 
                  src="/aksos-symbol-traced.svg" 
                  alt="AKSOS" 
                  style={{
                    width: tokens.spacing['6'],
                    height: tokens.spacing['6'],
                  }}
                />
                <span>AKSOS</span>
              </motion.a>
              
              <motion.button
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: tokens.spacing['2'],
                }}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} color={tokens.color.ink} />
              </motion.button>
            </div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text['2xl'],
                    fontWeight: tokens.weight.normal,
                    color: tokens.color.ink,
                    letterSpacing: tokens.letterSpacing.wide,
                    textTransform: 'uppercase' as const,
                    textDecoration: 'none',
                    padding: `${tokens.spacing['4']} ${tokens.spacing['2']}`,
                    borderBottom: `1px solid ${tokens.color.line}`,
                  }}
                  whileHover={{ 
                    color: tokens.color.signal,
                    cursor: 'pointer'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <motion.a
                href={cta.href}
                target={cta.external ? '_blank' : undefined}
                rel={cta.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.paper,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase' as const,
                  textDecoration: 'none',
                  padding: `${tokens.spacing['4']} ${tokens.spacing['6']}`,
                  backgroundColor: tokens.color.signal,
                  border: `1px solid ${tokens.color.signal}`,
                  borderRadius: tokens.border.radius.sm,
                  marginTop: tokens.spacing['4'],
                }}
                whileHover={{ 
                  backgroundColor: tokens.color.signalLight,
                  borderColor: tokens.color.signalLight,
                  cursor: 'pointer'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {cta.label}
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
