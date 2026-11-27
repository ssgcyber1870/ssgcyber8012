import { useEffect, useState } from 'react';
import {
  Menu, X, Globe, Phone, Mail, Shield, Moon, Sun, ChevronRight,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Compensation', href: '#compensation' },
  { label: 'Victim Stories', href: '#stories' },
  { label: 'Report Scam', href: '#report' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5 group" aria-label="STOP CYBERCRIME GLOBALLY home">
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-navy-700 shadow-soft group-hover:shadow-lift transition-shadow">
        <Shield className="h-6 w-6 text-white" strokeWidth={2.2} />
        <span className="absolute h-6 w-6 rounded-full border-2 border-gold-400/80" aria-hidden="true" />
        <span className="absolute w-8 h-[3px] bg-brand-500 rotate-45 rounded-full" aria-hidden="true" />
      </span>
      <span className="font-heading text-sm font-extrabold leading-tight tracking-tight">
        <span className="text-brand-500">STOP</span>{' '}
        <span className={light ? 'text-white' : 'text-navy-700 dark:text-white'}>CYBERCRIME</span>
        <br />
        <span className={`text-[11px] font-bold tracking-[0.22em] ${light ? 'text-gray-300' : 'text-navy-500 dark:text-gray-400'}`}>
          GLOBALLY
        </span>
      </span>
    </a>
  );
}

export default function Header({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div className="hidden md:block bg-navy-700 text-white">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-gold-400" /> 24/7 Scam Helpline: +234-XXX-XXX-XXXX
            </span>
            <a href="mailto:partners@stopcybercrimeglobally.org" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Mail className="h-3 w-3 text-gold-400" /> partners@stopcybercrimeglobally.org
            </a>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <Globe className="h-3 w-3 text-gold-400" />
              <span className="sr-only">Language</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white border-none outline-none cursor-pointer text-xs [&>option]:text-navy-700"
              >
                <option value="EN">English</option>
                <option value="FR">Français</option>
                <option value="ES">Español</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-navy-800/90 backdrop-blur-md shadow-soft'
            : 'bg-white dark:bg-navy-800'
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-700 dark:text-gray-200 hover:text-brand-500 dark:hover:text-gold-400 hover:bg-brand-50 dark:hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onToggleDark}
              className="grid h-10 w-10 place-items-center rounded-xl text-navy-700 dark:text-gold-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <a href="#donate" className="btn-red px-5 py-2.5">DONATE NOW</a>
            <a href="#report" className="btn-gold px-5 py-2.5">REPORT SCAM</a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleDark}
              className="grid h-10 w-10 place-items-center rounded-xl text-navy-700 dark:text-gold-400"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl text-navy-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="lg:hidden border-t border-gray-100 dark:border-white/10 bg-white dark:bg-navy-800 px-4 pb-6 pt-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-navy-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-white/5 hover:text-brand-500"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 opacity-40" />
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a href="#donate" onClick={() => setOpen(false)} className="btn-red">DONATE NOW</a>
              <a href="#report" onClick={() => setOpen(false)} className="btn-gold">REPORT SCAM</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
