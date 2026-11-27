import {
  LifeBuoy, Scale, HeartPulse, Banknote, ShieldAlert, CheckCircle2, XCircle, HandHeart,
} from 'lucide-react';
import {
  COMPENSATION_TIERS, COMPENSATION_STEPS, COMPENSATION_ELIGIBLE, COMPENSATION_FUND,
} from '../lib/compensation';
import { Reveal, SectionHeading } from './ui';

const TIER_ICONS: Record<string, typeof LifeBuoy> = {
  sos: LifeBuoy,
  money: Banknote,
  scale: Scale,
  heart: HeartPulse,
};

export default function Compensation() {
  const pct = Math.min(Math.round((COMPENSATION_FUND.raised / COMPENSATION_FUND.goal) * 100), 100);

  return (
    <section id="compensation" className="bg-navy-700 py-20 sm:py-24">
      <div className="container-x">
        <div className="rounded-xl2 border-2 border-gold-400/70 p-6 sm:p-10">
          <SectionHeading
            dark
            label="Compensation"
            title="Victim Compensation Fund"
            subtitle="Lost money to a scam? You may qualify for help. We don't promise full recovery, but we fight for partial compensation, emergency support & legal recovery."
          />

          {/* Tier cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {COMPENSATION_TIERS.map((t, i) => {
              const Icon = TIER_ICONS[t.icon] ?? LifeBuoy;
              return (
                <Reveal key={t.title} delay={i * 100}>
                  <article className="flex h-full flex-col rounded-xl2 bg-navy-600/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-navy-600">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-gold-400/15">
                        <Icon className="h-6 w-6 text-gold-400" />
                      </span>
                      <span className="rounded-full bg-gold-400 px-3 py-1 font-mono text-xs font-bold text-navy-700">
                        {t.amount}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-white">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300">{t.description}</p>
                    <a href="#apply-compensation" className="btn-gold mt-auto !mt-6 w-full px-4 py-2 text-xs">
                      Apply Now
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* How it works */}
          <Reveal>
            <h3 className="mt-14 text-center font-heading text-xl font-bold text-white sm:text-2xl">
              How Compensation Works — 4 Steps
            </h3>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COMPENSATION_STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-xl2 bg-white/5 p-6">
                  <span className="font-mono text-3xl font-bold text-gold-400/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-2 text-base font-bold text-white">{s.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-300">{s.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Eligibility checklist */}
          <Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-xl2 border border-white/10 bg-white/5 p-6 sm:p-7">
                <h4 className="flex items-center gap-2 text-base font-bold text-white">
                  <ShieldAlert className="h-5 w-5 text-gold-400" /> Eligibility Checklist
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {COMPENSATION_ELIGIBLE.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm text-gray-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-400" />
                      {e}
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 border-t border-white/10 pt-3 text-sm text-gray-200">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    We do <strong>NOT</strong> compensate if you have no proof or report is fake.
                    All cases are verified to prevent fraud.
                  </li>
                </ul>
              </div>

              {/* Fund progress */}
              <div className="flex flex-col justify-center rounded-xl2 bg-gradient-to-br from-gold-400/15 to-transparent p-6 sm:p-7">
                <HandHeart className="h-7 w-7 text-gold-400" />
                <h4 className="mt-3 text-base font-bold text-white">Compensation Fund Progress</h4>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-2xl font-bold text-white">
                      ${COMPENSATION_FUND.raised.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-300">raised of ${COMPENSATION_FUND.goal.toLocaleString()}</p>
                  </div>
                  <p className="text-right">
                    <span className="font-mono text-xl font-bold text-gold-400">{pct}%</span>
                    <span className="block text-xs text-gray-300">
                      {COMPENSATION_FUND.victims} victims helped
                    </span>
                  </p>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Compensation fund progress">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <a href="#donate" className="btn-gold mt-6 w-full">DONATE TO COMPENSATION FUND</a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
