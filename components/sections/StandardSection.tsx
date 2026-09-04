'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: STANDARD (Statement-First)
// 
// Purpose: Set the standard for the work
// Visitor Question: "What is the standard?"
// New Idea: The standard is set by the work
// Evidence: None (text-only section)
// Interaction: None
// Transition: Scroll to Access section
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Low
// - Rhythm: Pause/reflection point
// - Visual: Clean typography
// =============================================================================

interface StandardSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function StandardSection({ breakpoint = 'desktop' }: StandardSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="standard"
      className="standard-section section-statement-first"
      style={{
        backgroundColor: tokens.color.paper,
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
          THE STANDARD
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
          The standard is set by the work.
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
            That's what we're building toward.
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
            A new standard for what's possible.
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
            A new standard for the work.
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
            A new standard for the systems that support it.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
