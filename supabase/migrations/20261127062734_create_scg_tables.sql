/*
# Create SCG Global platform tables

1. Plain-English explanation
   Creates the database tables backing the STOP CYBERCRIME GLOBALLY platform:
   scam reports submitted by victims, donations, volunteer applications,
   corporate partner applications, and newsletter signups. No user accounts
   exist in this app, so all access is public (anon) with tight limits.

2. New Tables
   - `scam_reports`: victim-submitted scam reports (case ID, contact info,
     scam details, evidence file name, anonymous-share consent, status).
     INSERT-only for the public: victims can file a report, but nobody can
     read other people's reports through the public API.
   - `donations`: donation records (name, email, amount, frequency, method,
     anonymous flag). The public can insert donations and read ONLY the
     amount/frequency/date columns (for the live progress bar) — never the
     donor's name or email.
   - `volunteers`: volunteer applications (name, email, phone, skills, availability).
   - `partners`: corporate partner applications (organisation, contact, type, message).
   - `newsletter_subscribers`: email signups from the footer.

3. Security changes
   - Row Level Security enabled on every table.
   - `scam_reports`, `volunteers`, `partners`, `newsletter_subscribers`:
     INSERT-only for anon + authenticated. No read policy at all.
   - `donations`: INSERT for anon + authenticated; SELECT restricted to the
     (amount, frequency, created_at) columns for the public progress bar.
   - Privileges granted explicitly to anon + authenticated, matching the policies.
   - `case_id` on scam_reports has a unique index.

4. Notes
   - Case IDs are generated in the database with a default expression so the
     frontend never has to invent them: SCG-<year>-<4 random hex digits>.
   - Status defaults to 'submitted'.
*/

CREATE TABLE IF NOT EXISTS scam_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id text NOT NULL UNIQUE DEFAULT ('SCG-' || to_char(now(), 'YYYY') || '-' || substr(md5(gen_random_uuid()::text), 1, 4) || to_char(floor(random()*10000), 'FM0000')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  age int,
  scam_type text NOT NULL,
  platform text NOT NULL,
  amount_lost numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  scam_date date,
  scammer_info text,
  details text NOT NULL,
  anonymous_share boolean NOT NULL DEFAULT false,
  evidence_name text,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  amount numeric NOT NULL,
  frequency text NOT NULL DEFAULT 'one-time',
  method text NOT NULL DEFAULT 'card',
  anonymous boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  skills text NOT NULL,
  availability text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  type text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scam_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- scam_reports: insert-only for the public (no read policy by design).
GRANT INSERT ON scam_reports TO anon, authenticated;
DROP POLICY IF EXISTS "public can submit scam reports" ON scam_reports;
CREATE POLICY "public can submit scam reports"
ON scam_reports FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- donations: insert for the public; read only amount/frequency/date for the progress bar.
GRANT INSERT ON donations TO anon, authenticated;
GRANT SELECT (amount, frequency, created_at) ON donations TO anon, authenticated;
DROP POLICY IF EXISTS "public can donate" ON donations;
CREATE POLICY "public can donate"
ON donations FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "public can read donation totals" ON donations;
CREATE POLICY "public can read donation totals"
ON donations FOR SELECT
TO anon, authenticated
USING (true);

-- volunteers / partners / newsletter: insert-only for the public.
GRANT INSERT ON volunteers TO anon, authenticated;
DROP POLICY IF EXISTS "public can apply to volunteer" ON volunteers;
CREATE POLICY "public can apply to volunteer"
ON volunteers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

GRANT INSERT ON partners TO anon, authenticated;
DROP POLICY IF EXISTS "public can apply to partner" ON partners;
CREATE POLICY "public can apply to partner"
ON partners FOR INSERT
TO anon, authenticated
WITH CHECK (true);

GRANT INSERT ON newsletter_subscribers TO anon, authenticated;
DROP POLICY IF EXISTS "public can subscribe to newsletter" ON newsletter_subscribers;
CREATE POLICY "public can subscribe to newsletter"
ON newsletter_subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);
