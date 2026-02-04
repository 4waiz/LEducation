import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import HeroWhiteboard from '../components/HeroWhiteboard';
import FeatureCards from '../components/FeatureCards';
import CapabilityCards from '../components/CapabilityCards';
import SubjectTiles from '../components/SubjectTiles';
import CaseStudyCard from '../components/CaseStudyCard';
import MetricCounter from '../components/MetricCounter';
import DividerParallaxBand from '../components/DividerParallaxBand';
import CTABanner from '../components/CTABanner';
import { caseStudies } from '../data/caseStudies';

const trustItems = [
  'FERPA/GDPR-ready data handling',
  'WCAG-aligned accessibility practices',
  'Secure SSO and roster sync',
];

export default function Home() {
  return (
    <div>
      <HeroWhiteboard />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Value proposition</div>
            <h2 className="mt-4 text-3xl font-semibold text-chalk-50">
              Standards-aligned learning with a lab-grade feedback loop
            </h2>
            <p className="mt-3 text-sm text-chalk-300">
              LEducation pairs mastery-based pacing with privacy-respectful analytics, giving teachers the clarity to
              intervene at the right moment without extra prep time.
            </p>
          </div>
          <div className="grid gap-4">
            <MetricCounter value={42} label="Increase in module completion" />
            <MetricCounter value={28} label="Average time saved per teacher" suffix=" hrs" />
            <MetricCounter value={19} label="Lift in student engagement" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-chalk-500">Trusted workflows</div>
          <div className="mt-4 grid gap-4 text-sm text-chalk-300 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item}
                className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-lime-400/30 hover:bg-navy-950/40"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-lime-400/40 text-lime-400">
                  <FiCheckCircle size={16} />
                </span>
                <span>{item}</span>
                <span className="ml-auto h-0.5 w-6 origin-left scale-x-0 bg-lime-400 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Capabilities</div>
        <h2 className="mt-4 text-3xl font-semibold text-chalk-50">Key product pillars</h2>
        <p className="mt-3 text-sm text-chalk-300">
          Designed with educators, built for scale, and instrumented for measurable outcomes.
        </p>
        <div className="mt-8">
          <FeatureCards />
        </div>
        <div className="mt-8">
          <CapabilityCards />
        </div>
      </section>

      <DividerParallaxBand />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Subjects</div>
        <h2 className="mt-4 text-3xl font-semibold text-chalk-50">Built for core and emerging disciplines</h2>
        <p className="mt-3 text-sm text-chalk-300">
          Flexible pathways across math, science, CS, literacy, social studies, and design.
        </p>
        <div className="mt-8">
          <SubjectTiles />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Success stories</div>
            <h2 className="mt-4 text-3xl font-semibold text-chalk-50">District-ready results</h2>
          </div>
          <div className="text-sm text-chalk-300">Evidence-based outcomes in 90 days.</div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.id} study={study} onSelect={() => {}} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-lime-400/40 bg-navy-900/70 p-6 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Compliance-ready</div>
          <p className="mt-3 text-sm text-chalk-300">
            FERPA/GDPR-ready workflows, SOC-aligned practices, and accessibility-first design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <CTABanner />
      </section>
    </div>
  );
}
