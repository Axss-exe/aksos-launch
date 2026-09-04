'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// ALLY DIAGRAM: OPERATOR-CENTRIC NETWORK
// 
// Question: "How does AKSOS help?"
// Purpose: Show AKSOS extending operator's visibility
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (operator, AKSOS, signals, context)
// - Semantic connections: YES (direct: operator-AKSOS, contextual: AKSOS-signals)
// - Reserved label space: YES
// - Responsive behavior: YES
// =============================================================================

interface AllyDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function AllyDiagram({ breakpoint = 'desktop' }: AllyDiagramProps) {
  const CENTER = { x: 50, y: 50 };
  
  // AKSOS position (ally, not center)
  const AKSOS_POSITION = { x: 70, y: 40 };
  
  // Signals that operator can see alone
  const operatorSignals = [
    { id: 'market', x: 30, y: 30, label: 'MARKET', category: 'context' as const, role: 'primary' as const },
    { id: 'relationships', x: 35, y: 55, label: 'RELATIONSHIPS', category: 'context' as const, role: 'primary' as const },
    { id: 'expertise', x: 25, y: 45, label: 'EXPERTISE', category: 'context' as const, role: 'primary' as const },
  ];
  
  // Signals that AKSOS helps reveal
  const aksosSignals = [
    { id: 'policy', x: 85, y: 20, label: 'POLICY', category: 'policy' as const, role: 'primary' as const },
    { id: 'capital', x: 90, y: 50, label: 'CAPITAL', category: 'capital' as const, role: 'primary' as const },
    { id: 'project', x: 80, y: 70, label: 'PROJECT', category: 'project' as const, role: 'primary' as const },
    { id: 'opportunity', x: 60, y: 20, label: 'OPPORTUNITY', category: 'context' as const, role: 'primary' as const },
    
    // Secondary (tablet+)
    { id: 'institution', x: 95, y: 30, label: 'INSTITUTION', category: 'context' as const, role: 'secondary' as const },
    { id: 'competitor', x: 55, y: 15, label: 'COMPETITOR', category: 'company' as const, role: 'secondary' as const },
  ];

  const visibleAksosSignals = aksosSignals.filter(s => {
    if (breakpoint === 'mobile') return s.role === 'primary';
    return true;
  });

  // Connections from operator to their signals (what they can see alone)
  const operatorConnections = [
    { from: CENTER, to: { x: 30, y: 30 }, type: 'direct' as const, delay: 0.3 },
    { from: CENTER, to: { x: 35, y: 55 }, type: 'direct' as const, delay: 0.4 },
    { from: CENTER, to: { x: 25, y: 45 }, type: 'direct' as const, delay: 0.5 },
  ];

  // Connections from AKSOS to additional signals (what AKSOS helps see)
  const aksosConnections = [
    { from: AKSOS_POSITION, to: { x: 85, y: 20 }, type: 'contextual' as const, delay: 0.6 },
    { from: AKSOS_POSITION, to: { x: 90, y: 50 }, type: 'contextual' as const, delay: 0.7 },
    { from: AKSOS_POSITION, to: { x: 80, y: 70 }, type: 'contextual' as const, delay: 0.8 },
    { from: AKSOS_POSITION, to: { x: 60, y: 20 }, type: 'contextual' as const, delay: 0.9 },
  ];

  // Connection from operator to AKSOS (ally relationship)
  const allyConnection = {
    from: CENTER,
    to: AKSOS_POSITION,
    type: 'direct' as const,
    delay: 0.2,
  };

  return (
    <DiagramContainer aspectRatio={1.5} viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" fill="transparent" />
      
      {/* Operator at center */}
      <NetworkNode
        x={CENTER.x}
        y={CENTER.y}
        label="YOU"
        category="operator"
        role="primary"
        size="lg"
      />
      
      {/* AKSOS as ally */}
      <NetworkNode
        x={AKSOS_POSITION.x}
        y={AKSOS_POSITION.y}
        label="AKSOS"
        category="system"
        role="primary"
        size="lg"
      />
      
      {/* Operator's direct connections (what they can see) */}
      {operatorConnections.map((conn, index) => (
        <ConnectionLine
          key={`op-${index}`}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
        />
      ))}
      
      {/* AKSOS connections (what it helps see) */}
      {aksosConnections.map((conn, index) => (
        <ConnectionLine
          key={`aksos-${index}`}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
        />
      ))}
      
      {/* Ally connection between operator and AKSOS */}
      <ConnectionLine
        from={allyConnection.from}
        to={allyConnection.to}
        type={allyConnection.type}
        delay={allyConnection.delay}
      />
      
      {/* Operator's signals */}
      {operatorSignals.map((signal, index) => (
        <NetworkNode
          key={signal.id}
          x={signal.x}
          y={signal.y}
          label={signal.label}
          category={signal.category}
          role={signal.role}
          size="md"
        />
      ))}
      
      {/* AKSOS-revealed signals */}
      {visibleAksosSignals.map((signal, index) => (
        <NetworkNode
          key={signal.id}
          x={signal.x}
          y={signal.y}
          label={signal.label}
          category={signal.category}
          role={signal.role}
          size="md"
        />
      ))}
      
      {/* Extended visibility area (subtle) */}
      <motion.ellipse
        cx={AKSOS_POSITION.x}
        cy={AKSOS_POSITION.y}
        rx={25}
        ry={15}
        fill="none"
        stroke={tokens.color.signal}
        strokeWidth={0.3}
        strokeDasharray="2,2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={95}
        text="AKSOS EXTENDS YOUR VISIBILITY"
        position="bottom"
        size="sm"
        delay={1.2}
      />
    </DiagramContainer>
  );
}
