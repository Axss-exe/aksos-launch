'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 06: ATIS
// 
// Purpose: The intellectual and product centerpiece
// Visitor Reaction: "Wow. I understand what ATIS is actually trying to solve."
// 
// Requirements:
// - Give this section more visual importance than ordinary sections
// - ATIS is not simply a database
// - ATIS exposes ecosystem data coverage and uses that coverage to help people understand
//   what is happening and what it means from a particular perspective
// - Central question: WHAT DOES THIS MEAN FOR ME?
// - Transformation chain: INFORMATION -> DATA COVERAGE -> ECOSYSTEM -> RELATIONSHIPS -> CONTEXT -> PERSPECTIVE -> INTELLIGENCE
// - Perspective: intelligence is interpreted through a target perspective
// - Same event can mean different things to different stakeholders
//
// Doctrine Compliance:
// - Pattern: Statement-first with prominent visualization
// - Density: Medium-High
// - Rhythm: Intellectual centerpiece
// - Visual: Large, important graphic placeholder
// =============================================================================

interface ATISSectionNewProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ATISSectionNew({ breakpoint = 'desktop' }: ATISSectionNewProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="atis"
      className="atis-section-new"
      style={{
        backgroundColor: tokens.color.paper,
        padding: `${tokens.spacing['28']} ${tokens.spacing['8']}`,
        position: 'relative',
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
        borderTop: `1px solid ${tokens.color.line}`,
        borderBottom: `1px solid ${tokens.color.line}`,
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
          ATIS
        </motion.p>
        
        {/* Main Heading - The Central Question */}
        <motion.h2
          className="section-heading"
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? tokens.text['4xl'] : tokens.text['7xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            letterSpacing: tokens.letterSpacing.tight,
            marginBottom: tokens.spacing['16'],
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          # WHAT DOES THIS MEAN FOR ME?
        </motion.h2>
        
        {/* Core Transformation Visualization */}
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
            title="GRAPHIC PLACEHOLDER  ATIS TRANSFORMATION"
            description="Flow: INFORMATION  DATA COVERAGE  ECOSYSTEM  RELATIONSHIPS  CONTEXT  PERSPECTIVE  INTELLIGENCE"
            aspectRatio={21 / 9}
            minHeight={isMobile ? '400px' : '550px'}
            bgColor={tokens.color.background}
            borderColor={tokens.color.signal}
          />
        </motion.div>
        
        {/* Supporting Explanation */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['8'],
            maxWidth: '900px',
            margin: '0 auto',
            marginBottom: tokens.spacing['16'],
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
            ATIS is not simply a database.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            ATIS exposes ecosystem data coverage.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            ATIS uses that coverage to help people understand what is happening.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            ATIS helps people understand what it means from a particular perspective.
          </p>
        </motion.div>
        
        {/* Perspective Explanation */}
        <motion.div
          style={{
            padding: tokens.spacing['12'],
            backgroundColor: tokens.color.background,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.h3
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              marginBottom: tokens.spacing['8'],
            }}
          >
            Perspective Matters
          </motion.h3>
          
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: tokens.spacing['8'],
            }}
          >
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              A critical part of ATIS is that intelligence is interpreted through a target perspective.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              The same event can mean different things to different stakeholders.
            </p>
          </motion.div>
          
          <motion.div
            style={{
              marginTop: tokens.spacing['8'],
              display: 'flex',
              flexWrap: 'wrap',
              gap: tokens.spacing['6'],
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
                backgroundColor: tokens.color.paper,
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: tokens.color.ink,
                }}
              >
                an investor
              </span>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
                backgroundColor: tokens.color.paper,
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: tokens.color.ink,
                }}
              >
                an enterprise
              </span>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
                backgroundColor: tokens.color.paper,
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: tokens.color.ink,
                }}
              >
                a government institution
              </span>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
                backgroundColor: tokens.color.paper,
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: tokens.color.ink,
                }}
              >
                a researcher
              </span>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: `${tokens.spacing['2']} ${tokens.spacing['4']}`,
                backgroundColor: tokens.color.paper,
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  color: tokens.color.ink,
                }}
              >
                an operator
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ATISSectionNew;
