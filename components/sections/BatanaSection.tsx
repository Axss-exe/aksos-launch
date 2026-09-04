'use client';

import { motion } from 'framer-motion';
import { BatanaFlowDiagram, NetworkGrowthDiagram } from '../diagrams';
import { tokens } from '@/lib/tokens';
import Link from 'next/link';

// =============================================================================
// SECTION: BATANA (Full-Width System Scene)
// 
// Purpose: Explain Batana - the human layer
// Visitor Question: "What is Batana?"
// New Idea: Batana is the community of operators using ATIS+RITA
// Evidence: Batana flow diagram and network growth diagram
// Interaction: Scroll-triggered animation
// Transition: Scroll to Network section
// 
// Doctrine Compliance:
// - Pattern: Full-width system scene
// - Density: High
// - Rhythm: Return to system focus
// - Visual: Flow diagram shows human transformation
// =============================================================================

interface BatanaSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function BatanaSection({ breakpoint = 'desktop' }: BatanaSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="batana-section"
      className="batana-section section-full-width"
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
          BATANA
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
          Batana: A network of exceptional operators.
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
          <BatanaFlowDiagram breakpoint={breakpoint} />
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
              Batana is a network of exceptional operators.
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
              People who are already doing the work.
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
              People who are already setting the standard.
            </p>
            
            <p 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.relaxed,
              }}
            >
              People who are willing to help build the systems that support the work.
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
              Batana is the community that brings ATIS and RITA to life.
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
                Person / Organization
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
                Objective
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
                Understanding
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
                Intelligence
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
                Opportunity
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
                Action
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Network Growth Diagram */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <NetworkGrowthDiagram breakpoint={breakpoint} />
        </motion.div>
        
        {/* Conclusion */}
        <motion.div
          style={{
            textAlign: isMobile ? 'left' : 'center',
          }}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
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
            Batana starts with a small group and grows.
          </p>
          
          <motion.div
            style={{
              marginTop: tokens.spacing['8'],
            }}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.8 }}
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
      </motion.div>
    </section>
  );
}
