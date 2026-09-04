'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel } from '../primitives';

// =============================================================================
// PROBLEM DIAGRAM: BLIND SPOTS
// 
// Question: "What am I missing?"
// Purpose: Show that operators have limited visibility
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (operator, information sources, blind spots)
// - Semantic connections: YES (visibility cone)
// - Reserved label space: YES
// - Responsive behavior: YES
// =============================================================================

interface ProblemDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ProblemDiagram({ breakpoint = 'desktop' }: ProblemDiagramProps) {
  const CENTER = { x: 50, y: 50 };
  
  // Information sources around the operator
  const sources = [
    { id: 'market', x: 20, y: 20, label: 'MARKET', category: 'context' as const, role: 'primary' as const },
    { id: 'relationships', x: 80, y: 20, label: 'RELATIONSHIPS', category: 'context' as const, role: 'primary' as const },
    { id: 'expertise', x: 85, y: 50, label: 'EXPERTISE', category: 'context' as const, role: 'primary' as const },
    { id: 'information', x: 50, y: 80, label: 'INFORMATION', category: 'context' as const, role: 'primary' as const },
    { id: 'opportunities', x: 15, y: 50, label: 'OPPORTUNITIES', category: 'context' as const, role: 'primary' as const },
    
    // Secondary sources (tablet+)
    { id: 'signals', x: 30, y: 15, label: 'SIGNALS', category: 'signal' as const, role: 'secondary' as const },
    { id: 'data', x: 70, y: 80, label: 'DATA', category: 'signal' as const, role: 'secondary' as const },
    { id: 'knowledge', x: 25, y: 75, label: 'KNOWLEDGE', category: 'context' as const, role: 'secondary' as const },
  ];

  const visibleSources = sources.filter(s => {
    if (breakpoint === 'mobile') return s.role === 'primary';
    return true;
  });

  // Blind spot areas (semi-transparent regions where operator can't see)
  const blindSpots = [
    { x: 10, y: 10, r: 8 },
    { x: 90, y: 10, r: 8 },
    { x: 90, y: 90, r: 8 },
    { x: 10, y: 90, r: 8 },
    { x: 50, y: 10, r: 6 },
    { x: 50, y: 90, r: 6 },
  ];

  // Operator's limited visibility cone (dashed line)
  const visibilityCone = {
    points: [
      { x: 50, y: 50 },
      { x: 30, y: 30 },
      { x: 70, y: 30 },
      { x: 50, y: 50 },
      { x: 70, y: 70 },
      { x: 30, y: 70 },
      { x: 50, y: 50 },
    ]
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
      
      {/* Visibility cone - shows limited view */}
      <path
        d={`M${visibilityCone.points.map(p => `${p.x} ${p.y}`).join(' L')} Z`}
        fill="none"
        stroke={tokens.color.line}
        strokeWidth={0.5}
        strokeDasharray="3,3"
      />
      
      {/* Blind spot regions */}
      {blindSpots.map((spot, index) => (
        <circle
          key={index}
          cx={spot.x}
          cy={spot.y}
          r={spot.r}
          fill={tokens.color.line}
          opacity={0.05}
        />
      ))}
      
      {/* Information sources */}
      {visibleSources.map((source, index) => (
        <NetworkNode
          key={source.id}
          x={source.x}
          y={source.y}
          label={source.label}
          category={source.category}
          role={source.role}
          size="md"
        />
      ))}
      
      {/* Labels for blind spots */}
      <SystemLabel
        x={10}
        y={10}
        text="BLIND SPOT"
        position="top"
        size="sm"
        delay={0.5}
      />
      <SystemLabel
        x={90}
        y={10}
        text="BLIND SPOT"
        position="top"
        size="sm"
        delay={0.6}
      />
      <SystemLabel
        x={90}
        y={90}
        text="BLIND SPOT"
        position="bottom"
        size="sm"
        delay={0.7}
      />
      <SystemLabel
        x={10}
        y={90}
        text="BLIND SPOT"
        position="bottom"
        size="sm"
        delay={0.8}
      />
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={95}
        text="GOOD OPERATORS CAN STILL BE HELD BACK BY WEAK SYSTEMS"
        position="bottom"
        size="sm"
        delay={1.0}
      />
    </DiagramContainer>
  );
}
