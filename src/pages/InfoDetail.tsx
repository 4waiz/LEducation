import { Link, useParams } from 'react-router-dom';
import { megaPageBySlug } from '../data/megaPages';

export default function InfoDetail() {
  const { slug } = useParams();
  const page = megaPageBySlug(slug);

  if (!page) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Not Found</div>
        <h1 className="mt-4 text-3xl font-semibold text-chalk-50">We could not find that page</h1>
        <p className="mt-3 text-sm text-chalk-300">Try one of the product or solution pages instead.</p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">{page.category}</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">{page.title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-chalk-300">{page.summary}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Highlights</div>
          <ul className="mt-4 grid gap-2 text-sm text-chalk-300">
            {page.highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Impact Metrics</div>
          <ul className="mt-4 grid gap-2 text-sm text-chalk-300">
            {page.metrics.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <Link
            to={page.ctaHref}
            className="mt-6 inline-flex rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900 transition-transform hover:shadow-soft active:scale-95"
          >
            {page.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
