import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function RouteProgress() {
  const location = useLocation();
  const prefersReduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setProgress(0);
      return;
    }
    setProgress(12);
    const t1 = setTimeout(() => setProgress(52), 120);
    const t2 = setTimeout(() => setProgress(82), 260);
    const t3 = setTimeout(() => setProgress(100), 520);
    const t4 = setTimeout(() => setProgress(0), 780);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname, prefersReduced]);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 h-0.5 w-full bg-transparent">
      <motion.div
        className="h-full bg-lime-400"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ opacity: progress === 0 ? 0 : 1 }}
      />
    </div>
  );
}

