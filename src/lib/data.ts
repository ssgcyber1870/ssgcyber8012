export interface ScamAlert {
  text: string;
}

export const SCAM_ALERTS: ScamAlert[] = [
  { text: 'New Scam Alert: Fake Paystack recruitment jobs targeting job seekers in Lagos' },
  { text: 'New Scam Alert: Fake crypto giveaway pages circulating on Telegram' },
  { text: 'New Scam Alert: "Bank alert" screenshot forgeries used to dodge payment on marketplaces' },
  { text: 'New Scam Alert: Romance scammers posing as foreign military doctors on Facebook' },
  { text: 'New Scam Alert: Fake delivery SMS asking for a small "customs fee"' },
  { text: 'New Scam Alert: Sextortion rings targeting teenagers on Instagram DMs' },
];

export interface Program {
  id: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'victim-support',
    icon: 'heart',
    title: 'Victim Support Fund',
    description:
      'Direct, confidential help for people who have lost money or been threatened online.',
    points: [
      'Free legal guidance and counselling',
      'Bank dispute & chargeback letters written for you',
      'Assisted EFCC / FBI IC3 report filing',
    ],
  },
  {
    id: 'education',
    icon: 'graduation',
    title: 'Global Education',
    description:
      'Free cyber-safety training delivered where people are: schools, churches and businesses.',
    points: [
      'Interactive workshops for students and staff',
      'Train-the-trainer programmes for community leaders',
      'Free downloadable scam-prevention guide',
    ],
  },
  {
    id: 'reporting-hub',
    icon: 'siren',
    title: 'Reporting Hub',
    description:
      'The fastest way to fight back: report a scam in 2 minutes and get a real case ID.',
    points: [
      'Report in under 2 minutes, any device',
      'Instant case ID (SCG-YYYY-XXXX)',
      'Track your case status as we act on it',
    ],
  },
  {
    id: 'business',
    icon: 'building',
    title: 'Cyber Safety for Businesses',
    description:
      'Protect your company, staff and customers from fraud, phishing and social engineering.',
    points: [
      'Cyber-security audits for SMEs and fintechs',
      'Staff awareness training sessions',
      'Anti-phishing simulation campaigns',
    ],
  },
];

export interface Story {
  id: number;
  initials: string;
  color: string;
  country: string;
  flag: string;
  scamType: string;
  lost: string;
  recovered: string;
  quote: string;
  help: string;
}

export const STORIES: Story[] = [
  {
    id: 1,
    initials: 'A.K.',
    color: 'bg-brand-500',
    country: 'Nigeria',
    flag: '🇳🇬',
    scamType: 'Fake Job Scam',
    lost: '$1,800',
    recovered: '$1,150',
    quote:
      'They promised me a UK care-worker visa for a "processing fee". SCG helped me file with my bank and the EFCC within days — I never thought I would see any of it again.',
    help: 'Bank dispute letter + EFCC filing + counselling sessions',
  },
  {
    id: 2,
    initials: 'M.R.',
    color: 'bg-navy-700',
    country: 'South Africa',
    flag: '🇿🇦',
    scamType: 'Romance Scam',
    lost: '$14,500',
    recovered: '$3,200',
    quote:
      'I had spoken to "him" every day for two years. The team believed me when my family did not, and walked me through reporting without ever making me feel small.',
    help: 'Evidence review + IC3 report + trauma counselling',
  },
  {
    id: 3,
    initials: 'J.O.',
    color: 'bg-success-500',
    country: 'Kenya',
    flag: '🇰🇪',
    scamType: 'Crypto / Investment',
    lost: '$6,000',
    recovered: '$0 (stopped loss)',
    quote:
      'I was about to send a second "tranche" of savings. The helpline confirmed it was a clone-broker scheme within 20 minutes and stopped me losing everything.',
    help: 'Live helpline intervention + wallet exposure report',
  },
  {
    id: 4,
    initials: 'S.B.',
    color: 'bg-gold-400',
    country: 'United Kingdom',
    flag: '🇬🇧',
    scamType: 'Sextortion',
    lost: '£500',
    recovered: 'Case closed',
    quote:
      'My son was 15. SCG handled the platform takedowns and guided us to the police, quietly and fast. The messages stopped within a week.',
    help: 'Platform escalation + police liaison + family support',
  },
];

export interface Post {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export const POSTS: Post[] = [
  {
    id: 1,
    title: '5 Signs of a Romance Scam',
    category: 'Romance',
    date: 'Nov 18, 2026',
    readTime: '6 min',
    excerpt:
      'Love should never come with an invoice. Learn the five patterns investigators see in almost every romance fraud case.',
  },
  {
    id: 2,
    title: 'How to Spot a Fake Bank Alert',
    category: 'Banking',
    date: 'Nov 12, 2026',
    readTime: '4 min',
    excerpt:
      'Edited SMS screenshots are fooling marketplace sellers daily. Here is the 30-second check that never fails.',
  },
  {
    id: 3,
    title: 'The Crypto Scam Checklist',
    category: 'Crypto',
    date: 'Nov 5, 2026',
    readTime: '8 min',
    excerpt:
      'Guaranteed returns, clone brokers, withdrawal "taxes" — run every opportunity through this checklist before you send a cent.',
  },
  {
    id: 4,
    title: 'Fake Job Offers: The Visa Fee Trap',
    category: 'Employment',
    date: 'Oct 28, 2026',
    readTime: '5 min',
    excerpt:
      'No legitimate embassy or employer asks for "processing fees" by gift card or crypto. What to do when the offer looks perfect.',
  },
  {
    id: 5,
    title: 'Protecting Your Parents on WhatsApp',
    category: 'Family',
    date: 'Oct 20, 2026',
    readTime: '7 min',
    excerpt:
      'The "Hi Mum, new number" scam is sweeping through family group chats. A practical conversation guide to share tonight.',
  },
  {
    id: 6,
    title: 'Sextortion: What Teenagers and Parents Must Know',
    category: 'Sextortion',
    date: 'Oct 14, 2026',
    readTime: '9 min',
    excerpt:
      'It starts with a friend request and ends with a threat. The exact first three steps that stop the spiral.',
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Is reporting free?',
    a: 'Yes. Reporting a scam to SCG Global is completely free, forever. We are a non-profit funded by donations and partners, so cost is never a barrier for a victim.',
  },
  {
    q: 'Will my name be private?',
    a: 'Absolutely. Your report is confidential by default. We only share details publicly if you explicitly tick the anonymous-awareness consent box, and even then your name and contact details are never published.',
  },
  {
    q: 'Can I get my money back?',
    a: 'We cannot promise recovery, but speed matters enormously. We help you file bank disputes and chargeback letters, and report to EFCC, FBI IC3 or Interpol partners within hours — the window when recovery is most likely.',
  },
  {
    q: 'How is my donation used?',
    a: 'Roughly 40% funds direct victim support (legal help, counselling, dispute filings), 35% funds free community education, 20% runs the reporting hub and helpline, and 5% covers administration. We publish an annual transparency report.',
  },
  {
    q: 'Do you work with the police?',
    a: 'Yes. We work with law-enforcement liaison partners including the EFCC, FBI IC3 and Interpol-linked units. Your case ID makes it simple to hand your evidence to the right agency.',
  },
];

export const IMPACT_LABELS: Record<string, string> = {
  '10': 'Educates 1 child',
  '25': 'Helps 1 victim file a report',
  '50': 'Funds 1 school training',
  '100': 'Funds legal help for a victim',
};

export interface Agency {
  country: string;
  flag: string;
  initials: string;
  name: string;
  full: string;
  site: string;
  handles: string;
}

export const AGENCIES: Agency[] = [
  { country: 'Nigeria', flag: '🇳🇬', initials: 'EFCC', name: 'EFCC', full: 'Economic & Financial Crimes Commission', site: 'efcc.gov.ng', handles: 'Fraud, 419, Crypto' },
  { country: 'USA', flag: '🇺🇸', initials: 'IC3', name: 'FBI IC3', full: 'Internet Crime Complaint Center', site: 'ic3.gov', handles: 'All cybercrime' },
  { country: 'USA', flag: '🇺🇸', initials: 'FTC', name: 'FTC', full: 'Federal Trade Commission', site: 'reportfraud.ftc.gov', handles: 'Scams, Identity Theft' },
  { country: 'UK', flag: '🇬🇧', initials: 'AF', name: 'Action Fraud', full: 'National Fraud & Cyber Crime Reporting Centre', site: 'actionfraud.police.uk', handles: 'Fraud, Phishing' },
  { country: 'UK', flag: '🇬🇧', initials: 'NCSC', name: 'National Cyber Security Centre', full: 'National Cyber Security Centre', site: 'ncsc.gov.uk', handles: 'Phishing, Hacking' },
  { country: 'Canada', flag: '🇨🇦', initials: 'CAFC', name: 'Canadian Anti-Fraud Centre', full: 'Canadian Anti-Fraud Centre', site: 'antifraudcentre-centreantifraude.ca', handles: 'Fraud, Scams' },
  { country: 'Australia', flag: '🇦🇺', initials: 'ACCC', name: 'ACCC Scamwatch', full: 'ACCC Scamwatch', site: 'scamwatch.gov.au', handles: 'Scams' },
  { country: 'Australia', flag: '🇦🇺', initials: 'RC', name: 'ReportCyber', full: 'ReportCyber', site: 'cyber.gov.au/report', handles: 'Cybercrime' },
  { country: 'India', flag: '🇮🇳', initials: 'NCCRP', name: 'National Cyber Crime Reporting Portal', full: 'National Cyber Crime Reporting Portal', site: 'cybercrime.gov.in', handles: 'All cybercrime' },
  { country: 'Ghana', flag: '🇬🇭', initials: 'CSA', name: 'Cyber Security Authority', full: 'Cyber Security Authority', site: 'csa.gov.gh', handles: 'Cybercrime, Fraud' },
  { country: 'Kenya', flag: '🇰🇪', initials: 'DCI', name: 'DCI / Kenya Cyber Crime Unit', full: 'Directorate of Criminal Investigations — Cyber Crime Unit', site: 'dci.go.ke', handles: 'Cybercrime' },
  { country: 'South Africa', flag: '🇿🇦', initials: 'SAPS', name: 'SAPS Cybercrime / SA Fraud Prevention', full: 'SAPS Cybercrime & SA Fraud Prevention Service', site: 'saps.gov.za', handles: 'Fraud, Hacking' },
  { country: 'UAE', flag: '🇦🇪', initials: 'UAE', name: 'UAE Cyber Crime', full: 'UAE Cyber Crime Reporting (ecrime)', site: 'ecrime.ae', handles: 'Online fraud, Hacking' },
  { country: 'Saudi Arabia', flag: '🇸🇦', initials: 'WQ', name: 'Saudi Anti-Fraud / Weqaya', full: 'Saudi Anti-Fraud — Weqaya', site: 'weqaya.sa', handles: 'Fraud' },
  { country: 'Qatar', flag: '🇶🇦', initials: 'MOI', name: 'Qatar Cyber Crime — Ministry of Interior', full: 'Qatar Ministry of Interior Cyber Crime Unit', site: 'moi.gov.qa', handles: 'Cybercrime' },
  { country: 'France', flag: '🇫🇷', initials: 'CM', name: 'Cybermalveillance.gouv.fr', full: 'Cybermalveillance — Signal Arnaques', site: 'cybermalveillance.gouv.fr', handles: 'Phishing, Fraud' },
  { country: 'Germany', flag: '🇩🇪', initials: 'BKA', name: 'BKA / Polizei Internetwache', full: 'Bundeskriminalamt / Polizei Online Wache', site: 'bka.de', handles: 'Cybercrime' },
  { country: 'Singapore', flag: '🇸🇬', initials: 'SS', name: 'ScamShield / SPF', full: 'ScamShield — Singapore Police Force', site: 'scamshield.org.sg', handles: 'Scams, Phishing' },
  { country: 'Philippines', flag: '🇵🇭', initials: 'NBI', name: 'NBI Cybercrime Division / PNP ACG', full: 'NBI Cybercrime Division & PNP Anti-Cybercrime Group', site: 'pnpacg.ph', handles: 'Scams, Sextortion' },
  { country: 'Global', flag: '🌍', initials: 'IP', name: 'INTERPOL', full: 'I-24/7 Reporting via local police', site: 'interpol.int', handles: 'International crime' },
  { country: 'Global', flag: '🌍', initials: 'EU', name: 'EUROPOL', full: 'EC3 European Cybercrime Centre', site: 'europol.europa.eu', handles: 'EU cybercrime' },
];

export function agenciesForCountry(country: string): Agency[] {
  const map: Record<string, string[]> = {
    'Nigeria': ['Nigeria'],
    'United States': ['USA'],
    'United Kingdom': ['UK'],
    'Canada': ['Canada'],
    'Australia': ['Australia'],
    'India': ['India'],
    'Ghana': ['Ghana'],
    'Kenya': ['Kenya'],
    'South Africa': ['South Africa'],
    'United Arab Emirates': ['UAE'],
    'France': ['France'],
    'Germany': ['Germany'],
    'Singapore': ['Singapore'],
    'Philippines': ['Philippines'],
  };
  const tags = map[country];
  if (!tags) {
    return AGENCIES.filter((a) => a.country === 'Global');
  }
  return AGENCIES.filter((a) => tags.includes(a.country));
}

export const COUNTRIES = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom',
  'Canada', 'Australia', 'India', 'United Arab Emirates', 'France', 'Germany',
  'Spain', 'Brazil', 'Mexico', 'Philippines', 'Singapore', 'Netherlands',
  'Italy', 'Other',
];
