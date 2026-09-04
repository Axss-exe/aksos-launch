'use client';

import { motion } from 'framer-motion';
import { ATISFlowDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: ATIS (Full-Width System Scene)
// 
// Purpose: Explain ATIS - the intelligence layer
// Visitor Question: "How does intelligence emerge?"
// New Idea: ATIS connects signals to reveal meaning
// Evidence: ATIS flow diagram showing signal processing
// Interaction: Scroll-triggered signal animation
// Transition: Scroll to RITA section
// 
// Doctrine Compliance:
// - Pattern: Full-width system scene
// - Density: High
// - Rhythm: Deep dive into system
// - Visual: Flow diagram shows signal transformation
// =============================================================================

interface ATISSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ATISSection({ breakpoint = 'desktop' }: ATISSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="atis"
      className="atis-section section-full-width"
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
          ATIS
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
          ATIS: The system for seeing what connects.
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
          <ATISFlowDiagram breakpoint={breakpoint} />
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
              A company announces an expansion.
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
              A government changes a policy.
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
              Capital moves.
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
              A project begins.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              A new relationship forms.
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
              ATIS connects the signals.
            </p>
          </motion.div>
        </motion.div>
        
        {/* 5 Steps */}
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
            It helps you answer five questions:
          </motion.p>
          
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
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
                What happened?
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
                Who is involved?
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
                What changed?
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
                What connects to it?
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
                What it could mean for you?
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
          transition={{ duration: 0.5, delay: 1.5 }}
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
