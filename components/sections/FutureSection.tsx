'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 11: THE FUTURE
// 
// Purpose: Manifesto rather than another feature section
// Visitor Reaction: "This could become something much bigger."
// 
// Requirements:
// - After dense network, dramatically reduce visual complexity
// - Give visitor breathing room
// - Concept: ZIMBABWE -> MORE VISIBLE -> MORE UNDERSTANDABLE -> MORE CONNECTED -> AFRICA
// - Do not use: generic Africa maps, flags, safari imagery, continent silhouettes, stock photography, "Africa rising" clichés
// - Ambition should emerge from the system itself
// - Positioning should feel credible: We are starting by making one ecosystem easier to see
//
// Doctrine Compliance:
// - Pattern: Manifesto
// - Density: Low
// - Rhythm: Breathing room after dense sections
// - Visual: Minimal, elegant
// =============================================================================

interface FutureSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function FutureSection({ breakpoint = 'desktop' }: FutureSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="future"
      className="future-section"
      style={{
        backgroundColor: tokens.color.background,
        padding: `${tokens.spacing['32']} ${tokens.spacing['8']}`,
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
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
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
            justifyContent: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          THE FUTURE
        </motion.p>
        
        {/* Graphic Placeholder - Minimal */}
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
            title="GRAPHIC PLACEHOLDER  THE FUTURE"
            description="Minimal visualization: ZIMBABWE  MORE VISIBLE  MORE UNDERSTANDABLE  MORE CONNECTED  AFRICA"
            aspectRatio={16 / 5}
            minHeight={isMobile ? '200px' : '300px'}
            bgColor={tokens.color.paper}
            borderColor={tokens.color.line}
          />
        </motion.div>
        
        {/* Manifesto */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: tokens.spacing['10'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['6'],
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
                letterSpacing: tokens.letterSpacing.tight,
              }}
            >
              ZIMBABWE
            </span>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.tight,
                letterSpacing: tokens.letterSpacing.tight,
              }}
            >
              MORE VISIBLE
            </span>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.tight,
                letterSpacing: tokens.letterSpacing.tight,
              }}
            >
              MORE UNDERSTANDABLE
            </span>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.tight,
                letterSpacing: tokens.letterSpacing.tight,
              }}
            >
              MORE CONNECTED
            </span>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
                letterSpacing: tokens.letterSpacing.tight,
              }}
            >
              AFRICA
            </span>
          </motion.div>
        </motion.div>
        
        {/* Positioning Statement */}
        <motion.div
          style={{
            marginTop: tokens.spacing['16'],
            padding: tokens.spacing['12'],
            backgroundColor: tokens.color.paper,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              margin: 0,
            }}
          >
            <strong style={{ color: tokens.color.ink, fontWeight: tokens.weight.medium }}>We are starting by making one ecosystem easier to see.</strong>
          </motion.p>
          
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              marginTop: tokens.spacing['4'],
            }}
          >
            The ambition emerges from the system itself.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FutureSection;
