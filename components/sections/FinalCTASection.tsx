'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: FINAL CTA (Statement-First)
// 
// Purpose: Final call to action
// Visitor Question: "What do I do next?"
// New Idea: Join Batana to help build the future
// Evidence: None (text-only section)
// Interaction: None
// Transition: End of page
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Low
// - Rhythm: Strong close
// - Visual: Clean typography, prominent CTA
// =============================================================================

interface FinalCTASectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function FinalCTASection({ breakpoint = 'desktop' }: FinalCTASectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="final-cta"
      className="final-cta-section section-statement-first"
      style={{
        backgroundColor: tokens.color.background,
        padding: `${tokens.spacing['20']} ${tokens.spacing['8']}`,
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: isMobile ? 'left' : 'center',
        }}
      >
        {/* Section Label */}
        <motion.p
          className="section-label"
          style={{
            fontFamily: tokens.font.mono,
            fontSize: tokens.text.sm,
            color: tokens.color.muted,
            letterSpacing: tokens.letterSpacing.wide,
            marginBottom: tokens.spacing['4'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          THE NEXT STEP
        </motion.p>
        
        {/* Main Heading */}
        <motion.h2
          className="section-heading"
          style={{
            fontFamily: tokens.font.serif,
            fontSize: tokens.text['5xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            marginBottom: tokens.spacing['12'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join Batana.
        </motion.h2>
        
        {/* Explanation */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing['8'],
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Batana is the starting point.
          </motion.p>
          
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            It's where the work begins.
          </motion.p>
          
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            It's where you can help shape what comes next.
          </motion.p>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link 
            href="/batana"
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              textDecoration: 'underline',
              textUnderlineOffset: tokens.spacing['2'],
            }}
          >
            Join Batana
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
