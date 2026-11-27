import { useState } from 'react';
import {
  Twitter, Instagram, Facebook, Linkedin, Youtube, Mail, MapPin, Phone, Send, Loader2, CheckCircle2, ShieldCheck,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Logo } from './Header';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Victim Stories', href: '#stories' },
  { label: 'Report a Scam', href: '#report' },
  { label: 'Blog & Alerts', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
];

const PROGRAM_LINKS = [
  'Victim Support Fund',
  'Global Education',
  'Reporting Hub',
  'Cyber Safety for Businesses',
];

const SOCIALS = [
  { icon: Twitter, label: 'X (Twitter)' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      return;
    }
    setState('sending');
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email: email.trim().toLowerCase() }, { onConflict: 'email' });
    if (error) {
      setState('error');
      return;
    }
    setState('done');
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-navy-900 text-gray-300">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        {/* About */}
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-gray-400">
            A registered non-profit protecting people online. We help victims report and
            recover, educate communities, and work with EFCC, FBI IC3 &amp; Interpol
            partners to stop scammers worldwide.
          </p>
          <div className="mt-5 space-y-2.5 text-sm">
            <p className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-gold-400" /> +234-XXX-XXX-XXXX (24/7)</p>
            <p className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-gold-400" /> partners@stopcybercrimeglobally.org</p>
            <p className="flex items-center gap-2.5"><MapPin className="h-4 w-4 shrink-0 text-gold-400" /> Lagos · London · Remote worldwide</p>
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-gold-400">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Programs */}
        <nav aria-label="Programs">
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Programs</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {PROGRAM_LINKS.map((p) => (
              <li key={p}>
                <a href="#programs" className="transition-colors hover:text-gold-400">{p}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter + socials */}
        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Stay Alert</h3>
          <p className="mt-5 text-sm text-gray-400">
            Get new scam alerts and safety tips in your inbox. No spam, ever.
          </p>
          {state === 'done' ? (
            <p className="mt-4 flex items-center gap-2 rounded-xl2 bg-success-500/10 px-4 py-3 text-sm font-semibold text-success-400">
              <CheckCircle2 className="h-4 w-4" /> You're subscribed. Stay safe!
            </p>
          ) : (
            <form onSubmit={subscribe} noValidate className="mt-4">
              <div className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl2 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
                />
                <button type="submit" disabled={state === 'sending'} aria-label="Subscribe" className="btn-red !px-4">
                  {state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              {state === 'error' && <p className="field-error" role="alert">Please enter a valid email address.</p>}
            </form>
          )}
          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#home"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-brand-500 hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="#home"
              aria-label="TikTok"
              className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-xs font-bold text-gray-400 transition-all hover:bg-brand-500 hover:text-white"
            >
              TT
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-gray-500 md:flex-row md:text-left">
          <p>© 2026 STOP CYBERCRIME GLOBALLY. We fight cybercrime, we never fund it.</p>
          <p className="max-w-xl">
            SCG is not a police agency. We are a non-profit that helps victims file correctly
            to EFCC, FBI IC3, Interpol, Action Fraud, Europol and 20+ partner agencies worldwide.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-success-500" />
            We are a registered non-profit. EIN / CAC Number: [PLACEHOLDER]
          </p>
        </div>
      </div>
    </footer>
  );
}
