export interface CompensationTier {
  icon: string;
  title: string;
  amount: string;
  description: string;
}

export const COMPENSATION_TIERS: CompensationTier[] = [
  {
    icon: 'sos',
    title: 'Emergency Support Fund',
    amount: 'Up to $500',
    description:
      'For victims who lost rent, food, school fees. For urgent cases within 30 days of scam.',
  },
  {
    icon: 'money',
    title: 'Partial Compensation',
    amount: 'Up to $2,000',
    description:
      'For verified victims who filed SCG + Police/IC3/EFCC report and have proof of loss. Paid from donor fund.',
  },
  {
    icon: 'scale',
    title: 'Legal Recovery Support',
    amount: 'Free',
    description:
      'We pay for bank dispute letter, lawyer consultation, EFCC/FBI filing help to try to recover from bank/scammer.',
  },
  {
    icon: 'heart',
    title: 'Counseling & Recovery',
    amount: 'Free',
    description:
      '3 free therapy sessions + community support group for trauma, shame, depression.',
  },
];

export const COMPENSATION_STEPS = [
  {
    title: 'Report Scam',
    desc: 'Get SCG Case ID (SCG-2026-XXXX)',
  },
  {
    title: 'Verify',
    desc: 'Upload proof: Bank statement, chats, receipts, Police/IC3 report',
  },
  {
    title: 'Review',
    desc: 'Our team reviews in 7-14 days. We call you on WhatsApp.',
  },
  {
    title: 'Receive',
    desc: 'If approved, payment via Bank Transfer / PayPal / USDT. You sign a receipt.',
  },
];

export const COMPENSATION_ELIGIBLE = [
  'You reported within 90 days',
  'You have proof of payment (bank slip, crypto wallet, receipt)',
  'You filed to Police / EFCC / IC3',
  'Amount lost is $100 or more',
];

export const COMPENSATION_FUND = {
  goal: 100000,
  raised: 34250,
  victims: 127,
};

export const HELP_TYPES = [
  'Emergency Support',
  'Partial Compensation',
  'Legal Recovery',
  'Counseling',
];

export const FUND_IMPACT: Record<string, Record<string, string>> = {
  general: {
    '25': 'Educates 1 child',
    '50': 'Funds 1 school training',
    '100': 'Funds legal help for a victim',
  },
  compensation: {
    '25': 'Emergency food for 1 victim',
    '100': 'Partial compensation for 1 victim',
    '500': 'Full emergency support for 1 family',
  },
  education: {
    '25': 'Educates 1 child',
    '50': 'Funds 1 school training',
    '100': 'Trains a school safety club',
  },
};
