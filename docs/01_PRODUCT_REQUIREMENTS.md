# 01 — Product Requirements Document (PRD)

## Vision and value proposition
A carefully edited professional personal website that feels human-made: restrained visual design, authoritative but modest writing, original analysis figures and clear links to real work. Demonstrate capability rather than proclaim expertise. No 'AI slop', template clichés, fake social proof or gratuitous animation.

## Audiences and first-visit jobs
- **Recruiter (highest navigation priority):** Who is Ekramah, what can he do, what relevant projects/experience/education does he have, where is CV/GitHub/LinkedIn? Achieve destination from global navigation in <= 1 click; relevant evidence from portfolio index <= 2 clicks.
- **Prospective client:** What services, deliverables, proof and contact method? Services link must be permanently available on desktop and mobile; contact CTA must be visible on each service detail.
- **Reader/search visitor:** Read an individual technical article, identify its date, field, author, sources and related work, then explore more writing without intrusion.
- **Research collaborator:** Discover methodological rigor, reproducibility, references, limitations and code.

## Navigation model
Top nav: Work (Portfolio), Services, Writing, About, CV (direct PDF only if supplied), Contact, GitHub external link. On mobile provide accessible menu, not hidden hover-only items. Home logo links to `/`.

## Homepage sections (in order)
1. Minimal header; one clear name, truthful professional descriptor, compact 1–2 sentence value statement; two primary links `View Work` and `Explore Services`; secondary `Read Writing`.
2. Selected projects (2–4 only), each with actual artifact thumbnail or high-quality typographic treatment, evidence and direct case study link.
3. Services overview (4–6 groups) with what is delivered, not broad skill buzzwords; prominent `/services/` link.
4. Selected writing (3–5 genuinely published pieces), with easy category discovery and `/writing/` library link.
5. Experience and education summarized accurately, timeline/details on `/about/`.
6. Contact and social links; simple footer.

## Independent routes
`/`, `/work/`, `/work/[slug]/`, `/services/`, optional `/services/[slug]/`, `/writing/`, `/writing/[category]/` if warranted by content volume, `/writing/[category]/[slug]/`, `/about/`, `/contact/`, `/404/`. `/cv/` optional if an actual PDF is available. No blank routes.

## Functional requirements
- Functional navigation, skip link, visible keyboard focus, functional active states, search/filter with no hidden indexability dependence.
- Published article cards show actual category, date, excerpt and direct readable URL; categories include Bioinformatics & Genomics, Medicine & Pharma, Data & Analytics, Software & Web, Business & SEO. Avoid empty filter tabs.
- Full article template with readable content measure, title, publication/updated dates, table of contents when needed, references, code highlighting, figure captions, related content, author/byline.
- Project templates: problem, dataset/scope, approach, implementation, results with evidence, limitations, GitHub/demo links if real.
- Services: audience, concrete scope, typical deliverables, boundaries, sample of related evidence, contact CTA; avoid claims that exceed verified experience.
- Contact: deliberate `mailto:` and public professional links only; no backend form v1.
- Responsive: phone ~320px to large desktop without horizontal overflow. Allow zoom >= 200%; reduced motion support.
- Search UX: first launch should favor simple client-side filtering from a compact JSON/search index or accessible native list, progressive enhancement; do not ship a heavy search service unless testing shows need.

## Non-functional targets
- WCAG 2.2 AA target, with automated and manual accessibility tests.
- Lighthouse mobile scores goal Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95 on representative pages; scores are goals, not guarantees. Explain/test conditions.
- Core Web Vitals: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75 in field once real data exists. Lab tests are only proxies.
- Low JS; no framework hydration where native HTML works. No remote fonts needed; self-host licensed font files only if permissible; default system stack acceptable.
- No trackers, cookies, embeds, third-party JS by default. No fabricated metrics.

## Editorial acceptance
Never fabricate degrees, job roles, grades, affiliations, testimonials, clients, case studies, dates, posts, lab results, or code repositories. Unknowns are left unpublished or clearly marked in local draft. No fake portrait. All external links must be verified before launch.
