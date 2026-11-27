import { useEffect, useState } from 'react';
import { ArrowUp, X, Cookie, MessageCircle } from 'lucide-react';

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/234000000000?text=Hello%20SCG%2C%20I%20need%20help%20with%20a%20scam."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-success-500 text-white shadow-lift transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7 fill-current" />
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-[88px] right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-navy-700 text-white shadow-lift transition-all hover:bg-brand-500 dark:bg-white/10"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (!localStorage.getItem('scg-cookie-consent')) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const decide = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem('scg-cookie-consent', choice);
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-navy-800/95 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md sm:rounded-xl2 sm:border"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <div>
          <p className="text-sm leading-relaxed text-gray-200">
            We use essential cookies to keep this site secure, and anonymous analytics to
            improve it. No trackers, no ad networks.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => decide('accepted')} className="btn-red px-4 py-2 text-xs">Accept</button>
            <button onClick={() => decide('rejected')} className="btn-ghost-light px-4 py-2 text-xs">Reject</button>
          </div>
        </div>
        <button onClick={() => decide('rejected')} aria-label="Dismiss cookie banner" className="text-gray-400 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-navy-900/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Our story video"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-xl2 bg-navy-800 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white hover:bg-brand-500"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex aspect-video flex-col items-center justify-center gap-4 bg-gradient-to-br from-navy-700 to-navy-900 p-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-500">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <h3 className="text-xl font-bold text-white">Our Story — Coming Soon</h3>
          <p className="max-w-sm text-sm text-gray-300">
            Our full documentary is in production. In the meantime, explore our victim
            stories and live impact below.
          </p>
        </div>
      </div>
    </div>
  );
}
