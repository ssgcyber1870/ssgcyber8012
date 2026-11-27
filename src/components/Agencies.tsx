import { useMemo, useState } from 'react';
import { Search, ExternalLink, Landmark } from 'lucide-react';
import { AGENCIES } from '../lib/data';
import { Reveal, SectionHeading } from './ui';

export default function Agencies() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AGENCIES;
    return AGENCIES.filter(
      (a) =>
        a.country.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.full.toLowerCase().includes(q) ||
        a.handles.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="agencies" className="bg-white py-20 dark:bg-navy-900 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="Official Agencies"
          title="Report To The Right Agency In Your Country"
          subtitle="We help you file to the correct agency. Click your country to get the official link."
        />

        <div className="mx-auto mt-10 w-full max-w-md">
          <label htmlFor="agency-search" className="sr-only">Search your country or agency</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              id="agency-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your country or agency…"
              className="field-input !pl-11"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a, i) => (
            <Reveal key={a.name} delay={(i % 8) * 50}>
              <article className="card group flex h-full flex-col p-5 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl2 bg-navy-700 text-[11px] font-bold text-gold-400">
                    {a.initials}
                  </span>
                  <span className="text-xl" aria-hidden="true">{a.flag}</span>
                  <span className="ml-auto rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold text-brand-600 dark:bg-brand-500/10">
                    {a.country}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold leading-snug text-navy-700 dark:text-white">{a.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{a.full}</p>
                <p className="mt-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Handles: <span className="font-normal text-gray-500 dark:text-gray-400">{a.handles}</span>
                </p>
                <a
                  href={`https://${a.site}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline mt-auto !mt-4 w-full px-4 py-2 text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Visit Official Site
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <Landmark className="h-8 w-8 text-gray-300" aria-hidden="true" />
            <p className="text-sm text-gray-500">
              No agency matches your search. Try a country name like "Nigeria" or an agency like "FBI".
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
