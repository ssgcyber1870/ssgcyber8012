import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, MessageSquarePlus } from 'lucide-react';
import { STORIES } from '../lib/data';
import { Reveal, SectionHeading } from './ui';

export default function Stories({ onShare }: { onShare: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % STORIES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + STORIES.length) % STORIES.length);
  const next = () => setIndex((i) => (i + 1) % STORIES.length);
  const story = STORIES[index];

  return (
    <section id="stories" className="bg-white py-20 dark:bg-navy-900 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="Victim Stories"
          title="Real People. Real Recovery."
          subtitle="Shared with permission, always anonymised. Details blurred to protect identities."
        />

        <Reveal>
          <div
            className="relative mx-auto mt-12 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="card overflow-hidden">
              <div className="grid sm:grid-cols-[220px_1fr]">
                {/* Blurred "photo" panel */}
                <div className={`${story.color} relative flex flex-col items-center justify-center gap-3 p-8`}>
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-white/20 text-2xl font-bold text-white backdrop-blur-md">
                    {story.initials}
                  </span>
                  <span className="text-sm font-semibold text-white">{story.flag} {story.country}</span>
                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white">
                    {story.scamType}
                  </span>
                </div>

                <div className="p-7 sm:p-9">
                  <Quote className="h-7 w-7 text-brand-500/40" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-relaxed text-navy-700 dark:text-gray-300 sm:text-base">
                    “{story.quote}”
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-gray-100 pt-5 dark:border-white/10">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Amount Lost</p>
                      <p className="font-mono text-lg font-bold text-brand-500">{story.lost}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">How We Helped</p>
                      <p className="text-sm font-semibold text-navy-700 dark:text-white">{story.help}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={prev} aria-label="Previous story" className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-navy-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-white/20 dark:text-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2" role="tablist" aria-label="Story selector">
                {STORIES.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Story ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-brand-500' : 'w-2 bg-gray-300 dark:bg-white/20'}`}
                  />
                ))}
              </div>
              <button onClick={next} aria-label="Next story" className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-navy-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-white/20 dark:text-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <button onClick={onShare} className="btn-outline">
                <MessageSquarePlus className="h-4 w-4" /> Share Your Story Anonymously
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
