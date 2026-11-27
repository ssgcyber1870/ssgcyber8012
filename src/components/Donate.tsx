import { useEffect, useState } from 'react';
import {
  HeartHandshake, Loader2, ShieldCheck, Landmark, Bitcoin, CreditCard, Share2, CheckCircle2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { FUND_IMPACT } from '../lib/compensation';
import { Reveal, SectionHeading } from './ui';

const AMOUNTS = ['10', '25', '50', '100', '250'];
const GOAL = 50000;
const BASE_RAISED = 18450;
const BASE_DONORS = 342;

function impactLabel(amount: string, fund: string): string {
  const n = Number(amount);
  if (!n) return '';
  const labels = FUND_IMPACT[fund] ?? FUND_IMPACT.general;
  const tiers = Object.keys(labels).map(Number).sort((a, b) => a - b);
  let label = 'Funds the fight against cybercrime';
  for (const t of tiers) {
    if (n >= t) label = labels[String(t)];
  }
  return label;
}

export default function Donate() {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [amount, setAmount] = useState('50');
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [method, setMethod] = useState('card');
  const [fund, setFund] = useState<'general' | 'compensation' | 'education'>('general');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const [raised, setRaised] = useState(BASE_RAISED);
  const [donors, setDonors] = useState(BASE_DONORS);

  useEffect(() => {
    supabase
      .from('donations')
      .select('amount, frequency, created_at')
      .then(({ data }) => {
        if (data) {
          const total = data.reduce((sum, d) => sum + Number(d.amount), 0);
          setRaised(BASE_RAISED + total);
          setDonors(BASE_DONORS + data.length);
        }
      });
  }, [done]);

  const effectiveAmount = custom ? custom : amount;
  const pct = Math.min(Math.round((raised / GOAL) * 100), 100);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.';
    const n = Number(effectiveAmount);
    if (!n || n < 1) errs.amount = 'Please choose or enter a donation amount.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const { error } = await supabase.from('donations').insert({
      name: name.trim(),
      email: email.trim(),
      amount: n,
      frequency,
      method,
      anonymous,
      fund,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError('Something went wrong processing your donation. Please try again.');
      return;
    }
    setDone(true);
  };

  const shareText = encodeURIComponent('I just supported STOP CYBERCRIME GLOBALLY — help victims report, recover and get compensated. Donate here:');

  return (
    <section id="donate" className="relative overflow-hidden bg-navy-700 py-20 sm:py-24">
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          dark
          label="Donate"
          title="Fuel the Fight Against Cybercrime"
          subtitle="Every contribution trains a student, files a dispute, or answers a helpline call from someone in crisis."
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-4xl">
            {/* Progress bar */}
            <div className="glass p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-3xl font-bold text-white">${raised.toLocaleString()}</p>
                  <p className="text-sm text-gray-300">raised of ${GOAL.toLocaleString()} goal</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl font-bold text-gold-400">{pct}%</p>
                  <p className="text-sm text-gray-300">{donors.toLocaleString()} donors</p>
                </div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-gold-400 transition-all duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {done ? (
              /* ---------- THANK YOU ---------- */
              <div className="card mt-6 p-10 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-500/10">
                  <CheckCircle2 className="h-8 w-8 text-success-500" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy-700 dark:text-white">Thank You, {name.split(' ')[0]}!</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Your {frequency === 'monthly' ? 'monthly ' : ''}gift of <strong>${Number(effectiveAmount).toLocaleString()}</strong> {impactLabel(effectiveAmount, fund).toLowerCase()}.
                  A receipt is on its way to {email}.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-red"
                  >
                    <Share2 className="h-4 w-4" /> Share on WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    <Share2 className="h-4 w-4" /> Share on X / Twitter
                  </a>
                </div>
              </div>
            ) : (
              /* ---------- FORM ---------- */
              <form onSubmit={submit} noValidate className="card mt-6 p-6 sm:p-10">
                {/* Frequency toggle */}
                <div className="grid grid-cols-2 gap-1 rounded-xl2 bg-gray-100 p-1 dark:bg-navy-800">
                  {(['one-time', 'monthly'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`rounded-lg2 py-2.5 text-sm font-bold capitalize transition-all ${
                        frequency === f
                          ? 'bg-navy-700 text-white shadow-soft dark:bg-brand-500'
                          : 'text-gray-500 hover:text-navy-700 dark:hover:text-white'
                      }`}
                    >
                      {f === 'one-time' ? 'One-time' : 'Monthly'}
                    </button>
                  ))}
                </div>

                {/* Amounts */}
                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustom(''); setErrors((er) => ({ ...er, amount: '' })); }}
                      className={`rounded-xl2 border-2 py-3 font-mono text-sm font-bold transition-all ${
                        !custom && amount === a
                          ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10'
                          : 'border-gray-200 text-navy-700 hover:border-brand-300 dark:border-white/10 dark:text-white'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                  <input
                    type="number"
                    min={1}
                    placeholder="Custom"
                    aria-label="Custom amount"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    className={`field-input !px-3 !py-3 text-center font-mono text-sm ${custom ? 'border-brand-500' : ''}`}
                  />
                </div>
                {errors.amount && <p className="field-error" role="alert">{errors.amount}</p>}

                {impactLabel(effectiveAmount, fund) && (
                  <p className="mt-4 flex items-center gap-2 rounded-xl2 bg-success-500/10 px-4 py-3 text-sm font-semibold text-success-700 dark:text-success-400">
                    <HeartHandshake className="h-4 w-4 shrink-0" />
                    ${Number(effectiveAmount).toLocaleString()} = {impactLabel(effectiveAmount, fund)}
                  </p>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="d-name" className="field-label">Name *</label>
                    <input id="d-name" className={`${errors.name ? 'input-invalid ' : ''}field-input`} value={name} onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: '' })); }} placeholder="Ada Lovelace" />
                    {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="d-email" className="field-label">Email *</label>
                    <input id="d-email" type="email" className={`${errors.email ? 'input-invalid ' : ''}field-input`} value={email} onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: '' })); }} placeholder="you@example.com" />
                    {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  Make my donation anonymous
                </label>

                {/* Fund designation */}
                <div className="mt-6">
                  <p className="field-label">I want my donation to go to:</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {([
                      ['general', 'General Fund', 'Wherever it is needed most'],
                      ['compensation', 'Compensation Fund', 'Direct payouts to verified victims'],
                      ['education', 'Education Fund', 'Schools, churches & community training'],
                    ] as const).map(([id, title, desc]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFund(id)}
                        className={`rounded-xl2 border-2 p-4 text-left transition-all ${
                          fund === id
                            ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-500/10'
                            : 'border-gray-200 hover:border-brand-300 dark:border-white/10'
                        }`}
                      >
                        <span className="block text-sm font-bold text-navy-700 dark:text-white">{title}</span>
                        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment methods */}
                <div className="mt-6">
                  <p className="field-label">Payment Method</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: 'card', icon: CreditCard, title: 'Card', desc: 'Paystack / Flutterwave' },
                      { id: 'bank', icon: Landmark, title: 'Bank Transfer', desc: 'SCG Global — 0123456789 (GTBank)' },
                      { id: 'paypal', icon: ShieldCheck, title: 'PayPal', desc: 'donate@stopcybercrimeglobally.org' },
                      { id: 'crypto', icon: Bitcoin, title: 'Crypto (USDT)', desc: 'TRC-20 wallet shown at checkout' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className={`flex items-center gap-3 rounded-xl2 border-2 p-4 text-left transition-all ${
                          method === m.id
                            ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-500/10'
                            : 'border-gray-200 hover:border-brand-300 dark:border-white/10'
                        }`}
                      >
                        <m.icon className={`h-5 w-5 shrink-0 ${method === m.id ? 'text-brand-500' : 'text-gray-400'}`} />
                        <span>
                          <span className="block text-sm font-bold text-navy-700 dark:text-white">{m.title}</span>
                          <span className="block text-xs text-gray-500 dark:text-gray-400">{m.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <p className="mt-5 rounded-xl2 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:bg-brand-500/10" role="alert">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-red mt-8 w-full py-4 text-base">
                  {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Processing…</>
                  ) : (
                    <>DONATE ${Number(effectiveAmount || 0).toLocaleString()} {frequency === 'monthly' ? '/ MONTH' : 'NOW'}</>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-500">
                  Secured &amp; encrypted. We never share your details.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
