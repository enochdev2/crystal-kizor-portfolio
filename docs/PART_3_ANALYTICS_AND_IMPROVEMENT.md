# Part 3 — Analytics & Improvement

I would measure the site as a **conversion journey**, not only by traffic. Core metrics would include qualified visits, traffic source, engagement with selected work, initiative-link clicks, enquiry starts, form completion, successful submissions and Core Web Vitals. I would segment by device, source, geography and landing experience to avoid hiding problems inside an average.

For this implementation I would use Vercel Web Analytics for traffic/custom events, Speed Insights for real-user performance, and the application's own semantic conversion events. Session-replay tooling could be added selectively if quantitative data shows a problem that needs behavioural context.

At 5,000 visitors and 5 enquiries, the enquiry rate is **0.1%**. I would not immediately redesign the CTA. First I would verify tracking and form delivery, then inspect the funnel: relevant traffic → work/initiative engagement → enquiry CTA click → form start → validation errors/abandonment → successful submission.

If users never reach or click the enquiry path, I would test positioning, hierarchy, trust signals and CTA clarity. If they start but abandon, I would reduce unnecessary fields, inspect mobile usability and validation friction. If submissions fail, that is an engineering/reliability issue, not a marketing issue. I would also compare acquisition sources: 5,000 poorly matched visitors can be less valuable than 500 high-intent visitors.

Changes would be shipped as specific hypotheses, measured against the same funnel, and kept only when they improve qualified enquiry conversion without degrading accessibility, performance or lead quality.
