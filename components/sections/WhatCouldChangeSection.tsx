'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 04: WHAT COULD CHANGE?
// 
// Purpose: Transition from problem to possibility
// Visitor Reaction: "What if this ecosystem could actually be made visible?"
// 
// Requirements:
// - Ask: What becomes possible when ecosystem becomes easier to see?
// - Expansive visual composition
// - Begin sparse, gradually reveal ecosystem elements
// - Visually transition from FRAGMENTED/OBSCURED to VISIBLE/CONNECTED/UNDERSTANDABLE
// - Graphic placeholder with exact dimensions
//
// Doctrine Compliance:
// - Pattern: Diagram-first (expansive)
// - Density: Medium
// - Rhythm: Conceptual turning point
// - Visual: Large interactive visual placeholder
// =============================================================================

interface WhatCouldChangeSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function WhatCouldChangeSection({ breakpoint = 'desktop' }: WhatCouldChangeSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="what-could-change"
      className="what-could-change-section"
      style={{
        backgroundColor: tokens.color.paper,
        padding: `${tokens.spacing['24']} ${tokens.spacing['8']}`,
        position: 'relative',
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
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
            letterSpacing: tokens.letterSpacing.widest,
            marginBottom: tokens.spacing['4'],
            textTransform: 'uppercase',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          WHAT COULD CHANGE?
        </motion.p>
        
        {/* Main Heading */}
        <motion.h2
          className="section-heading"
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? tokens.text['4xl'] : tokens.text['6xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            letterSpacing: tokens.letterSpacing.tight,
            marginBottom: tokens.spacing['12'],
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What becomes possible when an ecosystem becomes easier to see?
        </motion.h2>
        
        {/* Graphic Placeholder - Large expansive visual */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GraphicPlaceholder
            title="GRAPHIC PLACEHOLDER  WHAT COULD CHANGE"
            description="Expansive visualization: Gradually revealing people, enterprises, institutions, projects, capital, policy, markets, relationships forming a visible, connected, understandable ecosystem"
            aspectRatio={21 / 9}
            minHeight={isMobile ? '350px' : '500px'}
            bgColor={tokens.color.background}
            borderColor={tokens.color.line}
          />
        </motion.div>
        
        {/* Supporting Text */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['8'],
            maxWidth: '900px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Imagine if the rich activity across African markets could be made visible.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Not just as scattered data points, but as a coherent, connected ecosystem.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Where you can see who exists, what they do, how they relate.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Where opportunities become visible before they pass by.
          </p>
        </motion.div>
        
        {/* Transition Statement */}
        <motion.div
          style={{
            marginTop: tokens.spacing['16'],
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['4xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.signal,
              lineHeight: tokens.lineHeight.tight,
              letterSpacing: tokens.letterSpacing.tight,
            }}
          >
            FRAGMENTED / OBSCURED
          </h3>
          
          <motion.div
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['6xl'],
              color: tokens.color.lineStrong,
              margin: `${tokens.spacing['6']} 0`,
            }}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {String.fromCharCode(8595)}
          </motion.div>
          
          <h3 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['4xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.green,
              lineHeight: tokens.lineHeight.tight,
              letterSpacing: tokens.letterSpacing.tight,
            }}
          >
            VISIBLE / CONNECTED / UNDERSTANDABLE
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhatCouldChangeSection;
