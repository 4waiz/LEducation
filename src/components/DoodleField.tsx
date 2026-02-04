import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function DoodleField() {
  const prefersReduced = usePrefersReducedMotion();
  const float = prefersReduced ? { y: 0 } : { y: [0, -8, 0] };
  const spin = prefersReduced ? { rotate: 0 } : { rotate: [0, 3, 0] };
  const bounce = prefersReduced ? { y: 0 } : { y: [0, -6, 0] };

  return (
    <>
      <motion.div
        className="doodle-letter left-[5%] top-[12%]"
        animate={bounce}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        A
      </motion.div>
      <motion.div
        className="doodle-letter left-[82%] top-[16%]"
        animate={bounce}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        B
      </motion.div>
      <motion.div
        className="doodle-letter left-[10%] top-[78%]"
        animate={bounce}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        C
      </motion.div>
      <motion.div
        className="doodle-pencil left-[70%] top-[62%]"
        animate={spin}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}
