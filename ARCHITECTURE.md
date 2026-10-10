# Architecture Decisions

## Framework

The assessment is built with Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.

The primary page is static-first. Client-side JavaScript is limited to interaction-heavy concerns such as navigation, analytics and event tracking, enquiry-intent handling, Web Vitals reporting, and the enquiry form.

The enquiry endpoint is implemented as a Next.js Route Handler so delivery credentials and server-side validation remain outside the client bundle.

## Styling Architecture

Tailwind CSS v4 is integrated through the official PostCSS workflow.

The design system is CSS-first: brand colours and the Cormorant display font stack are exposed through `@theme`, while layout, responsive behavior, typography, interaction states and component styling are expressed primarily through utility classes in the React source.

`app/globals.css` is intentionally kept small and contains Tailwind imports, shared design tokens and global browser behavior.

The navigation uses a sticky position with a translucent paper background and backdrop blur. This keeps the primary navigation and enquiry action available during long-page scrolling while section anchor offsets prevent headings from being hidden beneath the navigation.

## Business Architecture

The information hierarchy is intentional:

1. **Crystal Kizor** — the umbrella personal brand and overall positioning.
2. **Selected architecture** — visual proof before introducing the wider ecosystem.
3. **Studio COKA** — the dominant commercial architecture practice and verified external destination.
4. **Build / Learn & Share / Impact** — supporting initiatives grouped by purpose rather than presented as unrelated brands.
5. **Intent-based enquiry** — routes visitors toward architecture, speaking, collaboration, education/media or general enquiries.

This structure is designed to reduce cognitive load, establish credibility early and help visitors understand where each initiative fits within the wider Crystal Kizor ecosystem.

## Enquiry Delivery

`POST /api/enquiries` validates submitted data server-side before attempting delivery.

The endpoint includes:

- server-side field validation
- a honeypot field for basic automated-spam detection
- best-effort in-process request throttling
- delivery through Resend when email credentials are configured
- optional delivery through a configured HTTPS webhook

Supported environment variables include:

- `RESEND_API_KEY`
- `ENQUIRY_TO_EMAIL`
- `ENQUIRY_FROM_EMAIL`
- `ENQUIRY_WEBHOOK_URL`

Delivery credentials remain server-only and are never exposed to the browser.

Analytics does not receive personal contact details or free-text enquiry content. Only non-sensitive interaction metadata, such as the selected enquiry intent, may be recorded.

## Analytics

Vercel Web Analytics records page-level usage and semantic interaction events.

Speed Insights provides real-user performance monitoring, while `useReportWebVitals` reports named Web Vital measurements for additional performance visibility.

Analytics events describe completed user interactions rather than arbitrary UI exposure. Examples include:

- `project_card_clicked`
- `initiative_link_clicked`
- `enquiry_started`
- `enquiry_submitted`

This makes the analytics layer useful for understanding how visitors move through the page and where high-intent actions occur.

## SEO

The implementation includes:

- production URL validation for Vercel deployments
- canonical metadata
- a dedicated 1200 × 630 Open Graph image
- `robots` route
- `sitemap` route
- structured data using Person, Organization and WebSite schemas
- external structured-data destinations limited to verified Studio COKA and LinkedIn URLs

Structured data is used to describe Crystal Kizor and the relationship between the personal brand and relevant organizations without introducing unverified external destinations.

## Performance

Performance decisions include:

- statically rendered primary page content
- a limited number of client components
- one above-the-fold hero image marked as `priority`
- no opacity-based entrance animation blocking hero imagery
- responsive `next/image` sizing
- photographic assets compressed as WebP where appropriate
- the display typeface loaded through `next/font` with `display: swap`
- no external animation framework

The page therefore relies primarily on server-rendered content, optimized images and CSS-based interaction rather than large client-side dependencies.

## Accessibility

Accessibility considerations include:

- semantic page landmarks and heading structure
- a keyboard-accessible skip link
- visible `focus-visible` states
- reduced-motion support
- accessible mobile navigation state
- `aria-controls`
- `aria-expanded`
- `aria-hidden`
- `inert` handling
- Escape-key menu dismissal
- body scroll locking while the mobile navigation is open
- associated form labels
- native form controls
- live form-status feedback

The implementation also avoids relying solely on visual state to communicate navigation and form behavior.

## Quality Gates

The project defines automated quality checks for linting, static typing, production builds and browser-level tests:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```
