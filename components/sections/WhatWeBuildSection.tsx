'use client';

import { motion } from 'framer-motion';
import { SystemArchitectureDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION: WHAT WE BUILD (Diagram-First)
// 
// Purpose: Show the system architecture
// Visitor Question: "What is the system?"
// New Idea: ATIS+RITA+Batana = SIGNAL→RELATIONSHIP→CONTEXT→UNDERSTANDING→OPPORTUNITY→ACTION
// Evidence: System architecture flow diagram
// Interaction: Scroll-triggered path tracing
// Transition: Scroll to ATIS section
// 
// Doctrine Compliance:
// - Pattern: Diagram-first
// - Density: High
// - Rhythm: Return to high density
// - Visual: Diagram communicates the system
// =============================================================================

interface WhatWeBuildSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function WhatWeBuildSection({ breakpoint = 'desktop' }: WhatWeBuildSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="what-we-build"
      className="what-we-build-section section-diagram-first"
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
          WHAT WE BUILD
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
          So we build the things that should already exist.
        </motion.h2>
        
        {/* Diagram - Primary evidence */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SystemArchitectureDiagram breakpoint={breakpoint} />
        </motion.div>
        
        {/* System Overview - Grid of ATIS, RITA, Batana */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: tokens.spacing['12'],
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* ATIS */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['4'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['4'] }}>
              <img 
                src="/atis-symbol-traced.svg" 
                alt="ATIS" 
                style={{
                  width: tokens.spacing['10'],
                  height: tokens.spacing['10'],
                }}
              />
              <h3 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                ATIS
              </h3>
            </div>
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Helps see what connects.
            </p>
          </motion.div>
          
          {/* RITA */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['4'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['4'] }}>
              <img 
                src="/rita-symbol-traced.svg" 
                alt="RITA" 
                style={{
                  width: tokens.spacing['10'],
                  height: tokens.spacing['10'],
                }}
              />
              <h3 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                RITA
              </h3>
            </div>
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Helps follow the relationships.
            </p>
          </motion.div>
          
          {/* Batana */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['4'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing['4'] }}>
              <div 
                style={{
                  width: tokens.spacing['10'],
                  height: tokens.spacing['10'],
                  backgroundColor: tokens.color.signal,
                  borderRadius: tokens.border.radius.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span 
                  style={{
                    fontFamily: tokens.font.mono,
                    fontSize: tokens.text.sm,
                    color: tokens.color.paper,
                    fontWeight: tokens.weight.bold,
                  }}
                >
                  B
                </span>
              </div>
              <h3 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                BATANA
              </h3>
            </div>
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              Helps us understand who we're helping.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Flow visualization */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: tokens.spacing['4'],
            flexWrap: 'wrap',
            padding: tokens.spacing['8'],
            backgroundColor: tokens.color.paper,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.md,
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            PERSON / ORGANIZATION
          </span>
          <span 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
              color: tokens.color.lineStrong,
            }}
          >
            {String.fromCharCode(8594)}
          </span>
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            BATANA
          </span>
          <span 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
              color: tokens.color.lineStrong,
            }}
          >
            {String.fromCharCode(8595)}
          </span>
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            UNDERSTANDING
          </span>
          <span 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
              color: tokens.color.lineStrong,
            }}
          >
            {String.fromCharCode(8595)}
          </span>
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            ATIS + RITA
          </span>
          <span 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
              color: tokens.color.lineStrong,
            }}
          >
            {String.fromCharCode(8595)}
          </span>
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            STRONGER SYSTEM
          </span>
          <span 
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['2xl'],
              color: tokens.color.lineStrong,
            }}
          >
            {String.fromCharCode(8595)}
          </span>
          <span 
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
            }}
          >
            STRONGER OPERATOR
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
