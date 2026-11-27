import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../lib/data';
import { Reveal, SectionHeading } from './ui';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-light py-20 dark:bg-navy-800 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="FAQ"
          title="Questions, Answered Honestly"
          subtitle="Everything victims, donors and partners most often ask us."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`card overflow-hidden ${isOpen ? 'ring-2 ring-brand-500/30' : ''}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-bold text-navy-700 dark:text-white sm:text-base">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
