'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel, FlowStep } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SYSTEM ARCHITECTURE DIAGRAM: ATIS + RITA + BATANA
// 
// Question: "What is the system?"
// Purpose: Show the three-layer architecture
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (Signals, ATIS, Understanding, RITA, Relationships, Batana, Action)
// - Semantic connections: YES (direct flow)
// - Reserved label space: YES
// - Responsive behavior: YES (vertical on mobile)
// =============================================================================

interface SystemArchitectureDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function SystemArchitectureDiagram({ breakpoint = 'desktop' }: SystemArchitectureDiagramProps) {
  const isMobile = breakpoint === 'mobile';
  
  // Horizontal layout for desktop/tablet
  const horizontalPositions = {
    signals: { x: 10, y: 50 },
    atis: { x: 30, y: 50 },
    understanding: { x: 50, y: 50 },
    rita: { x: 70, y: 50 },
    relationships: { x: 90, y: 50 },
    batana: { x: 50, y: 70 },
    action: { x: 50, y: 85 },
  };
  
  // Vertical layout for mobile
  const verticalPositions = {
    signals: { x: 50, y: 15 },
    atis: { x: 50, y: 25 },
    understanding: { x: 50, y: 38 },
    rita: { x: 50, y: 50 },
    relationships: { x: 50, y: 62 },
    batana: { x: 50, y: 75 },
    action: { x: 50, y: 88 },
  };
  
  const positions = isMobile ? verticalPositions : horizontalPositions;

  // Flow connections
  const connections = [
    { from: positions.signals, to: positions.atis, type: 'direct' as const, delay: 0.3 },
    { from: positions.atis, to: positions.understanding, type: 'direct' as const, delay: 0.4 },
    { from: positions.understanding, to: positions.rita, type: 'direct' as const, delay: 0.5 },
    { from: positions.rita, to: positions.relationships, type: 'direct' as const, delay: 0.6 },
    { from: positions.relationships, to: positions.batana, type: 'contextual' as const, delay: 0.7, curved: true, controlPoint: isMobile ? { x: 50, y: 68 } : { x: 70, y: 60 } },
    { from: positions.batana, to: positions.action, type: 'direct' as const, delay: 0.8 },
  ];

  // Nodes
  const nodes = [
    { id: 'signals', x: positions.signals.x, y: positions.signals.y, label: 'SIGNALS', category: 'signal' as const, role: 'primary' as const },
    { id: 'atis', x: positions.atis.x, y: positions.atis.y, label: 'ATIS', category: 'system' as const, role: 'primary' as const },
    { id: 'understanding', x: positions.understanding.x, y: positions.understanding.y, label: 'UNDERSTANDING', category: 'context' as const, role: 'primary' as const },
    { id: 'rita', x: positions.rita.x, y: positions.rita.y, label: 'RITA', category: 'system' as const, role: 'primary' as const },
    { id: 'relationships', x: positions.relationships.x, y: positions.relationships.y, label: 'RELATIONSHIPS', category: 'context' as const, role: 'primary' as const },
    { id: 'batana', x: positions.batana.x, y: positions.batana.y, label: 'BATANA', category: 'system' as const, role: 'primary' as const },
    { id: 'action', x: positions.action.x, y: positions.action.y, label: 'ACTION', category: 'context' as const, role: 'primary' as const },
  ];

  // System labels
  const systemLabels = [
    { x: positions.atis.x, y: positions.atis.y - 8, text: 'INTELLIGENCE', position: 'top' as const, size: 'sm' as const, delay: 0.4 },
    { x: positions.rita.x, y: positions.rita.y - 8, text: 'INVESTIGATION', position: 'top' as const, size: 'sm' as const, delay: 0.6 },
    { x: positions.batana.x, y: positions.batana.y - 8, text: 'HUMAN', position: 'top' as const, size: 'sm' as const, delay: 0.8 },
  ];

  // Transformation labels (for horizontal layout)
  const transformationLabels = isMobile ? [] : [
    { x: 20, y: 50, text: 'SIGNAL', position: 'bottom' as const, size: 'sm' as const, delay: 0.3 },
    { x: 40, y: 50, text: '2192', position: 'bottom' as const, size: 'sm' as const, delay: 0.35 },
    { x: 60, y: 50, text: 'RELATIONSHIP', position: 'bottom' as const, size: 'sm' as const, delay: 0.5 },
    { x: 80, y: 50, text: '2192', position: 'bottom' as const, size: 'sm' as const, delay: 0.55 },
    { x: 50, y: 78, text: 'CONTEXT', position: 'top' as const, size: 'sm' as const, delay: 0.7 },
    { x: 50, y: 88, text: '2192', position: 'top' as const, size: 'sm' as const, delay: 0.75 },
  ];

  return (
    <DiagramContainer aspectRatio={isMobile ? 0.8 : 2} viewBox={isMobile ? "0 0 100 100" : "0 0 100 50"}>
      <rect x="0" y="0" width={isMobile ? "100" : "100"} height={isMobile ? "100" : "50"} fill="transparent" />
      
      {/* Connections first (so they're behind nodes) */}
      {connections.map((conn, index) => (
        <ConnectionLine
          key={index}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
          curved={conn.curved}
          controlPoint={conn.controlPoint}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
          category={node.category}
          role={node.role}
          size={node.id === 'atis' || node.id === 'rita' || node.id === 'batana' ? 'lg' : 'md'}
        />
      ))}
      
      {/* System labels */}
      {systemLabels.map((label, index) => (
        <SystemLabel
          key={`sys-${index}`}
          x={label.x}
          y={label.y}
          text={label.text}
          position={label.position}
          size={label.size}
          delay={label.delay}
        />
      ))}
      
      {/* Transformation labels */}
      {transformationLabels.map((label, index) => (
        <SystemLabel
          key={`trans-${index}`}
          x={label.x}
          y={label.y}
          text={label.text}
          position={label.position}
          size={label.size}
          delay={label.delay}
        />
      ))}
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={isMobile ? 97 : 95}
        text="SIGNAL 2192 RELATIONSHIP 2192 CONTEXT 2192 UNDERSTANDING 2192 OPPORTUNITY 2192 ACTION"
        position="bottom"
        size="sm"
        delay={1.2}
      />
    </DiagramContainer>
  );
}
