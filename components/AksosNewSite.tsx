'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SiteHeader } from './navigation/SiteHeader';
import { SiteFooter } from './layout/SiteFooter';
import { useBreakpoint } from '@/lib/hooks';
import {
  HeroSection,
  ProblemSection,
  AllySection,
  WhatWeBuildSection,
  ATISSection,
  RITASection,
  PerspectiveSection,
  StandardSection,
  AccessSection,
  BatanaSection,
  NetworkSection,
  VisionSection,
  FinalCTASection,
} from './sections';
import { HeroDiagram } from './diagrams';
import { tokens } from '@/lib/tokens';

// =============================================================================
// PAGE: AKSOS NEW SITE
// 
// Purpose: Main AKSOS landing page
// Visitor Question: "What is AKSOS? How can they help me?"
// New Idea: AKSOS builds systems for operators who set the standard
// Evidence: Full narrative journey through SEE→KNOW→ACT framework
// Interaction: Scroll-based narrative, diagram exploration
// 
// Doctrine Compliance:
// - Pattern: Narrative-driven page with diagram-first sections
// - Density: Varied (high for diagrams, low for text sections)
// - Rhythm: Alternating patterns to maintain engagement
// - Visual: Consistent typography, diagrams as information architecture
// =============================================================================

export function AksosNewSite() {
  const breakpoint = useBreakpoint();
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top handler
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      id="top"
      ref={topRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: tokens.color.background,
        overflowX: 'hidden',
      }}
    >
      {/* Header */}
      <SiteHeader 
        navItems={[
          { label: 'What We Build', href: '#what-we-build' },
          { label: 'ATIS', href: '#atis' },
          { label: 'RITA', href: '#rita' },
          { label: 'Batana', href: '/batana' },
        ]}
        cta={{ label: 'Enter Batana', href: '/batana' }}
      />

      {/* HERO SECTION - Diagram-first introduction */}
      <HeroSection breakpoint={breakpoint} />

      {/* PROBLEM SECTION - Statement-first: define the problem */}
      <ProblemSection breakpoint={breakpoint} />

      {/* ALLY SECTION - Asymmetric editorial: introduce AKSOS */}
      <AllySection breakpoint={breakpoint} />

      {/* WHAT WE BUILD SECTION - Diagram-first: show the system */}
      <WhatWeBuildSection breakpoint={breakpoint} />

      {/* ATIS SECTION - Full-width system scene: intelligence layer */}
      <ATISSection breakpoint={breakpoint} />

      {/* RITA SECTION - Full-width system scene: relationship layer */}
      <RITASection breakpoint={breakpoint} />

      {/* PERSPECTIVE SECTION - Full-width system scene: why perspectives matter */}
      <PerspectiveSection breakpoint={breakpoint} />

      {/* STANDARD SECTION - Statement-first: the standard we're building toward */}
      <StandardSection breakpoint={breakpoint} />

      {/* ACCESS SECTION - Statement-first: how to get access */}
      <AccessSection breakpoint={breakpoint} />

      {/* BATANA SECTION - Full-width system scene: the community */}
      <BatanaSection breakpoint={breakpoint} />

      {/* NETWORK SECTION - Statement-first: network effects */}
      <NetworkSection breakpoint={breakpoint} />

      {/* VISION SECTION - Statement-first: the vision */}
      <VisionSection breakpoint={breakpoint} />

      {/* FINAL CTA SECTION - Statement-first: call to action */}
      <FinalCTASection breakpoint={breakpoint} />

      {/* Footer */}
      <SiteFooter />

      {/* Scroll to top button (appears on scroll) */}
      <motion.button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: tokens.spacing['8'],
          right: tokens.spacing['8'],
          zIndex: tokens.zIndex.tooltip,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: tokens.spacing['12'],
          height: tokens.spacing['12'],
          backgroundColor: tokens.color.signal,
          border: `1px solid ${tokens.color.signal}`,
          borderRadius: tokens.border.radius.sm,
          cursor: 'pointer',
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={tokens.color.paper}
          strokeWidth="2"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default AksosNewSite;
