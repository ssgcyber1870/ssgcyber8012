import { useState } from 'react';
import {
  HandCoins, Loader2, PartyPopper, UploadCloud, Search, CheckCircle2, FileText,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { COUNTRIES, agenciesForCountry } from '../lib/data';
import { HELP_TYPES } from '../lib/compensation';
import { Reveal, SectionHeading } from './ui';

const MAX_FILES = 3;
const MAX_SIZE = 5 * 1024 * 1024;

interface FormState {
  caseId: string;
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  amountLost: string;
  amountRequested: string;
  helpType: string;
  reportedToAuthority: boolean;
  policeReportNumber: string;
  story: string;
  payoutMethod: 'bank' | 'paypal' | 'usdt';
  bankName: string;
  accountNumber: string;
  accountName: string;
  payoutWallet: string;
  confirmed: boolean;
}

const INITIAL: FormState = {
  caseId: '', fullName: '', email: '', whatsapp: '', country: '',
  amountLost: '', amountRequested: '', helpType: '',
  reportedToAuthority: false, policeReportNumber: '', story: '',
  payoutMethod: 'bank', bankName: '', accountNumber: '', accountName: '',
  payoutWallet: '', confirmed: false,
};

function validate(f: FormState, files: File[]): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!/^SCG-\d{4}-.+$/i.test(f.caseId.trim())) errs.caseId = 'Enter the Case ID from your SCG report (e.g. SCG-2026-XXXX).';
  if (!f.fullName.trim()) errs.fullName = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Please enter a valid email address.';
  if (!f.whatsapp.trim()) errs.whatsapp = 'Please enter your WhatsApp number.';
  if (!f.country) errs.country = 'Please select your country.';
  if (!Number(f.amountLost) || Number(f.amountLost) < 100) errs.amountLost = 'Amount lost must be $100 or more.';
  const req = Number(f.amountRequested);
  if (!req || req < 100 || req > 2000) errs.amountRequested = 'Requests must be between $100 and $2,000.';
  if (!f.helpType) errs.helpType = 'Please choose the type of help you need.';
  if (!f.story.trim() || f.story.trim().split(/\s+/).length < 10) errs.story = 'Tell us briefly how the scam affected your life (at least 10 words).';
  if (f.reportedToAuthority && !f.policeReportNumber.trim()) errs.policeReportNumber = 'Please enter your police / EFCC / IC3 report number.';
  if (files.length > MAX_FILES) errs.proof = `You can attach up to ${MAX_FILES} files.`;
  if (files.some((file) => file.size > MAX_SIZE)) errs.proof = 'Each file must be 5 MB or smaller.';
  if (!f.confirmed) errs.confirmed = 'Please confirm your application is truthful.';
  if (f.payoutMethod === 'bank' && (!f.bankName.trim() || !f.accountNumber.trim() || !f.accountName.trim())) {
    errs.payout = 'Please complete your bank details.';
  }
  if (f.payoutMethod !== 'bank' && !f.payoutWallet.trim()) {
    errs.payout = f.payoutMethod === 'paypal' ? 'Please enter your PayPal email.' : 'Please enter your USDT wallet address.';
  }
  return errs;
}

const STATUS_STYLES: Record<string, string> = {
  received: 'bg-gold-50 text-gold-700 dark:bg-gold-400/10 dark:text-gold-300',
  'under review': 'bg-navy-50 text-navy-600 dark:bg-white/10 dark:text-gray-200',
  approved: 'bg-success-500/10 text-success-700 dark:text-success-400',
  paid: 'bg-success-500/10 text-success-700 dark:text-success-400',
  rejected: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10',
};

export default function ApplyCompensation() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [compId, setCompId] = useState('');

  const [trackId, setTrackId] = useState('');
  const [trackBusy, setTrackBusy] = useState(false);
  const [trackError, setTrackError] = useState('');
  const [trackStatus, setTrackStatus] = useState('');

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: '' }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errs = validate(form, files);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    const { data, error } = await supabase
      .from('compensation_applications')
      .insert({
        case_id: form.caseId.trim().toUpperCase(),
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        country: form.country,
        amount_lost: Number(form.amountLost),
        amount_requested: Number(form.amountRequested),
        help_type: form.helpType,
        reported_to_authority: form.reportedToAuthority,
        police_report_number: form.reportedToAuthority ? form.policeReportNumber.trim() : null,
        proof_files: files.map((f) => f.name),
        story: form.story.trim(),
        payout_method: form.payoutMethod,
        bank_name: form.payoutMethod === 'bank' ? form.bankName.trim() : null,
        account_number: form.payoutMethod === 'bank' ? form.accountNumber.trim() : null,
        account_name: form.payoutMethod === 'bank' ? form.accountName.trim() : null,
        payout_wallet: form.payoutMethod !== 'bank' ? form.payoutWallet.trim() : null,
        confirmed: form.confirmed,
      })
      .select('comp_id')
      .single();

    setSubmitting(false);
    if (error || !data) {
      setSubmitError('Something went wrong submitting your application. Please try again, or contact us on WhatsApp.');
      return;
    }
    setCompId(data.comp_id);
    document.getElementById('apply-compensation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const track = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError('');
    setTrackStatus('');
    const id = trackId.trim().toUpperCase();
    if (!/^COMP-\d{4}-.+$/i.test(id)) {
      setTrackError('Enter a valid COMP ID (e.g. COMP-2026-XXXX).');
      return;
    }
    setTrackBusy(true);
    const { data, error } = await supabase
      .from('compensation_applications')
      .select('comp_id, status')
      .eq('comp_id', id)
      .maybeSingle();
    setTrackBusy(false);
    if (error) {
      setTrackError('Something went wrong checking your status. Please try again.');
      return;
    }
    if (!data) {
      setTrackError('No application found with that COMP ID. Double-check and try again.');
      return;
    }
    setTrackStatus(data.status);
  };

  const reset = () => {
    setForm(INITIAL);
    setFiles([]);
    setCompId('');
  };

  const errCls = (key: string) => `${errors[key] ? 'input-invalid ' : ''}field-input`;

  return (
    <section id="apply-compensation" className="bg-light py-20 dark:bg-navy-800 sm:py-24">
      <div className="container-x">
        <SectionHeading
          label="Compensation"
          title="Apply For Compensation"
          subtitle="Already have an SCG Case ID and proof of loss? Apply here. Every application is verified to protect the fund for real victims."
        />

        <Reveal>
          <div className="mx-auto mt-12 max-w-3xl">
            {compId ? (
              /* ---------- SUCCESS SCREEN ---------- */
              <div className="card p-8 text-center sm:p-10">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-500/10">
                  <PartyPopper className="h-8 w-8 text-success-500" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy-700 dark:text-white">Application Received.</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Review takes 7–14 days. We will contact you on WhatsApp.
                  Track your status any time with your COMP ID:
                </p>
                <p className="mx-auto mt-5 w-fit rounded-xl2 border-2 border-dashed border-gold-400/60 bg-gold-50 px-8 py-4 font-mono text-3xl font-bold tracking-wider text-gold-700 dark:bg-gold-400/10 dark:text-gold-300">
                  {compId}
                </p>
                <button onClick={reset} className="mt-6 text-xs font-medium text-gray-500 underline hover:text-brand-500">
                  Submit another application
                </button>
              </div>
            ) : (
              /* ---------- FORM ---------- */
              <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-10">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-6 dark:border-white/10">
                  <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-gold-400/15">
                    <HandCoins className="h-6 w-6 text-gold-600" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy-700 dark:text-white">Compensation Application</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fields marked with an asterisk are required.</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-case" className="field-label">Your SCG Case ID * <span className="font-normal text-gray-400">(e.g. SCG-2026-XXXX)</span></label>
                    <input id="c-case" className={errCls('caseId')} value={form.caseId} onChange={set('caseId')} placeholder="SCG-2026-XXXX" />
                    {errors.caseId && <p className="field-error" role="alert">{errors.caseId}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-name" className="field-label">Full Name *</label>
                    <input id="c-name" className={errCls('fullName')} value={form.fullName} onChange={set('fullName')} placeholder="Chidi Okonkwo" />
                    {errors.fullName && <p className="field-error" role="alert">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-email" className="field-label">Email *</label>
                    <input id="c-email" type="email" className={errCls('email')} value={form.email} onChange={set('email')} placeholder="you@example.com" />
                    {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-wa" className="field-label">WhatsApp *</label>
                    <input id="c-wa" type="tel" className={errCls('whatsapp')} value={form.whatsapp} onChange={set('whatsapp')} placeholder="+234 800 000 0000" />
                    {errors.whatsapp && <p className="field-error" role="alert">{errors.whatsapp}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-country" className="field-label">Country *</label>
                    <select id="c-country" className={errCls('country')} value={form.country} onChange={set('country')}>
                      <option value="">Select country…</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.country && <p className="field-error" role="alert">{errors.country}</p>}
                    {form.country && agenciesForCountry(form.country).length > 0 && (
                      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                        Tip: also report to {agenciesForCountry(form.country).map((a) => a.name).join(' and ')}.
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="c-help" className="field-label">Type of Help Needed *</label>
                    <select id="c-help" className={errCls('helpType')} value={form.helpType} onChange={set('helpType')}>
                      <option value="">Select type…</option>
                      {HELP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.helpType && <p className="field-error" role="alert">{errors.helpType}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-lost" className="field-label">Amount Lost (USD) *</label>
                    <input id="c-lost" type="number" min={100} className={errCls('amountLost')} value={form.amountLost} onChange={set('amountLost')} placeholder="e.g. 3500" />
                    {errors.amountLost && <p className="field-error" role="alert">{errors.amountLost}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-request" className="field-label">Amount You Are Requesting * <span className="font-normal text-gray-400">($100 – $2,000)</span></label>
                    <input id="c-request" type="number" min={100} max={2000} className={errCls('amountRequested')} value={form.amountRequested} onChange={set('amountRequested')} placeholder="e.g. 1000" />
                    {errors.amountRequested && <p className="field-error" role="alert">{errors.amountRequested}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={form.reportedToAuthority}
                        onChange={set('reportedToAuthority')}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                      Did you report to Police / EFCC / IC3?
                    </label>
                    {form.reportedToAuthority && (
                      <div className="mt-3">
                        <label htmlFor="c-report" className="field-label">Police Report Number *</label>
                        <input id="c-report" className={errCls('policeReportNumber')} value={form.policeReportNumber} onChange={set('policeReportNumber')} placeholder="Official report / complaint number" />
                        {errors.policeReportNumber && <p className="field-error" role="alert">{errors.policeReportNumber}</p>}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="c-proof" className="field-label">Upload Proof * <span className="font-normal text-gray-400">(bank statement, chat screenshot, receipt — up to 3 files, 5 MB each)</span></label>
                    <label
                      htmlFor="c-proof"
                      className="flex cursor-pointer items-center gap-3 rounded-xl2 border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-500 transition hover:border-gold-400/70 hover:bg-gold-50/50 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                    >
                      <UploadCloud className="h-5 w-5 text-gold-600" />
                      {files.length > 0 ? (
                        <span className="font-medium text-navy-700 dark:text-white">{files.map((f) => f.name).join(', ')}</span>
                      ) : (
                        <span>Click to attach files</span>
                      )}
                    </label>
                    <input
                      id="c-proof"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(e) => {
                        setFiles(Array.from(e.target.files ?? []));
                        setErrors((er) => ({ ...er, proof: '' }));
                      }}
                    />
                    {errors.proof && <p className="field-error" role="alert">{errors.proof}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="c-story" className="field-label">Short Story: How did this scam affect your life? * <span className="font-normal text-gray-400">(about 100 words)</span></label>
                    <textarea id="c-story" rows={4} className={errCls('story')} value={form.story} onChange={set('story')} placeholder="Tell us what happened — the money you lost, how it affected your family, work or studies…" />
                    {errors.story && <p className="field-error" role="alert">{errors.story}</p>}
                  </div>

                  {/* Payout details */}
                  <div className="sm:col-span-2">
                    <span className="field-label">Bank Details for Payment *</span>
                    <div className="grid grid-cols-3 gap-1 rounded-xl2 bg-gray-100 p-1 dark:bg-navy-800">
                      {([
                        ['bank', 'Bank Transfer'],
                        ['paypal', 'PayPal'],
                        ['usdt', 'USDT'],
                      ] as const).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => { setForm((f) => ({ ...f, payoutMethod: id })); setErrors((er) => ({ ...er, payout: '' })); }}
                          className={`rounded-lg2 py-2 text-xs font-bold transition-all sm:text-sm ${
                            form.payoutMethod === id
                              ? 'bg-navy-700 text-white shadow-soft dark:bg-gold-400 dark:text-navy-700'
                              : 'text-gray-500 hover:text-navy-700 dark:hover:text-white'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {form.payoutMethod === 'bank' ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                          <label htmlFor="c-bank" className="field-label">Bank Name</label>
                          <input id="c-bank" className={errCls('payout')} value={form.bankName} onChange={set('bankName')} placeholder="e.g. GTBank" />
                        </div>
                        <div>
                          <label htmlFor="c-accnum" className="field-label">Account Number</label>
                          <input id="c-accnum" className={errCls('payout')} value={form.accountNumber} onChange={set('accountNumber')} placeholder="10-digit account number" />
                        </div>
                        <div>
                          <label htmlFor="c-accname" className="field-label">Account Name</label>
                          <input id="c-accname" className={errCls('payout')} value={form.accountName} onChange={set('accountName')} placeholder="Exactly as on the account" />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <label htmlFor="c-wallet" className="field-label">{form.payoutMethod === 'paypal' ? 'PayPal Email' : 'USDT Wallet Address'}</label>
                        <input id="c-wallet" className={errCls('payout')} value={form.payoutWallet} onChange={set('payoutWallet')} placeholder={form.payoutMethod === 'paypal' ? 'you@example.com' : 'TRC-20 wallet address'} />
                      </div>
                    )}
                    {errors.payout && <p className="field-error" role="alert">{errors.payout}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <input
                        type="checkbox"
                        checked={form.confirmed}
                        onChange={set('confirmed')}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                      />
                      I confirm all information is true. I understand fake claims will be rejected and banned.
                    </label>
                    {errors.confirmed && <p className="field-error" role="alert">{errors.confirmed}</p>}
                  </div>
                </div>

                {submitError && (
                  <p className="mt-5 rounded-xl2 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:bg-brand-500/10" role="alert">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-gold mt-8 w-full py-4 text-base">
                  {submitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Submitting application…</>
                  ) : (
                    <><HandCoins className="h-5 w-5" /> SUBMIT COMPENSATION APPLICATION</>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* ---------- TRACKER ---------- */}
        <Reveal delay={150}>
          <div className="mx-auto mt-8 max-w-3xl">
            <form onSubmit={track} noValidate className="card flex flex-col items-center gap-4 p-6 sm:flex-row sm:p-7">
              <div className="flex items-center gap-3 sm:mr-auto">
                <FileText className="h-6 w-6 shrink-0 text-brand-500" />
                <h3 className="text-base font-bold text-navy-700 dark:text-white">Track My Compensation</h3>
              </div>
              <div className="w-full sm:w-auto sm:flex sm:gap-2">
                <label htmlFor="c-track" className="sr-only">Your COMP ID</label>
                <input
                  id="c-track"
                  value={trackId}
                  onChange={(e) => { setTrackId(e.target.value); setTrackError(''); setTrackStatus(''); }}
                  placeholder="COMP-2026-XXXX"
                  className="field-input font-mono sm:w-56"
                />
                <button type="submit" disabled={trackBusy} className="btn-red mt-2 w-full px-5 py-3 sm:mt-0 sm:w-auto">
                  {trackBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4" /> Track</>}
                </button>
              </div>
            </form>
            {trackError && (
              <p className="mx-auto mt-3 max-w-3xl rounded-xl2 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:bg-brand-500/10" role="alert">
                {trackError}
              </p>
            )}
            {trackStatus && (
              <div className="mx-auto mt-3 max-w-3xl rounded-xl2 border border-success-500/30 bg-success-500/10 px-4 py-3" role="status">
                <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-success-700 dark:text-success-400">
                  <CheckCircle2 className="h-4 w-4" />
                  {trackId.trim().toUpperCase()}:
                  <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_STYLES[trackStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                    {trackStatus}
                  </span>
                </p>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                  Statuses: Received → Under Review → Approved → Paid. If rejected, you would see Rejected — contact us on WhatsApp for details.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
