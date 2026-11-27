import { useState } from 'react';
import { HandHeart, Building2, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Reveal } from './ui';

const SKILLS = ['Legal', 'Counseling', 'Tech', 'Social Media', 'Translation'];
const AVAILABILITY = ['Weekends', 'Weekday evenings', 'Flexible / on-call'];
const PARTNER_TYPES = ['Bank / Fintech', 'Church / Faith Organisation', 'School / University', 'Company / Corporate', 'NGO / Government'];

export default function Volunteer() {
  const [vName, setVName] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vSkills, setVSkills] = useState<string[]>([]);
  const [vAvail, setVAvail] = useState('');
  const [vErrors, setVErrors] = useState<Record<string, string>>({});
  const [vState, setVState] = useState<'idle' | 'sending' | 'done'>('idle');

  const [pOrg, setPOrg] = useState('');
  const [pName, setPName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pType, setPType] = useState('');
  const [pMsg, setPMsg] = useState('');
  const [pErrors, setPErrors] = useState<Record<string, string>>({});
  const [pState, setPState] = useState<'idle' | 'sending' | 'done'>('idle');

  const toggleSkill = (s: string) =>
    setVSkills((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submitVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!vName.trim()) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vEmail)) errs.email = 'Please enter a valid email address.';
    if (vSkills.length === 0) errs.skills = 'Select at least one skill.';
    setVErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setVState('sending');
    const { error } = await supabase.from('volunteers').insert({
      name: vName.trim(),
      email: vEmail.trim(),
      skills: vSkills.join(', '),
      availability: vAvail || null,
    });
    setVState(error ? 'idle' : 'done');
    if (error) setVErrors({ form: 'Something went wrong. Please try again.' });
  };

  const submitPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!pOrg.trim()) errs.org = 'Please enter your organisation name.';
    if (!pName.trim()) errs.name = 'Please enter a contact name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pEmail)) errs.email = 'Please enter a valid email address.';
    if (!pType) errs.type = 'Please choose an organisation type.';
    setPErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPState('sending');
    const { error } = await supabase.from('partners').insert({
      organisation: pOrg.trim(),
      name: pName.trim(),
      email: pEmail.trim(),
      type: pType,
      message: pMsg.trim() || null,
    });
    setPState(error ? 'idle' : 'done');
    if (error) setPErrors({ form: 'Something went wrong. Please try again.' });
  };

  const doneBox = (title: string, text: string, onReset: () => void) => (
    <div className="flex h-full flex-col items-center justify-center py-10 text-center">
      <CheckCircle2 className="h-12 w-12 text-success-500" />
      <h3 className="mt-4 text-xl font-bold text-navy-700 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">{text}</p>
      <button onClick={onReset} className="mt-6 text-xs font-medium text-brand-500 underline">
        Submit another
      </button>
    </div>
  );

  return (
    <section id="volunteer" className="bg-white py-20 dark:bg-navy-900 sm:py-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Volunteer */}
          <Reveal>
            <div className="card h-full p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-success-500/10">
                  <HandHeart className="h-6 w-6 text-success-600" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy-700 dark:text-white">Volunteer With Us</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Give a few hours, change a life.</p>
                </div>
              </div>

              {vState === 'done' ? (
                doneBox(
                  'Application Received!',
                  'Thank you for joining the fight. Our volunteer coordinator will reach out within 5 working days.',
                  () => { setVState('idle'); setVName(''); setVEmail(''); setVSkills([]); setVAvail(''); },
                )
              ) : (
                <form onSubmit={submitVolunteer} noValidate className="mt-7 space-y-5">
                  <div>
                    <label htmlFor="v-name" className="field-label">Name *</label>
                    <input id="v-name" className={`${vErrors.name ? 'input-invalid ' : ''}field-input`} value={vName} onChange={(e) => { setVName(e.target.value); setVErrors((er) => ({ ...er, name: '' })); }} placeholder="Your full name" />
                    {vErrors.name && <p className="field-error" role="alert">{vErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="v-email" className="field-label">Email *</label>
                    <input id="v-email" type="email" className={`${vErrors.email ? 'input-invalid ' : ''}field-input`} value={vEmail} onChange={(e) => { setVEmail(e.target.value); setVErrors((er) => ({ ...er, email: '' })); }} placeholder="you@example.com" />
                    {vErrors.email && <p className="field-error" role="alert">{vErrors.email}</p>}
                  </div>
                  <div>
                    <span className="field-label">Skills * <span className="font-normal text-gray-400">(select all that apply)</span></span>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={vSkills.includes(s)}
                          onClick={() => { toggleSkill(s); setVErrors((er) => ({ ...er, skills: '' })); }}
                          className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all ${
                            vSkills.includes(s)
                              ? 'border-success-500 bg-success-500/10 text-success-700 dark:text-success-400'
                              : 'border-gray-200 text-gray-500 hover:border-success-400 dark:border-white/10'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {vErrors.skills && <p className="field-error" role="alert">{vErrors.skills}</p>}
                  </div>
                  <div>
                    <label htmlFor="v-avail" className="field-label">Availability</label>
                    <select id="v-avail" className="field-input" value={vAvail} onChange={(e) => setVAvail(e.target.value)}>
                      <option value="">Select availability…</option>
                      {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  {vErrors.form && <p className="field-error" role="alert">{vErrors.form}</p>}
                  <button type="submit" disabled={vState === 'sending'} className="btn-red w-full">
                    {vState === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'APPLY TO VOLUNTEER'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Partner */}
          <Reveal delay={150}>
            <div className="card h-full p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl2 bg-gold-400/15">
                  <Building2 className="h-6 w-6 text-gold-600" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-navy-700 dark:text-white">Become a Partner</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Banks, fintechs, churches &amp; schools — join us.</p>
                </div>
              </div>

              {pState === 'done' ? (
                doneBox(
                  'Partnership Request Sent!',
                  "Our partnerships lead will contact you to discuss how we can protect your community together.",
                  () => { setPState('idle'); setPOrg(''); setPName(''); setPEmail(''); setPType(''); setPMsg(''); },
                )
              ) : (
                <form onSubmit={submitPartner} noValidate className="mt-7 space-y-5">
                  <div>
                    <label htmlFor="p-org" className="field-label">Organisation *</label>
                    <input id="p-org" className={`${pErrors.org ? 'input-invalid ' : ''}field-input`} value={pOrg} onChange={(e) => { setPOrg(e.target.value); setPErrors((er) => ({ ...er, org: '' })); }} placeholder="Organisation name" />
                    {pErrors.org && <p className="field-error" role="alert">{pErrors.org}</p>}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="p-name" className="field-label">Contact Name *</label>
                      <input id="p-name" className={`${pErrors.name ? 'input-invalid ' : ''}field-input`} value={pName} onChange={(e) => { setPName(e.target.value); setPErrors((er) => ({ ...er, name: '' })); }} placeholder="Full name" />
                      {pErrors.name && <p className="field-error" role="alert">{pErrors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="p-email" className="field-label">Email *</label>
                      <input id="p-email" type="email" className={`${pErrors.email ? 'input-invalid ' : ''}field-input`} value={pEmail} onChange={(e) => { setPEmail(e.target.value); setPErrors((er) => ({ ...er, email: '' })); }} placeholder="work email" />
                      {pErrors.email && <p className="field-error" role="alert">{pErrors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="p-type" className="field-label">Organisation Type *</label>
                    <select id="p-type" className={`${pErrors.type ? 'input-invalid ' : ''}field-input`} value={pType} onChange={(e) => { setPType(e.target.value); setPErrors((er) => ({ ...er, type: '' })); }}>
                      <option value="">Select type…</option>
                      {PARTNER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {pErrors.type && <p className="field-error" role="alert">{pErrors.type}</p>}
                  </div>
                  <div>
                    <label htmlFor="p-msg" className="field-label">Message</label>
                    <textarea id="p-msg" rows={3} className="field-input" value={pMsg} onChange={(e) => setPMsg(e.target.value)} placeholder="Tell us how you'd like to collaborate…" />
                  </div>
                  {pErrors.form && <p className="field-error" role="alert">{pErrors.form}</p>}
                  <button type="submit" disabled={pState === 'sending'} className="btn-gold w-full">
                    {pState === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'BECOME A PARTNER'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
