import { motion } from 'framer-motion';
import { useMotionDurations } from '../hooks/useMotionDurations';

const capabilities = [
  {
    title: 'Interactive Whiteboard',
    description: 'Sketch concepts and convert to clean diagrams instantly.',
  },
  {
    title: 'Standards Mapping',
    description: 'Curriculum tags for each lesson and assessment.',
  },
  {
    title: 'Differentiation Toolkit',
    description: 'Multi-modal supports for diverse learners.',
  },
  {
    title: 'Progress Telemetry',
    description: 'Privacy-respectful dashboards for mastery progress.',
  },
];

export default function CapabilityCards() {
  const { medium } = useMotionDurations();

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {capabilities.map((capability, index) => (
        <motion.div
          key={capability.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: medium, delay: index * 0.08 }}
          whileHover={{ y: -4 }}
          className="play-card rounded-2xl p-5 transition-transform"
        >
          <div className="text-base font-semibold text-chalk-50">{capability.title}</div>
          <p className="mt-2 text-sm text-chalk-300">{capability.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

