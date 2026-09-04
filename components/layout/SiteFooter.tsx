'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// COMPONENT: SiteFooter
// 
// Purpose: Site footer with brand, tagline, and meta information
// Visitor Question: "Who made this? When?"
// New Idea: Clear attribution and contact
// Evidence: Logo, tagline, location, year
// Interaction: None
// 
// Doctrine Compliance:
// - Pattern: Centered footer with hierarchy
// - Density: Low
// - Rhythm: Clean close
// - Visual: Restrained, functional
// =============================================================================

interface SiteFooterProps {
  tagline?: string;
  location?: string;
  year?: number;
}

export function SiteFooter({ 
  tagline = 'The information is already there. We\'re building the systems and relationships needed to understand how it connects.',
  location = 'Harare',
  year = 2026
}: SiteFooterProps) {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: tokens.spacing['12'],
        padding: `${tokens.spacing['20']} ${tokens.spacing['8']}`,
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
        textAlign: 'center' as const,
        borderTop: `1px solid ${tokens.color.line}`,
      }}
    >
      {/* Brand */}
      <motion.div
        className="footer-brand"
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: tokens.spacing['4'],
        }}
      >
        <img 
          src="/aksos-symbol-traced.svg" 
          alt="AKSOS" 
          style={{
            width: tokens.spacing['10'],
            height: tokens.spacing['10'],
          }}
        />
        <span 
          style={{
            fontFamily: tokens.font.serif,
            fontSize: tokens.text['2xl'],
            fontWeight: tokens.weight.semibold,
            color: tokens.color.ink,
            letterSpacing: tokens.letterSpacing.tight,
          }}
        >
          AKSOS
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="footer-tagline"
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.lg,
          color: tokens.color.muted,
          lineHeight: tokens.lineHeight.relaxed,
          maxWidth: tokens.layout.contentWidth,
          margin: '0 auto',
        }}
      >
        {tagline}
      </motion.p>

      {/* Meta */}
      <motion.p
        className="footer-meta"
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          fontFamily: tokens.font.mono,
          fontSize: tokens.text.sm,
          color: tokens.color.muted,
          letterSpacing: tokens.letterSpacing.wide,
        }}
      >
        {location} &middot; Zimbabwe / {year}
      </motion.p>
    </motion.footer>
  );
}
