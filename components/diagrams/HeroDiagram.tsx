'use client';

import { motion } from 'framer-motion';
import { DiagramContainer, Signal, ConnectionLine, NetworkNode, SystemLabel } from '../primitives';
import { motionPresets } from '@/lib/motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// HERO DIAGRAM: SIGNAL SCATTER → CONNECTION
// 
// Question: "Why can't I see the relationships in my information?"
// Purpose: Introduce the SEE phase - signals are fragmented
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES (0 0 100 100)
// - Deterministic coordinates: YES
// - Semantic nodes: YES (operator, signals)
// - Semantic connections: YES (contextual)
// - Reserved label space: YES
// - Responsive behavior: YES (node reduction on mobile)
// =============================================================================

interface HeroDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function HeroDiagram({ breakpoint = 'desktop' }: HeroDiagramProps) {
  // CENTER point for operator
  const CENTER = { x: 50, y: 50 };
  
  // Node configuration with semantic meaning
  const signals = [
    // Primary signals (always visible)
    { id: 'policy', x: 20, y: 20, label: 'POLICY', category: 'policy' as const, role: 'primary' as const },
    { id: 'expansion', x: 80, y: 30, label: 'EXPANSION', category: 'company' as const, role: 'primary' as const },
    { id: 'capital', x: 85, y: 70, label: 'CAPITAL', category: 'capital' as const, role: 'primary' as const },
    { id: 'project', x: 25, y: 75, label: 'PROJECT', category: 'project' as const, role: 'primary' as const },
    { id: 'relationship', x: 50, y: 15, label: 'RELATIONSHIP', category: 'relationship' as const, role: 'primary' as const },
    { id: 'event', x: 15, y: 50, label: 'EVENT', category: 'event' as const, role: 'primary' as const },
    
    // Secondary signals (visible on tablet+)
    { id: 'government', x: 30, y: 10, label: 'GOVT', category: 'policy' as const, role: 'secondary' as const },
    { id: 'investor', x: 75, y: 20, label: 'INVESTOR', category: 'capital' as const, role: 'secondary' as const },
    { id: 'supplier', x: 90, y: 50, label: 'SUPPLIER', category: 'company' as const, role: 'secondary' as const },
    { id: 'competitor', x: 10, y: 80, label: 'COMPETITOR', category: 'company' as const, role: 'secondary' as const },
    
    // Tertiary signals (visible on desktop only)
    { id: 'institution', x: 20, y: 85, label: 'INSTITUTION', category: 'company' as const, role: 'tertiary' as const },
    { id: 'market', x: 80, y: 85, label: 'MARKET', category: 'event' as const, role: 'tertiary' as const },
  ];

  // Filter signals based on breakpoint
  const visibleSignals = signals.filter(signal => {
    if (breakpoint === 'mobile') return signal.role === 'primary';
    if (breakpoint === 'tablet') return signal.role !== 'tertiary';
    return true; // desktop: all signals
  });

  // Connections: contextual relationships between signals
  // These will animate in sequence
  const connections = [
    { from: { x: 20, y: 20 }, to: { x: 80, y: 30 }, type: 'contextual' as const, delay: 0.3 },
    { from: { x: 80, y: 30 }, to: { x: 85, y: 70 }, type: 'contextual' as const, delay: 0.4 },
    { from: { x: 85, y: 70 }, to: { x: 25, y: 75 }, type: 'contextual' as const, delay: 0.5 },
    { from: { x: 25, y: 75 }, to: { x: 20, y: 20 }, type: 'contextual' as const, delay: 0.6 },
    { from: { x: 50, y: 15 }, to: { x: 20, y: 20 }, type: 'contextual' as const, delay: 0.7 },
    { from: { x: 50, y: 15 }, to: { x: 80, y: 30 }, type: 'contextual' as const, delay: 0.8 },
    { from: { x: 15, y: 50 }, to: { x: 20, y: 20 }, type: 'contextual' as const, delay: 0.9 },
    { from: { x: 15, y: 50 }, to: { x: 25, y: 75 }, type: 'contextual' as const, delay: 1.0 },
  ];

  // Filter connections based on visible signals
  const visibleConnections = connections.filter(conn => {
    const fromSignal = signals.find(s => 
      Math.abs(s.x - conn.from.x) < 5 && Math.abs(s.y - conn.from.y) < 5
    );
    const toSignal = signals.find(s => 
      Math.abs(s.x - conn.to.x) < 5 && Math.abs(s.y - conn.to.y) < 5
    );
    
    if (!fromSignal || !toSignal) return false;
    
    const fromVisible = visibleSignals.some(s => s.id === fromSignal.id);
    const toVisible = visibleSignals.some(s => s.id === toSignal.id);
    
    return fromVisible && toVisible;
  });

  return (
    <DiagramContainer aspectRatio={1.33} viewBox="0 0 100 100">
      {/* Background - subtle grid for precision feel */}
      <rect x="0" y="0" width="100" height="100" fill="transparent" />
      
      {/* Operator at center (YOU) - Primary node */}
      <NetworkNode
        x={CENTER.x}
        y={CENTER.y}
        label="YOU"
        category="operator"
        role="primary"
        size="lg"
      />
      
      {/* Title at bottom - explains the system */}
      <SystemLabel
        x={50}
        y={95}
        text="OPERATOR-CENTRIC INTELLIGENCE SYSTEM"
        position="bottom"
        size="sm"
        delay={1.2}
      />
      
      {/* Signals - scattered around operator */}
      {visibleSignals.map((signal, index) => (
        <Signal
          key={signal.id}
          x={signal.x}
          y={signal.y}
          label={signal.label}
          category={signal.category}
          size={signal.role === 'primary' ? 'md' : 'sm'}
          delay={index * 0.05}
        />
      ))}
      
      {/* Connections - animated lines between related signals */}
      {visibleConnections.map((connection, index) => (
        <ConnectionLine
          key={index}
          from={connection.from}
          to={connection.to}
          type={connection.type}
          delay={connection.delay}
        />
      ))}
      
      {/* Subtle operator visibility cone (optional) */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={25}
        fill="none"
        stroke={tokens.color.line}
        strokeWidth={0.2}
        strokeDasharray="2,2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </DiagramContainer>
  );
}
