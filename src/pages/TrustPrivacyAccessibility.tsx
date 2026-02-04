import Accordion from '../components/Accordion';
import { faqs } from '../data/faqs';

export default function TrustPrivacyAccessibility() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Trust, Privacy & Accessibility</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Built for district-grade confidence</h1>
      <p className="mt-3 text-sm text-chalk-300">
        LEducation prioritizes student privacy, secure data handling, and accessibility-first design across every
        workflow.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Privacy</div>
          <p className="mt-3 text-sm text-chalk-300">
            Data minimization, encryption in transit and at rest, and transparent retention policies.
          </p>
        </div>
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Security</div>
          <p className="mt-3 text-sm text-chalk-300">
            Role-based access, audit trails, and secure SSO integrations for district environments.
          </p>
        </div>
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Accessibility</div>
          <p className="mt-3 text-sm text-chalk-300">
            WCAG-aligned UX patterns, keyboard navigation, and multimodal supports for learners.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-lime-400/40 bg-navy-900/70 p-6 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Spec sheet</div>
        <p className="mt-2 text-sm text-chalk-300">
          Download the full privacy and accessibility overview for district review.
        </p>
        <a
          href="/spec-sheet.pdf"
          className="mt-4 inline-flex rounded-full border border-lime-400/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400"
        >
          Download spec sheet
        </a>
      </div>

      <div className="mt-12">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">FAQ</div>
        <h2 className="mt-4 text-2xl font-semibold text-chalk-50">Questions districts ask most</h2>
        <div className="mt-6">
          <Accordion items={faqs} />
        </div>
      </div>
    </div>
  );
}

