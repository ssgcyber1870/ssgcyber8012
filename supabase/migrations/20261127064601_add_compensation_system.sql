/*
# Add Victim Compensation System

1. Plain-English explanation
   Adds the compensation program: victims apply for financial help after being
   scammed, track their application by a public COMP ID, and donors can direct
   donations to a specific fund (general / compensation / education).

2. New Tables
   - `compensation_applications`: one row per application.
     - `comp_id` (text, unique, auto-generated COMP-<year>-<4 hex>) — the
       public reference victims use to track status.
     - `case_id` — the SCG scam report case ID the application links to.
     - Contact fields: full_name, email, whatsapp, country.
     - Claim fields: amount_lost, amount_requested, help_type
       (emergency / partial / legal / counseling).
     - Verification fields: reported_to_authority (bool), police_report_number.
     - proof_files (text array of uploaded file names), story (short impact text).
     - Payout fields: payout_method (bank / paypal / usdt), bank_name,
       account_number, account_name, payout_wallet.
     - confirmed (truth declaration checkbox), status
       (received / under review / approved / paid / rejected), created_at.

3. Modified Tables
   - `donations`: new column `fund` (text, default 'general') so donors can
     target the General, Compensation or Education fund. Column-level SELECT
     grant extended to include `fund` for the public progress bars.

4. Security changes
   - RLS enabled on `compensation_applications`.
   - INSERT-only for anon + authenticated (anyone can apply).
   - SELECT restricted to (comp_id, status, created_at) columns so the public
     "Track My Compensation" lookup can only ever see the status — never the
     applicant's name, contact, story or bank details.
   - Insert-only roles granted; service_role untouched.
   - Unique index on comp_id.

5. Notes
   - COMP IDs are generated in the database so the frontend never invents them.
   - Status defaults to 'received'.
*/

CREATE TABLE IF NOT EXISTS compensation_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  comp_id text NOT NULL UNIQUE DEFAULT ('COMP-' || to_char(now(), 'YYYY') || '-' || substr(md5(gen_random_uuid()::text), 1, 4) || to_char(floor(random()*10000), 'FM0000')),
  case_id text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  country text NOT NULL,
  amount_lost numeric NOT NULL DEFAULT 0,
  amount_requested numeric NOT NULL,
  help_type text NOT NULL,
  reported_to_authority boolean NOT NULL DEFAULT false,
  police_report_number text,
  proof_files text[] NOT NULL DEFAULT '{}',
  story text NOT NULL,
  payout_method text NOT NULL DEFAULT 'bank',
  bank_name text,
  account_number text,
  account_name text,
  payout_wallet text,
  confirmed boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE compensation_applications ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON compensation_applications TO anon, authenticated;
GRANT SELECT (comp_id, status, created_at) ON compensation_applications TO anon, authenticated;

DROP POLICY IF EXISTS "public can apply for compensation" ON compensation_applications;
CREATE POLICY "public can apply for compensation"
ON compensation_applications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "public can track compensation status" ON compensation_applications;
CREATE POLICY "public can track compensation status"
ON compensation_applications FOR SELECT
TO anon, authenticated
USING (true);

ALTER TABLE donations ADD COLUMN IF NOT EXISTS fund text NOT NULL DEFAULT 'general';

GRANT SELECT (amount, frequency, created_at, fund) ON donations TO anon, authenticated;
