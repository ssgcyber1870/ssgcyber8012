import { useMemo, useState } from 'react';
import { Search, Clock, CalendarDays, ArrowRight } from 'lucide-react';
import { POSTS } from '../lib/data';
import { Reveal, SectionHeading } from './ui';

const CATEGORY_COLORS: Record<string, string> = {
  Romance: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10',
  Banking: 'bg-navy-50 text-navy-600 dark:bg-white/10',
  Crypto: 'bg-gold-50 text-gold-700 dark:bg-gold-400/10 dark:text-gold-300',
  Employment: 'bg-success-500/10 text-success-700 dark:text-success-400',
  Family: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10',
  Sextortion: 'bg-navy-50 text-navy-600 dark:bg-white/10',
};

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(POSTS.map((p) => p.category)))];

  const filtered = useMemo(() => {
    return POSTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <section id="blog" className="bg-light py-20 dark:bg-navy-800 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="Scam Alerts & Blog"
          title="Stay One Step Ahead"
          subtitle="Practical guides written by our investigators. Know the scam before it knocks."
        />

        {/* Search + filter */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="field-input !pl-11"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  category === c
                    ? 'bg-navy-700 text-white dark:bg-brand-500'
                    : 'bg-white text-navy-700 hover:bg-brand-50 hover:text-brand-600 dark:bg-white/5 dark:text-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 75}>
              <article className="card group flex h-full flex-col p-6 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${CATEGORY_COLORS[p.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" /> {p.readTime}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-navy-700 transition-colors group-hover:text-brand-500 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-gray-500">
            No articles match your search. Try a different keyword or category.
          </p>
        )}
      </div>
    </section>
  );
}
