import { Suspense, lazy, useMemo, useState } from 'react';
import CaseStudyCard from '../components/CaseStudyCard';
import FilterChips from '../components/FilterChips';
import Timeline from '../components/Timeline';
import { caseStudies } from '../data/caseStudies';
import { filterCaseStudies } from '../utils/dataFilters';
import type { CaseStudy } from '../types';

const CaseStudyDetailModal = lazy(() => import('../components/CaseStudyDetailModal'));

const steps = [
  {
    title: 'Discovery & Alignment',
    description: 'Audit standards, align content, and map instructional priorities.',
  },
  {
    title: 'Pilot & Training',
    description: 'Launch a 4-6 week pilot with teacher coaching and feedback loops.',
  },
  {
    title: 'District Rollout',
    description: 'Scale with SSO, roster sync, and centralized analytics dashboards.',
  },
  {
    title: 'Impact Review',
    description: 'Quarterly mastery reviews and continuous improvement cycles.',
  },
];

export default function SchoolsDistricts() {
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const segments = useMemo(() => {
    const unique = Array.from(new Set(caseStudies.map((study) => study.segment)));
    return ['All', ...unique];
  }, []);

  const filtered = filterCaseStudies(caseStudies, segmentFilter === 'All' ? null : segmentFilter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Schools & Districts</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Implementation that respects your timeline</h1>
      <p className="mt-3 text-sm text-chalk-300">
        LEducation pairs district-scale deployment with coaching, onboarding, and measurable impact reviews.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-chalk-500">Rollout timeline</div>
          <div className="mt-6">
            <Timeline steps={steps} />
          </div>
        </div>
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Implementation approach</div>
          <h2 className="mt-3 text-2xl font-semibold text-chalk-50">Change management built in</h2>
          <p className="mt-3 text-sm text-chalk-300">
            We co-design success metrics with district leaders, support teacher onboarding with live facilitation, and
            deliver quarterly impact reviews that tie outcomes to strategy.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-chalk-300">
            <li>• Dedicated success manager and rollout plan</li>
            <li>• On-site or virtual coaching sessions</li>
            <li>• Data dashboards aligned to district goals</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Case studies</div>
        <h2 className="mt-4 text-3xl font-semibold text-chalk-50">Real-world results</h2>
        <div className="mt-4">
          <FilterChips options={segments} value={segmentFilter} onChange={setSegmentFilter} />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((study) => (
            <CaseStudyCard key={study.id} study={study} onSelect={setSelectedStudy} />
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        <CaseStudyDetailModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
      </Suspense>
    </div>
  );
}


