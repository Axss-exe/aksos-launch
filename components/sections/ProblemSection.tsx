'use client';

import { motion } from 'framer-motion';
import { ProblemDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: PROBLEM (Statement-First)
// 
// Purpose: Define the problem - good operators held back by weak systems
// Visitor Question: "Why can't I see the full picture?"
// New Idea: Systems create blind spots
// Evidence: Blind spots diagram
// Interaction: None (static diagram)
// Transition: Scroll to Ally section
// 
// Doctrine Compliance:
// - Pattern: Statement-first
// - Density: Medium
// - Rhythm: Contrast after high-density hero
// - Visual: Diagram supports text
// =============================================================================

interface ProblemSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ProblemSection({ breakpoint = 'desktop' }: ProblemSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      className="problem-section section-statement-first"
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
          maxWidth: '1200px',
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
          THE PROBLEM
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
            maxWidth: '600px',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Good operators can still be held back by weak systems.
        </motion.h2>
        
        {/* Diagram - Visual evidence */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['12'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProblemDiagram breakpoint={breakpoint} />
        </motion.div>
        
        {/* Supporting Explanation */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['8'],
            maxWidth: '800px',
            margin: '0 auto',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You can know your market and still miss a signal.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You can have strong relationships and still lack the information to act on them.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You can see an opportunity and still struggle to move quickly enough.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You can be excellent at the work and still spend too much time finding, checking and connecting information.
          </p>
        </motion.div>
        
        {/* Conclusion */}
        <motion.div
          style={{
            marginTop: tokens.spacing['12'],
            textAlign: isMobile ? 'left' : 'center',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              marginBottom: tokens.spacing['2'],
            }}
          >
            The operator isn't always the problem.
          </h3>
          
          <h3 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
            }}
          >
            Sometimes the system around them is.
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}
