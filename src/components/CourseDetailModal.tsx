import { AnimatePresence, motion } from 'framer-motion';
import type { Course } from '../types';
import { useMotionDurations } from '../hooks/useMotionDurations';

export default function CourseDetailModal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const { medium } = useMotionDurations();

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: medium }}
            className="glass-panel max-w-lg rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-400">{course.level}</div>
                <div className="mt-2 text-xl font-semibold">{course.title}</div>
                <div className="mt-1 text-sm text-chalk-400">Duration: {course.duration}</div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-chalk-700/60 px-3 py-1 text-xs uppercase tracking-[0.2em]"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-chalk-300">{course.summary}</p>
            <div className="mt-4 text-sm font-semibold text-chalk-100">Learning Outcomes</div>
            <ul className="mt-3 grid gap-2 text-sm text-chalk-300">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>• {outcome}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

