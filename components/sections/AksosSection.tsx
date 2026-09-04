'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 05: AKSOS
// 
// Purpose: Introduce AKSOS as infrastructure/ally
// Visitor Reaction: "I understand why AKSOS exists."
// 
// Requirements:
// - Now introduce AKSOS (only now)
// - Visitor already understands why something like AKSOS needs to exist
// - Asymmetric, human-centered composition
// - Do not use conventional product card
// - Do not show AKSOS as the largest object
// - Operator should remain visually dominant
// - Graphic placeholder with exact dimensions
//
// Doctrine Compliance:
// - Pattern: Asymmetric editorial
// - Density: Medium
// - Rhythm: Introduction of the solution
// - Visual: AKSOS as infrastructure, not hero
// =============================================================================

interface AksosSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function AksosSection({ breakpoint = 'desktop' }: AksosSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="aksos"
      className="aksos-section"
      style={{
        backgroundColor: tokens.color.background,
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
          AKSOS
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
          AKSOS exists to make ecosystems easier to see, understand and participate in.
        </motion.h2>
        
        {/* Asymmetric Layout: Text + Graphic */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
            gap: tokens.spacing['16'],
            alignItems: 'center',
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* LEFT: Human-centered text */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['8'],
            }}
          >
            <motion.div
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              YOU
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
                alignItems: 'center',
              }}
            >
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
            </motion.div>
            
            <motion.div
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              YOUR WORK
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
                alignItems: 'center',
              }}
            >
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
            </motion.div>
            
            <motion.div
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              AKSOS
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
                alignItems: 'center',
              }}
            >
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
              <motion.span
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['4xl'],
                  color: tokens.color.lineStrong,
                }}
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                {String.fromCharCode(8595)}
              </motion.span>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: isMobile ? tokens.text.base : tokens.text.lg,
                  color: tokens.color.green,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                BETTER VISIBILITY
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: isMobile ? tokens.text.base : tokens.text.lg,
                  color: tokens.color.green,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                BETTER CONTEXT
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: isMobile ? tokens.text.base : tokens.text.lg,
                  color: tokens.color.green,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                BETTER UNDERSTANDING
              </span>
            </motion.div>
          </motion.div>
          
          {/* RIGHT: Graphic Placeholder */}
          <motion.div
            style={{
              position: 'relative',
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GraphicPlaceholder
              title="GRAPHIC PLACEHOLDER  AKSOS"
              description="Asymmetric visualization: YOU  YOUR WORK  AKSOS  BETTER VISIBILITY/CONTEXT/UNDERSTANDING. Operator remains visually dominant."
              aspectRatio={16 / 10}
              minHeight={isMobile ? '350px' : '500px'}
              bgColor={tokens.color.paper}
              borderColor={tokens.color.line}
            />
          </motion.div>
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
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You remain the operator.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            AKSOS gives you a better view of the environment you're operating in.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            AKSOS does not position itself as an authority telling people what to do.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            AKSOS is infrastructure. AKSOS is an ally.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AksosSection;
