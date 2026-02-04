import { motion } from 'framer-motion';
import { useMotionDurations } from '../hooks/useMotionDurations';

const features = [
  {
    title: 'Mastery Pathways',
    description: 'Adaptive sequencing that keeps students in the zone of proximal development.',
  },
  {
    title: 'Formative Intelligence',
    description: 'Real-time checks for understanding with actionable next steps.',
  },
  {
    title: 'Teacher Workflow Engine',
    description: 'Automated grouping, feedback cues, and evidence snapshots.',
  },
];

export default function FeatureCards() {
  const { medium } = useMotionDurations();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: medium, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="play-card rounded-2xl p-6 transition-transform"
        >
          <div className="text-sm uppercase tracking-[0.2em] text-lime-400">Capability</div>
          <div className="mt-3 text-lg font-semibold text-chalk-50">{feature.title}</div>
          <p className="mt-3 text-sm text-chalk-300">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

