import { useMemo } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useMotionDurations() {
  const prefersReduced = usePrefersReducedMotion();

  return useMemo(
    () => ({
      prefersReduced,
      fast: prefersReduced ? 0.01 : 0.25,
      medium: prefersReduced ? 0.01 : 0.4,
      slow: prefersReduced ? 0.01 : 0.6,
    }),
    [prefersReduced]
  );
}

