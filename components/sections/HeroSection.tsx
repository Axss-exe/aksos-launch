'use client';

import { motion } from 'framer-motion';
import { HeroDiagram } from '../diagrams';
import { useState, useEffect } from 'react';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: HERO (Diagram-First)
// 
// Purpose: Introduce the SEE phase - signals are fragmented
// Visitor Question: "What's wrong with my information?"
// New Idea: Signals are everywhere, relationships are hidden
// Evidence: Signal scatter diagram with operator at center
// Interaction: Hover signals to see connections
// Transition: Scroll to Problem section
// 
// Doctrine Compliance:
// - Pattern: Diagram-first
// - Density: High
// - Rhythm: Starting point
// - Visual: Diagram communicates primary idea
// =============================================================================

interface HeroSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function HeroSection({ breakpoint = 'desktop' }: HeroSectionProps) {
  const [hoveredSignal, setHoveredSignal] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for header state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Breakpoint detection
  const getBreakpoint = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 600) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
    }
    return breakpoint;
  };

  return (
    <section 
      id="top"
      className="hero-section section-diagram-first"
      style={{
        backgroundColor: tokens.color.background,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Diagram Container - Primary focus */}
      <motion.div
        className="diagram-wrapper"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: tokens.spacing['16'],
          paddingTop: tokens.spacing['24'],
        }}
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <HeroDiagram breakpoint={getBreakpoint()} />
      </motion.div>
      
      {/* Text Overlay - Minimal, supports diagram */}
      <motion.div
        className="hero-text-overlay"
        style={{
          position: 'absolute',
          top: tokens.spacing['16'],
          left: tokens.spacing['8'],
          right: tokens.spacing['8'],
          maxWidth: '800px',
          margin: '0 auto',
        }}
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p 
          className="section-label"
          style={{
            fontFamily: tokens.font.mono,
            fontSize: tokens.text.sm,
            color: tokens.color.muted,
            letterSpacing: tokens.letterSpacing.wide,
            marginBottom: tokens.spacing['4'],
          }}
        >
          <span style={{ display: 'inline-block', width: '12px', height: '2px', backgroundColor: tokens.color.signal, marginRight: tokens.spacing['2'] }} />
          AKSOS
        </p>
        
        <motion.h1
          style={{
            fontFamily: tokens.font.serif,
            fontSize: tokens.text['6xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            marginBottom: tokens.spacing['6'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          You already know your field.
          <br />
          <em style={{ fontStyle: 'italic' }}>We help you become harder to beat in it.</em>
        </motion.h1>
        
        <motion.div
          style={{
            display: 'flex',
            gap: tokens.spacing['4'],
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              maxWidth: '400px',
            }}
          >
            You have the relationships.<br />
            You know the market.<br />
            You understand the work.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              maxWidth: '400px',
            }}
          >
            But information is scattered.<br />
            Opportunities are easy to miss.<br />
            The systems behind good work often aren't strong enough to carry it further.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              maxWidth: '400px',
              marginTop: tokens.spacing['4'],
            }}
          >
            You shouldn't have to build all of that alone.<br />
            <strong style={{ color: tokens.color.ink }}>We're here to help.</strong>
          </p>
        </motion.div>
      </motion.div>
      
      {/* CTA - Appears after diagram interpretation */}
      <motion.div
        className="hero-cta"
        style={{
          position: 'absolute',
          bottom: tokens.spacing['16'],
          left: tokens.spacing['8'],
          right: tokens.spacing['8'],
          display: 'flex',
          gap: tokens.spacing['4'],
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <a 
          href="#what-we-build"
          className="btn btn-primary"
          style={{
            fontFamily: tokens.font.sans,
            fontSize: tokens.text.base,
            fontWeight: tokens.weight.medium,
            padding: `${tokens.spacing['3']} ${tokens.spacing['6']}`,
            backgroundColor: tokens.color.signal,
            color: tokens.color.paper,
            borderRadius: tokens.border.radius.sm,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: tokens.spacing['2'],
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.color.signalDark;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = tokens.color.signal;
          }}
        >
          See what we're building
        </a>
        
        <a 
          href="/batana"
          className="btn btn-secondary"
          style={{
            fontFamily: tokens.font.sans,
            fontSize: tokens.text.base,
            fontWeight: tokens.weight.medium,
            padding: `${tokens.spacing['3']} ${tokens.spacing['6']}`,
            backgroundColor: tokens.color.paper,
            color: tokens.color.ink,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: tokens.spacing['2'],
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = tokens.color.background;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = tokens.color.paper;
          }}
        >
          Start with Batana
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
