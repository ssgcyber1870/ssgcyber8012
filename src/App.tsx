import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero, { StatsDashboard } from './components/Hero';
import About, { GetInvolvedBand } from './components/About';
import Programs from './components/Programs';
import Compensation from './components/Compensation';
import Agencies from './components/Agencies';
import ReportScam from './components/ReportScam';
import ApplyCompensation from './components/ApplyCompensation';
import Donate from './components/Donate';
import Stories from './components/Stories';
import Blog from './components/Blog';
import Volunteer from './components/Volunteer';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { FloatingButtons, CookieBanner, VideoModal } from './components/Extras';

function App() {
  const [dark, setDark] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('scg-theme');
    if (stored === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('scg-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-navy-900">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Header dark={dark} onToggleDark={() => setDark((d) => !d)} />

      <main>
        <Hero onPlayVideo={() => setVideoOpen(true)} />
        <StatsDashboard />
        <About />
        <Programs />
        <Compensation />
        <Agencies />
        <ReportScam />
        <ApplyCompensation />
        <Donate />
        <GetInvolvedBand />
        <Stories onShare={() => document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })} />
        <Blog />
        <Volunteer />
        <Faq />
      </main>

      <Footer />

      <FloatingButtons />
      <CookieBanner />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

export default App;
