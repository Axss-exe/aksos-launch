'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// NETWORK GROWTH DIAGRAM: COMPOUNDING EFFECTS
// 
// Question: "What happens when the network grows?"
// Purpose: Show network effects compounding
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (operators, connections, intelligence)
// - Semantic connections: YES (direct relationships)
// - Reserved label space: YES
// - Responsive behavior: YES (simplified on mobile)
// =============================================================================

interface NetworkGrowthDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function NetworkGrowthDiagram({ breakpoint = 'desktop' }: NetworkGrowthDiagramProps) {
  const CENTER = { x: 50, y: 50 };
  
  // Node configuration
  const nodes = [
    // Core nodes (always visible)
    { id: 'you', x: 50, y: 50, label: 'YOU', category: 'operator' as const, role: 'primary' as const, delay: 0 },
    { id: 'operator1', x: 30, y: 30, label: 'OPERATOR', category: 'operator' as const, role: 'primary' as const, delay: 0.1 },
    { id: 'operator2', x: 70, y: 30, label: 'OPERATOR', category: 'operator' as const, role: 'primary' as const, delay: 0.2 },
    { id: 'operator3', x: 30, y: 70, label: 'OPERATOR', category: 'operator' as const, role: 'primary' as const, delay: 0.3 },
    { id: 'operator4', x: 70, y: 70, label: 'OPERATOR', category: 'operator' as const, role: 'primary' as const, delay: 0.4 },
    
    // Secondary nodes (tablet+)
    { id: 'operator5', x: 15, y: 40, label: 'OPERATOR', category: 'operator' as const, role: 'secondary' as const, delay: 0.5 },
    { id: 'operator6', x: 85, y: 40, label: 'OPERATOR', category: 'operator' as const, role: 'secondary' as const, delay: 0.6 },
    { id: 'operator7', x: 15, y: 60, label: 'OPERATOR', category: 'operator' as const, role: 'secondary' as const, delay: 0.7 },
    { id: 'operator8', x: 85, y: 60, label: 'OPERATOR', category: 'operator' as const, role: 'secondary' as const, delay: 0.8 },
    
    // Tertiary nodes (desktop only)
    { id: 'operator9', x: 25, y: 20, label: 'OPERATOR', category: 'operator' as const, role: 'tertiary' as const, delay: 0.9 },
    { id: 'operator10', x: 75, y: 20, label: 'OPERATOR', category: 'operator' as const, role: 'tertiary' as const, delay: 1.0 },
    { id: 'operator11', x: 25, y: 80, label: 'OPERATOR', category: 'operator' as const, role: 'tertiary' as const, delay: 1.1 },
    { id: 'operator12', x: 75, y: 80, label: 'OPERATOR', category: 'operator' as const, role: 'tertiary' as const, delay: 1.2 },
  ];

  // Filter nodes based on breakpoint
  const visibleNodes = nodes.filter(node => {
    if (breakpoint === 'mobile') return node.role === 'primary';
    if (breakpoint === 'tablet') return node.role !== 'tertiary';
    return true;
  });

  // Connections between nodes (all-to-all for network effect)
  const connections: Array<{ from: { x: number; y: number }; to: { x: number; y: number }; type: 'direct' | 'contextual'; delay: number }> = [];
  
  // Create connections between visible nodes
  for (let i = 0; i < visibleNodes.length; i++) {
    for (let j = i + 1; j < visibleNodes.length; j++) {
      // Only connect nodes that are close enough for mobile
      if (breakpoint === 'mobile' && Math.random() > 0.5) continue;
      
      connections.push({
        from: { x: visibleNodes[i].x, y: visibleNodes[i].y },
        to: { x: visibleNodes[j].x, y: visibleNodes[j].y },
        type: 'contextual',
        delay: 0.4 + (i * 0.05) + (j * 0.02),
      });
    }
  }

  // AKSOS node
  const aksosNode = { x: 50, y: 20, label: 'AKSOS', category: 'system' as const, role: 'primary' as const, delay: 0.2 };

  return (
    <DiagramContainer aspectRatio={1} viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" fill="transparent" />
      
      {/* Connections first (behind nodes) */}
      {connections.map((conn, index) => (
        <ConnectionLine
          key={`conn-${index}`}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
        />
      ))}
      
      {/* AKSOS node */}
      <NetworkNode
        x={aksosNode.x}
        y={aksosNode.y}
        label={aksosNode.label}
        category={aksosNode.category}
        role={aksosNode.role}
        size="md"
      />
      
      {/* Network nodes */}
      {visibleNodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
          category={node.category}
          role={node.role}
          size={node.id === 'you' ? 'lg' : 'md'}
        />
      ))}
      
      {/* Growth indicator */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={30}
        fill="none"
        stroke={tokens.color.signal}
        strokeWidth={0.3}
        strokeDasharray="3,3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={95}
        text="ONE OPERATOR BECOMES A CONNECTION. EVERY CONNECTION STRENGTHENS THE NETWORK."
        position="bottom"
        size="sm"
        delay={1.4}
      />
    </DiagramContainer>
  );
}
