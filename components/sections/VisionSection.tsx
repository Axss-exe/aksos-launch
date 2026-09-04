'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: VISION (Statement-First)
// 
// Purpose: Share the vision
// Visitor Question: "What is the vision?"
// New Idea: A world where all operators have the systems they deserve
// Evidence: None (text-only section)
// Interaction: None
// Transition: Scroll to Final CTA section
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Low
// - Rhythm: Inspire/close
// - Visual: Clean typography
// =============================================================================

interface VisionSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function VisionSection({ breakpoint = 'desktop' }: VisionSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="vision"
      className="vision-section section-statement-first"
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
          THE VISION
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
          A world where all operators have the systems they deserve.
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
            That's the world we're building toward.
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
            A world where every operator has access to the systems they need.
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
            A world where every operator can see what they're missing.
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
            A world where every operator can do their best work.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
