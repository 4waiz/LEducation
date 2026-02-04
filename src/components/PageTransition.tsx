import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionDurations } from '../hooks/useMotionDurations';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { medium } = useMotionDurations();

  return (
    <motion.main
      className="relative z-10"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: medium, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}
