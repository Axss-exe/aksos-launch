'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: NETWORK (Statement-First)
// 
// Purpose: Explain the network effect
// Visitor Question: "What happens when more people join?"
// New Idea: The network gets stronger as more operators join
// Evidence: None (text-only section)
// Interaction: None
// Transition: Scroll to Vision section
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Low
// - Rhythm: Build momentum
// - Visual: Clean typography
// =============================================================================

interface NetworkSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function NetworkSection({ breakpoint = 'desktop' }: NetworkSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="network"
      className="network-section section-statement-first"
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
          THE NETWORK
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
          The network gets stronger as more operators join.
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
            More operators means more perspective.
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
            More perspective means more signal.
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
            More signal means more understanding.
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
            More understanding means better decisions.
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
            Better decisions mean better outcomes.
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
            And the cycle continues.
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
          transition={{ duration: 0.5, delay: 0.9 }}
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
