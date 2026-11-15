# 09 — Decisions, Constraints and Open Items

## Decisions frozen for v1
- Full-width editorial home, **NOT** persistent left profile/right blog split.
- Theme: warm off-white, charcoal, muted teal; restrained cards and subtle interactions.
- Three distinct visitor routes: Work, Services, Writing; About/CV/Contact accessible in header.
- Static Astro + Markdown/MDX + TypeScript + GitHub Pages; minimal JS, no backend.
- User controls content and source; future `.eu.org` domain depends on actual EU.org approval.
- No lorem ipsum or fabricated professional data in the live build.

## Open items Codex should resolve by inspecting verified local/user assets
- Existing portfolio source and reusable components; confirm permissions to read and edit.
- Actual CV filename and public disclosure approval; actual education/experience dates.
- Verified GitHub repository links, project demo URL (e.g., PathoScope video) and any copyrighted images.
- Name/wording of public services where evidence supports delivery; which SEO claims have proof.
- Professional contact email and LinkedIn URL, optionally only publicly approved URLs.
- Which 1–3 articles are genuinely completed; do not auto-publish templates as real articles.
- Final choice of licensed font files or high-quality system-font fallback.
- The GitHub Pages repository's exact existence/default branch, and any existing content to preserve.

## Decision log
- 2026-11-15: User rejected complicated, high-motion personal sites; values recruiter-first usability, authentic editorial writing, clear categories and human-made appearance.
- 2026-11-15: User chose Option A/C hybrid and preferred full-width Option 1; direct CV/Services/Contact affordances from Option 2 retained.
- 2026-11-15: EU.org application saved for validation; NOT equivalent to domain approval.

## Guardrail for Codex
If open facts are missing, use actual existing repository content, neutral phrasing, hide unsupported sections, or save as unlisted drafts. Do not ask repeatedly about facts already in repository. Only ask for essential high-risk approvals (e.g. replacing existing code, exposing previously private data, changing DNS or deploying to public) if not previously authorized.
