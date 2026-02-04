import { Link } from 'react-router-dom';

export default function CTABanner() {
  return (
    <section className="rounded-3xl border border-lime-400/40 bg-navy-900/80 p-8 text-center md:p-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Next step</div>
      <h3 className="mt-4 text-2xl font-semibold text-chalk-50 md:text-3xl">
        Put the Learning Lab in front of your educators
      </h3>
      <p className="mt-3 text-sm text-chalk-300">
        Launch within 30 days with onboarding, coaching, and district-ready analytics.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link
          to="/contact"
          className="rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900 transition-transform hover:shadow-soft active:scale-95"
        >
          Request a Demo
        </Link>
        <Link
          to="/schools-districts"
          className="rounded-full border border-chalk-700/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-chalk-50 transition-transform hover:border-lime-400/50 active:scale-95"
        >
          District Rollout
        </Link>
      </div>
    </section>
  );
}

