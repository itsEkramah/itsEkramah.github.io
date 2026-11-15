# 02 — Information Architecture and User Journeys

## Conceptual sitemap
```
/
├── work/
│   └── [verified-project]/
├── services/
│   └── [service]/              # only if content warrants dedicated service pages
├── writing/
│   ├── bioinformatics/...
│   ├── medicine-pharma/...
│   ├── data-analytics/...
│   ├── software-web/...
│   └── business-seo/...
├── about/
├── contact/
├── cv.pdf                     # only if an actual approved public CV exists
└── 404/
```

## Routes and navigation rules
- Use `Work` not ambiguous `Portfolio + Projects` duplicate links. `/work/` is portfolio index; case studies each get slug route.
- `Writing` is an archive, not a scroll-trapped right panel. It should feel editorial. Avoid separate empty topic pages until enough articles exist (recommend >= 3 published posts per category).
- Global nav always visible in header. Anchors on homepage may help but must not replace routes. On mobile, menu opens/closes with proper aria state and focus handling.
- Cross-link responsibly: a real AMR article can link to a related genomic analysis project; a service can link to a real supporting case study; do not inject sales content mid-article.
- Each page has one H1, meaningful headings, breadcrumbs where useful, unique meta title and description.

## Key user journeys
1. Recruiter: Home -> Work -> Genomic AMR case study -> GitHub; OR Home -> About -> CV. Never require browsing articles.
2. Client: Home -> Services -> Data analysis -> evidence -> Contact. Contact reachable within 1–2 clicks.
3. Search user: Google -> tutorial -> related reading -> Work/Services (nonintrusive).
4. Returning reader: Writing -> category selection / search -> article -> next relevant piece.

## Taxonomy
**Primary category (exactly one per article):** `bioinformatics`, `medicine-pharma`, `data-analytics`, `software-web`, `business-seo`.
**Secondary tags (0–5):** e.g. `RNA-seq`, `AMR`, `R`, `Python`, `Machine Learning`, `Technical SEO`, `FastAPI`. Canonical spelling rules and no synonyms as duplicates.
**Format:** `tutorial`, `research-note`, `essay`, `case-study`, `review` — independent from topic category. Maggie Appleton-like clarity of format, not her exact design or trademark visual identity.

## Page templates
- Home: restrained editorial section list, not 20 cards.
- Work index: sortable/filtered sections optional; all projects render in HTML.
- Work detail: explicit evidence and limitations.
- Services index: offerings grouped into Research/Bioinformatics, Analytics/Automation, Web/Development, SEO/AI Search; may split further when supported.
- Writing archive: category chips + keyword filter + clean chronological/editorial list. Never hide every item before JavaScript runs.
- Writing detail: sticky TOC on larger screens only if nonintrusive; narrow column.
- About: concise personal bio; chronological education + employment/internship; selected skills; professional links.
- Contact: email link, GitHub, LinkedIn; no unverified scheduling widgets.

## Content density
Limit featured projects to 2–4, selected articles to 3–5, services overview to 4–6. Prefer purposeful text with direct links. No repetitive keyword stuffing or overly long lists on homepage.
