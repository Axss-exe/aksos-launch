'use client';

import { motion } from 'framer-motion';
import { PerspectiveDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: PERSPECTIVE (Full-Width System Scene)
// 
// Purpose: Explain why different perspectives matter
// Visitor Question: "Why do different people see different things?"
// New Idea: Different perspectives reveal different relationships
// Evidence: Typography-based perspective diagram
// Interaction: Hover to highlight perspective pairs
// Transition: Scroll to Standard section
// 
// Doctrine Compliance:
// - Pattern: Full-width system scene
// - Density: Medium
// - Rhythm: Conceptual bridge
// - Visual: Typography-based diagram
// =============================================================================

interface PerspectiveSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function PerspectiveSection({ breakpoint = 'desktop' }: PerspectiveSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="perspective"
      className="perspective-section section-full-width"
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
          PERSPECTIVE
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
            marginBottom: tokens.spacing['8'],
            maxWidth: '600px',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Why different people see different things.
        </motion.h2>
        
        {/* Diagram - Primary visual */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PerspectiveDiagram breakpoint={breakpoint} />
        </motion.div>
        
        {/* Explanation */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: tokens.spacing['12'],
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
                marginBottom: tokens.spacing['6'],
              }}
            >
              Different people are exposed to different information.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
                marginBottom: tokens.spacing['6'],
              }}
            >
              Different people have different experiences.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Different people have different relationships.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
                marginBottom: tokens.spacing['6'],
              }}
            >
              Different people see different connections.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
                marginBottom: tokens.spacing['6'],
              }}
            >
              Different people notice different things.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Different people reach different conclusions.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Conclusion */}
        <motion.div
          style={{
            textAlign: isMobile ? 'left' : 'center',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              marginBottom: tokens.spacing['4'],
            }}
          >
            That's why you need systems that can account for perspective.
          </h3>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Systems that can help you see what you're missing.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
