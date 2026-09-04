'use client';

import { useState, useEffect } from 'react';
import { tokens } from '@/lib/tokens';

// =============================================================================
// HOOK: useBreakpoint
// 
// Purpose: Detect current responsive breakpoint
// Returns: 'mobile' | 'tablet' | 'desktop'
// 
// Doctrine Compliance:
// - Responsive behavior: Meaning preserved across breakpoints
// - Performance: Single event listener, debounced
// =============================================================================

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const BREAKPOINTS = {
  mobile: parseInt(tokens.breakpoint.sm, 10),
  tablet: parseInt(tokens.breakpoint.md, 10),
  desktop: parseInt(tokens.breakpoint.lg, 10),
} as const;

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    // Check breakpoint on mount
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('mobile');
      } else if (width < BREAKPOINTS.desktop) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Initial check
    checkBreakpoint();

    // Set up resize listener with debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkBreakpoint, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return breakpoint;
}

// Server-side breakpoint detection (for SSR)
export function getBreakpoint(userAgent?: string): Breakpoint {
  // Default to desktop for SSR
  // In practice, you'd use user-agent or device detection
  return 'desktop';
}
