# Project memory

## Product intent & audience

- **SCG (STOP CYBERCRIME GLOBALLY)** — a global non-profit cybercrime prevention platform.
- Core features: victim reporting tools, live threat stats, education programs, donation system.
- Audience: cybercrime victims worldwide, communities needing education, donors, partner agencies.

## Brand personality & voice

- Authoritative, trustworthy, helpful, globally inclusive.
- Positions SCG as a non-police facilitator that helps victims file correctly to official agencies — not a law-enforcement body itself.

## Visual design & UX direction

- Existing design, colors, logo, and layout are established and must be preserved across changes.
- Gold accent is used for tip boxes (e.g., country-specific reporting tip in the report form).
- Page section order: Hero → Programs → Agencies (new) → Report a Scam → Footer.
- Agencies section: search bar ("Search your country or agency...") above a responsive grid of 21 agency cards.
- Agency card pattern: country flag + initials badge + agency name + "what they handle" tags + "Visit Official Site" button (opens in new tab).
- Report form: country `<select>` triggers a conditional tip box linking to the matching official agency(ies); unmapped countries fall back to INTERPOL/Europol global route.
- Use Lucide React icons; Tailwind classes; `@/` path alias for imports.

## Decisions, constraints & rationale

- Hero subtext updated to explicitly name EFCC, FBI IC3, Interpol, Action Fraud, Europol & "20+ global agencies" to communicate reach.
- 21 agencies curated across 18 countries + 2 global (INTERPOL, EUROPOL) as the authoritative mapping.
- Country-to-agency mapping supports multiple agencies per country (USA → FBI IC3 + FTC; UK → Action Fraud + NCSC).
- Footer disclaimer added: SCG is a non-profit, not a police agency, but helps file to partner agencies.
- Constraint: do not alter colors, logo, layout, or existing design when adding new content.

## Open questions & assumptions

- Agency website URLs and jurisdictions assumed correct as supplied by the user; not independently verified.
- Whether the agency list should be data-driven from a single source file vs. inline (currently appears to be a curated static dataset).
- No confirmation yet on whether live threat stats are real or mock data.
- Accessibility expectations (e.g., flag icon aria labels, search keyboard nav) not explicitly specified.