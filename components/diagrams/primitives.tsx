'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// DIAGRAM PRIMITIVES
// Reusable components for building sophisticated diagrams
// =============================================================================

interface Point {
  x: number;
  y: number;
}

// Calculate positions in a circle
// Used for placing nodes evenly around a center point
export function calculateCircularPositions(
  center: Point,
  radius: number,
  count: number,
  startAngle: number = 0
): Point[] {
  const positions: Point[] = [];
  const angleStep = (2 * Math.PI) / count;

  for (let i = 0; i < count; i++) {
    const angle = startAngle + i * angleStep;
    positions.push({
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    });
  }

  return positions;
}

// Calculate text dimensions for proper label placement
export function calculateTextDimensions(
  text: string,
  fontSize: number = 12,
  fontFamily: string = 'monospace'
): { width: number; height: number } {
  // Approximate text dimensions based on character count
  // This is a simplified calculation - for precise measurements, use canvas
  const avgCharWidth = fontSize * 0.6;
  const lineHeight = fontSize * 1.2;
  
  return {
    width: text.length * avgCharWidth,
    height: lineHeight,
  };
}

// Check if a line intersects with a circle
export function lineIntersectsCircle(
  lineFrom: Point,
  lineTo: Point,
  circleCenter: Point,
  circleRadius: number
): boolean {
  const dx = lineTo.x - lineFrom.x;
  const dy = lineTo.y - lineFrom.y;
  const lineLengthSquared = dx * dx + dy * dy;

  if (lineLengthSquared === 0) return false;

  // Vector from line start to circle center
  const fx = lineFrom.x - circleCenter.x;
  const fy = lineFrom.y - circleCenter.y;

  // Projection of circle center onto line
  const t = Math.max(0, Math.min(1, (fx * dx + fy * dy) / lineLengthSquared));

  // Closest point on line to circle center
  const closestX = lineFrom.x + t * dx;
  const closestY = lineFrom.y + t * dy;

  // Distance from closest point to circle center
  const distanceSquared = 
    (closestX - circleCenter.x) ** 2 + (closestY - circleCenter.y) ** 2;

  return distanceSquared < circleRadius * circleRadius;
}

// Generate a curved path (quadratic bezier) that avoids an exclusion zone
export function generateCurvedPath(
  from: Point,
  to: Point,
  exclusionCenter: Point,
  exclusionRadius: number,
  curvature: number = 0.5
): string {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Direction from from to to
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const perpendicular = angle + Math.PI / 2;

  // Calculate if we need to curve around the exclusion zone
  if (lineIntersectsCircle(from, to, exclusionCenter, exclusionRadius)) {
    // Find which side to curve
    const crossProduct = 
      (to.x - from.x) * (exclusionCenter.y - from.y) - 
      (to.y - from.y) * (exclusionCenter.x - from.x);
    
    const direction = crossProduct > 0 ? 1 : -1;
    const offset = exclusionRadius * 1.2 * direction;

    const controlX = midX + Math.cos(perpendicular) * offset * curvature;
    const controlY = midY + Math.sin(perpendicular) * offset * curvature;

    return `M ${from.x} ${from.y} Q ${controlX} ${controlY}, ${to.x} ${to.y}`;
  }

  // No need to curve - use straight line
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

// Breakpoint hook for responsive diagrams
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
}

// Diagram Label Component
export function DiagramLabel({
  x,
  y,
  text,
  textAnchor = 'middle',
  fontSize = 12,
  fill = tokens.color.muted,
  fontFamily = tokens.font.mono,
  letterSpacing = '0.05em',
  ...props
}: {
  x: number;
  y: number;
  text: string;
  textAnchor?: 'start' | 'middle' | 'end';
  fontSize?: number;
  fill?: string;
  fontFamily?: string;
  letterSpacing?: string;
  [key: string]: any;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fontSize={fontSize}
      fill={fill}
      fontFamily={fontFamily}
      letterSpacing={letterSpacing}
      {...props}
    >
      {text}
    </text>
  );
}

// Diagram Node Component
export function DiagramNode({
  x,
  y,
  r = 4,
  fill = tokens.color.ink,
  stroke = tokens.color.line,
  strokeWidth = 0.5,
  label,
  labelPosition = 'bottom',
  labelOffset = 8,
  labelFontSize = 10,
  labelColor = tokens.color.muted,
  labelFontFamily = tokens.font.mono,
  initial,
  whileInView,
  whileHover,
  viewport,
  transition,
  ...props
}: {
  x: number;
  y: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: number;
  labelFontSize?: number;
  labelColor?: string;
  labelFontFamily?: string;
  initial?: any;
  whileInView?: any;
  whileHover?: any;
  viewport?: any;
  transition?: any;
  [key: string]: any;
}) {
  const labelX = useMemo(() => {
    switch (labelPosition) {
      case 'top':
      case 'bottom':
        return x;
      case 'left':
        return x - labelOffset;
      case 'right':
        return x + labelOffset;
      default:
        return x;
    }
  }, [x, labelPosition, labelOffset]);

  const labelY = useMemo(() => {
    switch (labelPosition) {
      case 'top':
        return y - labelOffset;
      case 'bottom':
        return y + labelOffset;
      case 'left':
      case 'right':
        return y;
      default:
        return y + labelOffset;
    }
  }, [y, labelPosition, labelOffset]);

  const textAnchor = useMemo(() => {
    switch (labelPosition) {
      case 'top':
      case 'bottom':
        return 'middle';
      case 'left':
        return 'end';
      case 'right':
        return 'start';
      default:
        return 'middle';
    }
  }, [labelPosition]);

  return (
    <motion.g
      initial={initial || { opacity: 0, scale: 0.5 }}
      whileInView={whileInView || { opacity: 1, scale: 1 }}
      whileHover={whileHover || { scale: 1.15 }}
      viewport={viewport || { once: true, margin: '-100px' }}
      transition={transition || { duration: tokens.animation.duration.normal }}
      {...props}
    >
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      {label && (
        <motion.text
          x={labelX}
          y={labelY}
          textAnchor={textAnchor}
          fontSize={labelFontSize}
          fill={labelColor}
          fontFamily={labelFontFamily}
          letterSpacing="0.05em"
          initial={{ opacity: 0, y: labelPosition === 'top' ? -5 : 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}

// Diagram Connection Component
export function DiagramConnection({
  from,
  to,
  stroke = tokens.color.line,
  strokeWidth = 0.3,
  curved = false,
  curvature = 0.5,
  exclusionZone,
  initial,
  whileInView,
  viewport,
  transition,
  ...props
}: {
  from: Point;
  to: Point;
  stroke?: string;
  strokeWidth?: number;
  curved?: boolean;
  curvature?: number;
  exclusionZone?: { center: Point; radius: number };
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
  [key: string]: any;
}) {
  if (curved && exclusionZone) {
    const path = generateCurvedPath(from, to, exclusionZone.center, exclusionZone.radius, curvature);

    return (
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        initial={initial || { pathLength: 0, opacity: 0 }}
        whileInView={whileInView || { pathLength: 1, opacity: 1 }}
        viewport={viewport || { once: true, margin: '-100px' }}
        transition={transition || { duration: tokens.animation.duration.normal }}
        {...props}
      />
    );
  }

  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      initial={initial || { pathLength: 0, opacity: 0 }}
      whileInView={whileInView || { pathLength: 1, opacity: 1 }}
      viewport={viewport || { once: true, margin: '-100px' }}
      transition={transition || { duration: tokens.animation.duration.normal }}
      {...props}
    />
  );
}

// Grid helper for creating aligned layouts
export function createGrid(
  startX: number,
  startY: number,
  rows: number,
  cols: number,
  cellWidth: number,
  cellHeight: number
): Point[][] {
  const grid: Point[][] = [];

  for (let r = 0; r < rows; r++) {
    const row: Point[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        x: startX + c * cellWidth,
        y: startY + r * cellHeight,
      });
    }
    grid.push(row);
  }

  return grid;
}

// Spring physics for smooth animations
export function useSmoothSpring(value: number, stiffness: number = 100, damping: number = 10): any {
  return useSpring(value, { stiffness, damping });
}

// Transform value with spring physics
export function useTransformSpring(
  value: any,
  inputRange: number[],
  outputRange: number[],
  config?: { stiffness: number; damping: number }
): any {
  const smoothValue = useSmoothSpring(value, config?.stiffness, config?.damping);
  return useTransform(smoothValue, inputRange, outputRange);
}
