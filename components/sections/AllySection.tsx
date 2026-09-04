'use client';

import { motion } from 'framer-motion';
import { AllyDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: ALLY (Asymmetric Editorial)
// 
// Purpose: Introduce AKSOS as ally/infrastructure
// Visitor Question: "Who can help me navigate it?"
// New Idea: AKSOS is the infrastructure that helps you see what you can't see alone
// Evidence: Operator-centric network diagram
// Interaction: None (static diagram)
// Transition: Scroll to What We Build section
// 
// Doctrine Compliance:
// - Pattern: Asymmetric editorial
// - Density: Low
// - Rhythm: Light after problem section
// - Visual: Diagram shows AKSOS extending visibility
// =============================================================================

interface AllySectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function AllySection({ breakpoint = 'desktop' }: AllySectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      className="ally-section section-asymmetric"
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
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: tokens.spacing['16'],
          alignItems: 'center',
        }}
      >
        {/* Left side - Text */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
            THE ALLY
          </motion.p>
          
          <motion.h2
            className="section-heading"
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['5xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              marginBottom: tokens.spacing['8'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            You don't need another company telling you what to do.
          </motion.h2>
          
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['6'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              You need someone who can help you do it better.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Someone who can help strengthen the systems behind your work.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Someone who can help you see what you can't see.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Someone who can build alongside you when the problem is bigger than one person.
            </p>
          </motion.div>
          
          <motion.div
            style={{
              marginTop: tokens.spacing['8'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
              That's the relationship we're trying to build.
            </h3>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Not a vendor.<br />
              Not another dashboard.<br />
              A partner you can lean on when the work matters.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Right side - Diagram */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AllyDiagram breakpoint={breakpoint} />
        </motion.div>
      </motion.div>
    </section>
  );
}
