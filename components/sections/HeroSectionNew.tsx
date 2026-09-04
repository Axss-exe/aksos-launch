'use client';

import { motion } from 'framer-motion';
import { HeroGraph } from '../diagrams/HeroGraph';
import { useState, useEffect, useCallback } from 'react';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 01: HERO - THE WORLD
// 
// Purpose: Introduce the ecosystem visibility problem
// Visitor Reaction: "Wow. What is this?"
// 
// Requirements:
// - Large, animated, Obsidian-style knowledge graph on the RIGHT
// - Text on the LEFT
// - Graph must be very large, occupy substantial visual weight
// - Graph should feel like it's floating in the page, not trapped in a box
// - One dominant conceptual statement
// - Short supporting explanation
// - One primary CTA
// - Living graph
//
// Doctrine Compliance:
// - Pattern: Asymmetric editorial (text left, graph right)
// - Density: High (graph) + Low (text)
// - Rhythm: Starting point
// - Visual: Graph communicates primary idea
// =============================================================================

interface HeroSectionNewProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function HeroSectionNew({ breakpoint = 'desktop' }: HeroSectionNewProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  // Detect scroll for header state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get actual breakpoint from window
  const getBreakpoint = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 'mobile';
      if (window.innerWidth < 1024) return 'tablet';
    }
    return breakpoint;
  }, [breakpoint]);

  return (
    <section 
      id="top"
      className="hero-section-new"
      style={{
        backgroundColor: tokens.color.background,
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
        gap: tokens.spacing['16'],
        padding: `${tokens.spacing['20']} ${tokens.spacing['8']}`,
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {/* LEFT: Text Content */}
      <motion.div
        className="hero-text"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '600px',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* AKSOS Identity */}
        <motion.p
          className="section-label"
          style={{
            fontFamily: tokens.font.mono,
            fontSize: tokens.text.sm,
            color: tokens.color.muted,
            letterSpacing: tokens.letterSpacing.widest,
            marginBottom: tokens.spacing['6'],
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing['2'],
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span style={{ display: 'inline-block', width: '16px', height: '1px', backgroundColor: tokens.color.signal }} />
          AKSOS
        </motion.p>
        
        {/* Dominant Conceptual Statement */}
        <motion.h1
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? tokens.text['4xl'] : tokens.text['7xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            letterSpacing: tokens.letterSpacing.tight,
            marginBottom: tokens.spacing['8'],
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          There is enormous activity across African markets.
        </motion.h1>
        
        {/* Supporting Explanation */}
        <motion.p
          style={{
            fontFamily: tokens.font.sans,
            fontSize: isMobile ? tokens.text.base : tokens.text.xl,
            color: tokens.color.muted,
            lineHeight: tokens.lineHeight.relaxed,
            marginBottom: tokens.spacing['12'],
            maxWidth: '500px',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          But from a distance, it can be disproportionately difficult to see.
        </motion.p>
        
        {/* Primary CTA */}
        <motion.a
          href="#visibility-gap"
          className="btn btn-primary"
          style={{
            fontFamily: tokens.font.sans,
            fontSize: tokens.text.base,
            fontWeight: tokens.weight.medium,
            padding: `${tokens.spacing['4']} ${tokens.spacing['8']}`,
            backgroundColor: tokens.color.signal,
            color: tokens.color.paper,
            border: `1px solid ${tokens.color.signal}`,
            borderRadius: tokens.border.radius.sm,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: tokens.spacing['2'],
            alignSelf: 'flex-start',
            transition: 'all 0.2s ease',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            backgroundColor: tokens.color.signalLight,
            borderColor: tokens.color.signalLight,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Understand the gap
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            style={{ display: 'inline-block' }}
          >
            {String.fromCharCode(8594)}
          </motion.span>
        </motion.a>
      </motion.div>
      
      {/* RIGHT: Living Graph */}
      <motion.div
        className="hero-graph"
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '400px' : '100%',
          minHeight: isMobile ? '400px' : '600px',
          overflow: 'visible',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <HeroGraph 
          breakpoint={getBreakpoint()} 
          key={getBreakpoint()}
        />
      </motion.div>
      
      {/* Mobile: Graph takes full width, text centered above */}
      {isMobile && (
        <motion.div
          className="hero-mobile-text"
          style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            paddingTop: tokens.spacing['12'],
          }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Tap nodes to explore relationships
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}

export default HeroSectionNew;
