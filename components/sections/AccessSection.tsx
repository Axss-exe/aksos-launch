'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: ACCESS (Statement-First)
// 
// Purpose: Explain access model
// Visitor Question: "How do I get access?"
// New Idea: Access is earned through contribution
// Evidence: None (text-only section)
// Interaction: None
// Transition: Scroll to Batana section
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Low
// - Rhythm: Build anticipation
// - Visual: Clean typography
// =============================================================================

interface AccessSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function AccessSection({ breakpoint = 'desktop' }: AccessSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="access"
      className="access-section section-statement-first"
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
          ACCESS
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
          Systems for the people who set the standard.
        </motion.h2>
        
        {/* Explanation */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing['8'],
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
            We're building systems for the people who set the standard.
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
            People who are already doing the work.
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
            People who are already setting the standard.
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
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            And we're starting with a small group of people who are willing to help us build it.
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
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Access to these systems is earned through contribution.
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
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Contribution to the systems.
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
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Contribution to the work.
          </motion.p>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          style={{
            marginTop: tokens.spacing['12'],
            textAlign: isMobile ? 'left' : 'center',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Link 
            href="/batana"
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
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
