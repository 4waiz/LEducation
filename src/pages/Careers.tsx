import { useState, type ChangeEvent, type FormEvent } from 'react';
import FormField from '../components/FormField';
import { jobs } from '../data/jobs';
import { validateApplication } from '../utils/validate';
import type { ApplicationValues } from '../utils/validate';

const initialValues: ApplicationValues = {
  name: '',
  email: '',
  role: '',
  portfolio: '',
  summary: '',
};

export default function Careers() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateApplication(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Careers</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Build the future of learning</h1>
      <p className="mt-3 text-sm text-chalk-300">
        Join a team of designers, engineers, and educators crafting high-trust learning experiences.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-chalk-50">{job.title}</div>
                <div className="mt-1 text-xs text-chalk-400">
                  {job.location} · {job.remote ? 'Remote friendly' : 'On-site'}
                </div>
              </div>
              <span className="rounded-full border border-lime-400/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-lime-400">
                Open
              </span>
            </div>
            <p className="mt-3 text-sm text-chalk-300">{job.description}</p>
            <ul className="mt-3 grid gap-1 text-xs text-chalk-400">
              {job.requirements.map((req) => (
                <li key={req}>• {req}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Benefits</div>
          <h2 className="mt-3 text-2xl font-semibold text-chalk-50">Culture of clarity and care</h2>
          <ul className="mt-4 grid gap-2 text-sm text-chalk-300">
            <li>• Flexible hybrid schedules with focused collaboration windows</li>
            <li>• Learning stipends and conference budgets</li>
            <li>• Annual community impact days</li>
            <li>• Transparent career ladders and mentorship</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Apply</div>
          <h2 className="mt-3 text-2xl font-semibold text-chalk-50">Tell us about you</h2>
          <div className="mt-6 grid gap-4">
            <FormField
              label="Full name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Jordan Rivera"
            />
            <FormField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="jordan@school.edu"
            />
            <FormField
              label="Role of interest"
              name="role"
              value={values.role}
              onChange={handleChange}
              error={errors.role}
              placeholder="Frontend Engineer"
            />
            <FormField
              label="Portfolio / LinkedIn"
              name="portfolio"
              value={values.portfolio}
              onChange={handleChange}
              error={errors.portfolio}
              placeholder="https://"
            />
            <FormField
              label="Why LEducation"
              name="summary"
              value={values.summary}
              onChange={handleChange}
              error={errors.summary}
              multiline
              placeholder="Share your mission alignment..."
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900 transition-transform hover:shadow-soft active:scale-95"
          >
            Submit application
          </button>
          {submitted && (
            <div className="mt-4 rounded-xl border border-lime-400/40 bg-navy-950/70 p-3 text-xs text-lime-400">
              Thanks! Our team will review your application shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}



