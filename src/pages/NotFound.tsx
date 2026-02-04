import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">404</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">This page went off the board</h1>
      <p className="mt-3 text-sm text-chalk-300">Let us guide you back to the Learning Lab.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900"
      >
        Return home
      </Link>
    </div>
  );
}

