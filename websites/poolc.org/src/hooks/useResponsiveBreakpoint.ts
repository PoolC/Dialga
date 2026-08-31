import { useEffect, useState } from 'react';
import { breakpoints } from '~/styles/responsive';

export type ResponsiveBreakpoint = 'phone' | 'compact' | 'tablet' | 'desktop';

const getResponsiveBreakpoint = (width: number): ResponsiveBreakpoint => {
  if (width < breakpoints.phone) return 'phone';
  if (width < breakpoints.compact) return 'compact';
  if (width < breakpoints.desktop) return 'tablet';
  return 'desktop';
};

export const useResponsiveBreakpoint = (): ResponsiveBreakpoint => {
  const [breakpoint, setBreakpoint] = useState<ResponsiveBreakpoint>(() => (
    typeof window === 'undefined' ? 'desktop' : getResponsiveBreakpoint(window.innerWidth)
  ));

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getResponsiveBreakpoint(window.innerWidth));

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};
