import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMotionDurations } from '../hooks/useMotionDurations';
import { megaPagesByCategory } from '../data/megaPages';

const megaMenus = [
  { label: 'Products', category: 'Products' as const },
  { label: 'Solutions', category: 'Solutions' as const },
  { label: 'Resources', category: 'Resources' as const },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Learning Lab', href: '/learning-lab' },
  { label: 'Schools & Districts', href: '/schools-districts' },
  { label: 'Trust', href: '/trust' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { medium } = useMotionDurations();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuItems = useMemo(
    () => ({
      Products: megaPagesByCategory('Products'),
      Solutions: megaPagesByCategory('Solutions'),
      Resources: megaPagesByCategory('Resources'),
    }),
    []
  );

  const closeTimer = useRef<number | null>(null);

  const handleOpenMenu = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleCloseMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-chalk-50">
          <span className="h-9 w-9 rounded-full border border-lime-400/40 bg-navy-900/80 grid place-items-center text-lime-400">
            L
          </span>
          LEducation
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {megaMenus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => handleOpenMenu(menu.label)}
              onMouseLeave={handleCloseMenu}
            >
              <button
                className="text-sm uppercase tracking-[0.2em] text-chalk-200/90 hover:text-chalk-50"
                onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
              >
                {menu.label}
              </button>
              <div
                className={`absolute left-0 top-full mt-4 w-[480px] rounded-2xl border border-chalk-700/40 bg-navy-900/95 p-6 shadow-soft transition-opacity duration-300 ${
                  openMenu === menu.label ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onMouseEnter={() => handleOpenMenu(menu.label)}
                onMouseLeave={handleCloseMenu}
              >
                <div className="grid gap-4">
                  {menuItems[menu.category].map((item) => (
                    <Link
                      key={item.slug}
                      to={`/info/${item.slug}`}
                      className="group/item rounded-xl border border-transparent px-4 py-3 hover:border-lime-400/40 hover:bg-navy-950/70"
                    >
                      <div className="text-sm font-semibold text-chalk-50">{item.title}</div>
                      <div className="text-xs text-chalk-300">{item.summary}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/contact"
            className="rounded-full border border-lime-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400 transition-transform hover:bg-lime-400 hover:text-ink-900 hover:shadow-soft active:scale-95"
          >
            Request Demo
          </NavLink>
        </div>
        <button
          className="flex items-center gap-2 rounded-full border border-chalk-700/60 px-4 py-2 text-sm text-chalk-200 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          Menu
          <span className="h-2 w-2 rounded-full bg-lime-400" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: medium }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-navy-950/95 p-8 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">LEducation</span>
              <button
                className="rounded-full border border-chalk-600/50 px-3 py-1 text-xs uppercase tracking-[0.2em]"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-8 grid gap-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-chalk-700/40 px-4 py-3 text-sm font-medium text-chalk-100 hover:border-lime-400/40 hover:text-lime-400"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-lime-400/40 bg-navy-900/80 p-4 text-sm text-chalk-200">
              Elevate learning workflows with a demo tailored to your district.
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
