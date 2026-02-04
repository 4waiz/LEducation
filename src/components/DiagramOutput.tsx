import { motion } from 'framer-motion';
import { useMotionDurations } from '../hooks/useMotionDurations';

export default function DiagramOutput({
  svg,
  onDownload,
  isGenerating,
  prefersReduced,
}: {
  svg: string | null;
  onDownload: () => void;
  isGenerating: boolean;
  prefersReduced: boolean;
}) {
  const { medium } = useMotionDurations();

  return (
    <div className="relative h-full rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-chalk-400">Diagram Output</div>
      <div className="mt-4 h-56 rounded-xl border border-chalk-800/60 bg-navy-950/80 p-4 [&>svg]:h-full [&>svg]:w-full">
        {svg ? (
          <div
            className="h-full w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-chalk-500">
            Generate to preview a clean diagram
          </div>
        )}
      </div>
      <button
        onClick={onDownload}
        className="mt-4 w-full rounded-full border border-lime-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400 transition-transform hover:bg-lime-400 hover:text-ink-900 hover:shadow-soft active:scale-95"
        disabled={!svg}
      >
        Download PNG
      </button>
      {isGenerating && !prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-2xl border border-lime-400/40 bg-navy-950/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="scanline absolute inset-x-0 top-0 h-16"
            animate={{ y: [0, 180, 0] }}
            transition={{ duration: medium, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 grid place-items-center text-sm uppercase tracking-[0.3em] text-lime-400">
            Diagramizing...
          </div>
        </motion.div>
      )}
      {isGenerating && prefersReduced && (
        <div className="absolute inset-0 grid place-items-center rounded-2xl border border-lime-400/40 bg-navy-950/90 text-sm uppercase tracking-[0.3em] text-lime-400">
          Diagramizing...
        </div>
      )}
    </div>
  );
}

