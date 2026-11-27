import { HeartPulse, GraduationCap, Siren, Building2, ArrowRight, Download } from 'lucide-react';
import { PROGRAMS } from '../lib/data';
import { Reveal, SectionHeading } from './ui';

const ICONS: Record<string, typeof HeartPulse> = {
  heart: HeartPulse,
  graduation: GraduationCap,
  siren: Siren,
  building: Building2,
};

const CARD_GRADIENTS: Record<string, string> = {
  'victim-support': 'from-brand-500 to-brand-700',
  education: 'from-gold-400 to-gold-600',
  'reporting-hub': 'from-navy-500 to-navy-700',
  business: 'from-success-500 to-success-700',
};

export default function Programs() {
  return (
    <section id="programs" className="bg-white py-20 dark:bg-navy-900 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="Our Programs"
          title="Four Fronts. One Fight."
          subtitle="From the moment money leaves your account to the moment a scammer is reported — we have a program built for it."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PROGRAMS.map((p, i) => {
            const Icon = ICONS[p.icon] ?? Siren;
            return (
              <Reveal key={p.id} delay={i * 100}>
                <article className="card group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift">
                  {/* Visual header */}
                  <div className={`relative h-32 bg-gradient-to-br ${CARD_GRADIENTS[p.id]} p-5`}>
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 70% 60%, white 2px, transparent 2px)',
                        backgroundSize: '44px 44px',
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-navy-700 dark:text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{p.description}</p>
                    <ul className="mt-4 space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                      <a
                        href={p.id === 'reporting-hub' ? '#report' : '#contact'}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:gap-2 transition-all"
                      >
                        Learn More <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                      {p.id === 'education' ? (
                        <button
                          type="button"
                          className="btn-outline ml-auto px-4 py-2 text-xs"
                          onClick={() => window.alert('The free SCG Cyber Safety Guide download will begin shortly (PDF, 2.1 MB).')}
                        >
                          <Download className="h-3.5 w-3.5" /> Free Guide
                        </button>
                      ) : (
                        <a href={p.id === 'reporting-hub' ? '#report' : '#contact'} className="btn-red ml-auto px-4 py-2 text-xs">
                          Apply Now
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
