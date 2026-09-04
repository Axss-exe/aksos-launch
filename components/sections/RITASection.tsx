'use client';

import { motion } from 'framer-motion';
import { RITAPathDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: RITA (Full-Width System Scene)
// 
// Purpose: Explain RITA - the relationship layer
// Visitor Question: "How do relationships become stories?"
// New Idea: RITA transforms relationships into actionable intelligence
// Evidence: RITA path diagram showing relationship transformation
// Interaction: Scroll-triggered path animation
// Transition: Scroll to Perspective section
// 
// Doctrine Compliance:
// - Pattern: Full-width system scene
// - Density: High
// - Rhythm: Continue deep dive
// - Visual: Path diagram shows relationship flow
// =============================================================================

interface RITASectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function RITASection({ breakpoint = 'desktop' }: RITASectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="rita"
      className="rita-section section-full-width"
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
          RITA
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
          RITA: How relationships become stories.
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
          <RITAPathDiagram breakpoint={breakpoint} />
        </motion.div>
        
        {/* Explanation */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
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
              A relationship is an edge.
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
              A story is a path.
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
              RITA helps you see the paths.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              So you can tell the stories.
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
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['2xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              RITA transforms relationships into actionable intelligence.
            </p>
          </motion.div>
        </motion.div>
        
        {/* 6 Steps */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              marginBottom: tokens.spacing['8'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            It helps you follow six steps:
          </motion.p>
          
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
              gap: tokens.spacing['6'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                01
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Source
              </p>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                02
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Event
              </p>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                03
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Entity
              </p>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                04
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Relationship
              </p>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                05
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Context
              </p>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.xs,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                06
              </span>
              <p 
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.relaxed,
                }}
              >
                Story
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          style={{
            textAlign: isMobile ? 'left' : 'center',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.6 }}
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
