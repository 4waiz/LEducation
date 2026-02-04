import { AnimatePresence, motion } from 'framer-motion';
import { useMotionDurations } from '../hooks/useMotionDurations';
import type { CaseStudy } from '../types';

export default function CaseStudyDetailModal({
  study,
  onClose,
}: {
  study: CaseStudy | null;
  onClose: () => void;
}) {
  const { medium } = useMotionDurations();

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-panel max-w-xl rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: medium }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-lime-400">{study.segment}</div>
                <div className="mt-2 text-xl font-semibold text-chalk-50">{study.title}</div>
                <div className="mt-1 text-sm text-chalk-400">Subject: {study.subject}</div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-chalk-700/60 px-3 py-1 text-xs uppercase tracking-[0.2em]"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-chalk-300">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-chalk-500">Challenge</div>
                <p>{study.challenge}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-chalk-500">Solution</div>
                <p>{study.solution}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-chalk-500">Results</div>
                <ul className="mt-2 grid gap-1">
                  {study.results.map((result) => (
                    <li key={result}>• {result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

