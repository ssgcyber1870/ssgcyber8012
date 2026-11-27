import { useEffect, useState } from 'react';
import { Play, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Counter, Reveal, useInView } from './ui';
import { SCAM_ALERTS } from '../lib/data';

interface Dot {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function useThreatDots(): Dot[] {
  const [dots] = useState<Dot[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 78,
      size: 6 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2.5,
      color: i % 3 === 0 ? 'bg-brand-500' : i % 3 === 1 ? 'bg-gold-400' : 'bg-success-500',
    })),
  );
  return dots;
}

function ThreatMap() {
  const dots = useThreatDots();
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 bg-navy-700 shadow-lift">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      {/* glow arcs */}
      <div className="absolute -left-10 top-1/3 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />

      {dots.map((d, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${d.color} animate-pulseDot`}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* header chip */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-white">LIVE CYBER THREAT MAP</span>
      </div>

      {/* bottom stat chips */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-sm">
          <Activity className="h-3.5 w-3.5 text-gold-400" />
          <span className="font-mono text-[11px] font-semibold text-white">1,284 attacks blocked / hr</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-success-400" />
          <span className="font-mono text-[11px] font-semibold text-white">45 countries active</span>
        </div>
      </div>
    </div>
  );
}

function Ticker() {
  const [recovered, setRecovered] = useState(12450);
  const [reports, setReports] = useState(312);

  useEffect(() => {
    const t = setInterval(() => {
      setRecovered((v) => v + Math.floor(Math.random() * 90));
      setReports((v) => v + (Math.random() > 0.5 ? 1 : 0));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3.5">
      <span className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-gray-200">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success-500" />
        </span>
        Live:
      </span>
      <span className="font-mono text-sm font-bold text-success-600 dark:text-success-400">
        ${recovered.toLocaleString()} recovered this week
      </span>
      <span className="hidden h-4 w-px bg-gray-300 dark:bg-white/20 sm:block" aria-hidden="true" />
      <span className="font-mono text-sm font-bold text-brand-500">
        {reports} scams reported today
      </span>
    </div>
  );
}

export default function Hero({ onPlayVideo }: { onPlayVideo: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-navy-700 pt-[152px] md:pt-[152px] max-md:pt-[68px]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-600 to-navy-800" aria-hidden="true" />
      <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <span aria-hidden="true">🌍</span> Trusted in 45+ Countries
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl xl:text-[3.4rem]">
              Cybercrime Stole{' '}
              <span className="font-mono text-brand-400">$10.5 Trillion</span> Last Year.
              <br />
              We Are <span className="text-gold-400">Fighting Back.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
              We help victims recover, educate communities, and help you report to
              EFCC, FBI IC3, Interpol, Action Fraud, Europol &amp; 20+ global agencies.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#donate" className="btn-red">DONATE NOW <ArrowRight className="h-4 w-4" /></a>
              <a href="#apply-compensation" className="btn-gold">APPLY FOR COMPENSATION</a>
              <a href="#report" className="btn-gold">REPORT A SCAM</a>
              <button onClick={onPlayVideo} className="btn-ghost-light">
                <Play className="h-4 w-4 fill-current" /> WATCH OUR STORY
              </button>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-gray-200">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">✅</span> $1.2M Recovered
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true">✅</span> $340,000 Paid in Victim Compensation
              </span>
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-8">
              <Ticker />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <ThreatMap />
        </Reveal>
      </div>

      {/* Trust logos + alerts marquee */}
      <div className="relative border-t border-white/10 bg-navy-800/60 backdrop-blur-sm">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            As featured in
          </span>
          {['BBC', 'CNN', 'Channels TV', 'TechCabal'].map((b) => (
            <span key={b} className="font-heading text-lg font-bold text-white/60">
              {b}
            </span>
          ))}
        </div>
        <div className="overflow-hidden border-t border-white/10 bg-navy-900/70 py-2.5" aria-label="Live scam alerts">
          <div className="flex w-max animate-marquee gap-12">
            {[...SCAM_ALERTS, ...SCAM_ALERTS].map((a, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-300">
                <span aria-hidden="true">⚠️</span>
                <strong className="font-semibold text-gold-400">New Scam Alert:</strong>
                {a.text.replace('New Scam Alert: ', '')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsDashboard() {
  const stats = [
    { value: 2400, suffix: '+', label: 'Victims Helped', color: 'text-brand-500' },
    { value: 1.2, prefix: '$', suffix: 'M', label: 'Recovered / Prevented', color: 'text-success-600', decimal: true },
    { value: 150, suffix: '+', label: 'Schools Trained', color: 'text-gold-500' },
    { value: 45, suffix: '', label: 'Countries', color: 'text-navy-700 dark:text-white' },
    { value: 12000, suffix: '+', label: 'Reports Processed', color: 'text-brand-500' },
  ];

  return (
    <section className="bg-white py-16 dark:bg-navy-900 sm:py-20" aria-label="Impact statistics">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="card group h-full p-6 text-center hover:-translate-y-1 hover:shadow-lift">
                <p className={`font-mono text-3xl font-bold sm:text-4xl ${s.color}`}>
                  {s.decimal ? (
                    <>
                      $<CountTo value={1.2} />
                      <span>M</span>
                    </>
                  ) : (
                    <Counter value={s.value} suffix={s.suffix} />
                  )}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountTo({ value }: { value: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setDisplay(Math.round(value * 10 * (1 - Math.pow(1 - p, 3))) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className="font-mono tabular-nums">{display.toFixed(1)}</span>;
}
