# Crystal Kizor — Stage 1 Web Developer Assessment

A production-minded personal-brand experience built with Next.js 16, React 19, TypeScript and Tailwind CSS v4, using the assets supplied with the assessment.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality gates:

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install
npm run test:e2e
```

`package-lock.json` is committed for reproducible installs. After this Tailwind v4 migration, run `npm install` once to refresh the lock with the Tailwind/PostCSS packages, then commit the refreshed lock; CI can use `npm ci` after that.

## Styling

The UI uses Tailwind CSS v4 with its CSS-first configuration model:

- `@import "tailwindcss"` in `app/globals.css`
- design tokens declared with `@theme`
- `@tailwindcss/postcss` in `postcss.config.mjs`
- utility classes in React components instead of a large semantic stylesheet
- only global base behavior, the display-font token, reduced-motion rules and the hero entrance keyframe remain in `globals.css`

No legacy `tailwind.config.js` is required for this project.

## What changed after product review

The product now closes the gap between its business story and its actual behaviour:

- real, intent-based enquiry form instead of circular `#contact` links
- server-side validation and configurable email/webhook delivery
- Studio COKA visibly leads the ecosystem rather than six equal rows
- visitor-facing copy contains no build/assessment commentary
- verified Studio COKA and Crystal LinkedIn destinations
- semantic analytics events that describe actual user actions
- Vercel Web Analytics + Speed Insights + Web Vitals reporting
- no opacity animation around the hero LCP image
- only the hero image has `priority`
- accessible mobile navigation with inert/hidden closed state and scroll lock
- dedicated 1200×630 Open Graph image
- production guard against localhost metadata on Vercel
- richer JSON-LD relationship graph
- official Crystal Kizor wordmark extracted from the supplied logo collection
- stronger footer contrast

## Production environment

Copy `.env.example` to `.env.local` for local delivery testing, and set the same values in Vercel.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=...
ENQUIRY_TO_EMAIL=...
ENQUIRY_FROM_EMAIL="Crystal Kizor <hello@your-domain.com>"
```

`ENQUIRY_WEBHOOK_URL` can be used instead of Resend.

`NEXT_PUBLIC_SITE_URL` and a working enquiry delivery path are required on a production Vercel deployment. The build fails rather than publishing localhost SEO metadata or a contact form that cannot deliver.

### Enable measurement in Vercel

Enable **Web Analytics** and **Speed Insights** for the project. The site loads their first-party scripts from `/_vercel/*` and sends semantic conversion events without including enquiry form content.

Key funnel events:

```text
qualified visit
→ project / initiative interaction
→ enquiry intent selected
→ enquiry started
→ enquiry submitted
```

## Assessment deliverables

- `SUBMISSION_NOTE.md` — short thinking/technology note (under 200 words)
- `docs/PART_2_AI_PRODUCT_THINKING.md` — AI product proposal (under 300 words)
- `docs/PART_3_ANALYTICS_AND_IMPROVEMENT.md` — analytics response (under 250 words)
- `docs/SOURCES.md` — supplied/public source notes for claims and verified links

## Verified public destinations used

- Studio COKA: `https://studiocoka.com/`
- Crystal Kizor LinkedIn: `https://ng.linkedin.com/in/crystal-kizor`

No unsupported URLs, contact emails or performance claims were invented. The remaining initiatives route to the enquiry flow until their official destinations are confirmed.
