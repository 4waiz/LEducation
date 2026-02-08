import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-chalk-800/60 bg-navy-950/90">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="text-lg font-semibold">LEducation</div>
          <p className="mt-3 text-sm text-chalk-300">
            A mastery-focused learning platform built for standards alignment, accessibility, and measurable outcomes.
          </p>
          <div className="mt-6 text-xs uppercase tracking-[0.3em] text-lime-400">Chalkboard meets future lab</div>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-chalk-100">Product</div>
          <ul className="mt-3 grid gap-2 text-chalk-300">
            <li>
              <Link to="/learning-lab">Learning Lab</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/schools-districts">District Solutions</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-chalk-100">Trust</div>
          <ul className="mt-3 grid gap-2 text-chalk-300">
            <li>
              <Link to="/trust">Privacy & Accessibility</Link>
            </li>
            <li>
              <Link to="/contact">Security Contact</Link>
            </li>
            <li>
              <Link to="/schools-districts">Case Studies</Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-chalk-100">Company</div>
          <ul className="mt-3 grid gap-2 text-chalk-300">
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/">Press Kit</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-chalk-800/60 px-6 py-6 text-center text-xs text-chalk-500">
        Made by Awaiz Ahmed | 0504754950 | Abu Dhabi, UAE | awaiz42ad@gmail.com
      </div>
    </footer>
  );
}

