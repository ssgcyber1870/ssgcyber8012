import { Target, Eye, HeartHandshake, Lock, Zap, Users, ShieldCheck } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const VALUES = [
  { icon: ShieldCheck, title: 'Trust', desc: 'Every case is handled with verified processes and discretion.' },
  { icon: Eye, title: 'Transparency', desc: 'We publish where every donation goes, every year.' },
  { icon: Zap, title: 'Speed', desc: 'First response within hours — recovery windows close fast.' },
  { icon: Lock, title: 'Confidentiality', desc: 'Your identity is protected by default, always.' },
];

const TIMELINE = [
  { year: '2024', title: 'Founded', desc: 'SCG Global launched after a wave of romance and job scams swept through West Africa.' },
  { year: '2025', title: '1,000 Victims Supported', desc: 'Our first milestone: a thousand victims helped with filings, disputes and counselling.' },
  { year: '2026', title: 'Global Expansion', desc: 'Operations now span 45+ countries with partner liaison to EFCC, FBI IC3 and Interpol units.' },
];

export default function About() {
  return (
    <section id="about" className="bg-light py-20 dark:bg-navy-800 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="About Us"
          title="Why We Exist"
          subtitle="Cybercrime is now the world's third-largest economy. We exist so that no victim faces it alone — and no scammer works unseen."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Visual panel */}
          <Reveal>
            <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-navy-700 to-navy-900 p-8 shadow-lift sm:p-10">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex gap-3">
                  {[
                    { icon: Target, t: 'Mission', d: 'Protect people, help victims report and recover, and make cybercrime unprofitable worldwide.' },
                    { icon: Eye, t: 'Vision', d: 'A world where every person can live, trade and love online without fear of being scammed.' },
                  ].map((v) => (
                    <div key={v.t} className="flex-1 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
                      <v.icon className="h-6 w-6 text-gold-400" />
                      <h3 className="mt-3 text-base font-bold text-white">{v.t}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-300">{v.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
                  <HeartHandshake className="h-6 w-6 text-brand-400" />
                  <h3 className="mt-3 text-base font-bold text-white">One Promise</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-300">
                    We fight cybercrime, we never fund it. Every action we take is in the open, measured and reported.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Values */}
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="card h-full p-6 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-500/10">
                    <v.icon className="h-5 w-5 text-brand-500" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-700 dark:text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-gradient-to-r from-brand-500 via-gold-400 to-success-500 md:block" aria-hidden="true" />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 150}>
                <div className="relative">
                  <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-navy-700 font-mono text-xs font-bold text-gold-400 ring-4 ring-light dark:ring-navy-800">
                    {t.year}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-700 dark:text-white">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GetInvolvedBand() {
  return (
    <section className="bg-navy-700 py-14">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-xl2 bg-gold-400/15">
            <Users className="h-7 w-7 text-gold-400" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">Join 500+ volunteers fighting back</h2>
            <p className="mt-1 text-sm text-gray-300">Legal, counselling, tech and translation skills all needed.</p>
          </div>
        </div>
        <a href="#volunteer" className="btn-gold shrink-0">VOLUNTEER WITH US</a>
      </div>
    </section>
  );
}
