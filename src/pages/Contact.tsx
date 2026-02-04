import { useState, type ChangeEvent, type FormEvent } from 'react';
import FormField from '../components/FormField';
import { validateContact } from '../utils/validate';
import type { ContactValues } from '../utils/validate';

const initialValues: ContactValues = {
  name: '',
  email: '',
  role: '',
  message: '',
};

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Contact</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Request a demo</h1>
      <p className="mt-3 text-sm text-chalk-300">
        Tell us about your district or school. We will design a demo around your priorities.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Contact form</div>
          <div className="mt-6 grid gap-4">
            <FormField
              label="Full name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Alex Morgan"
            />
            <FormField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="alex@district.edu"
            />
            <FormField
              label="Role / Title"
              name="role"
              value={values.role}
              onChange={handleChange}
              error={errors.role}
              placeholder="Director of Curriculum"
            />
            <FormField
              label="What are you solving for?"
              name="message"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              multiline
              placeholder="Tell us about goals, timelines, and student needs."
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900 transition-transform hover:shadow-soft active:scale-95"
          >
            Send request
          </button>
          {submitted && (
            <div className="mt-4 rounded-xl border border-lime-400/40 bg-navy-950/70 p-3 text-xs text-lime-400">
              Thanks! We will reach out within 1 business day.
            </div>
          )}
        </form>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Request a Demo</div>
            <p className="mt-3 text-sm text-chalk-300">
              Receive a 30-minute walkthrough tailored to your standards, data requirements, and rollout timeline.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-chalk-300">
              <li>• Demo environments ready in 48 hours</li>
              <li>• Custom sample classrooms</li>
              <li>• Security & privacy documentation</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-lime-400">HQ</div>
            <p className="mt-3 text-sm text-chalk-300">
              2450 Mission Bay Drive<br />
              San Francisco, CA 94158<br />
              (415) 555-0132
            </p>
            <p className="mt-3 text-xs text-chalk-500">Open to district visits by appointment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



