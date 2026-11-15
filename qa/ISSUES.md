# Remaining limitations and maintenance

Release review: 15 November 2026. No known unresolved release blocker after the recorded automated checks. This is not an accessibility, scientific or security certification.

| Status | Item | Practical consequence / next action |
| --- | --- | --- |
| NOT TESTED | Real-device assistive technology | Keyboard, zoom, semantic checks and axe were exercised; a person should still review with NVDA/VoiceOver and actual low-end phones. |
| NOT TESTED | Ten-second comprehension with independent visitors | The first viewport exposes the three areas and direct navigation; no timed user study was conducted. |
| NOT TESTED | Field Core Web Vitals | Lighthouse is a throttled local lab measurement. Collect field data when enough real traffic exists. No ranking or conversion result is promised. |
| NOT TESTED | LinkedIn and university automated verification | LinkedIn returned 999 and qau.edu.pk returned 403. These are preserved existing URLs, not proven broken links; manual destination verification remains advisable. |
| NOT TESTED | YouTube playback/content | The existing PathoScope video URL returned HTTP 200. Playback and every claim in the video were not independently reviewed. |
| NOT TESTED | Account MFA, recovery, enforced owner review and branch protection | CODEOWNERS and CI are included; owner account controls and required branch rules were not changed or certified. |
| Host limitation | HTTP security headers | GitHub Pages controls headers. Meta CSP cannot implement frame-ancestors or arbitrary response headers; no _headers workaround is claimed. |
| Content limitation | Scientific review | Published articles are source-based educational writing, not peer review or clinical advice. Original project estimates retain limitations and demonstration disclosures. |
| Content visibility | Draft source in a public repository | Drafts are excluded from deployed pages, feeds and sitemaps, but committed Markdown source is publicly readable. Keep confidential manuscripts elsewhere. |
| Trusted-source risk | MDX | MDX executes at build time. Review it as code; no public uploads or CMS authentication were added. |
| Deferred | Optional CMS and EU.org domain | CMS trade-offs are documented; no provider installed. No custom-domain or DNS migration performed. |
| Maintenance | Initial Dependabot proposals | Update PRs are open for review and remain unmerged. They are independent of the successful website release; validate compatibility before accepting them. |

Resolved during implementation: clean-checkout report-directory failure; a credential-pattern false positive in an ordinary heading slug; small citation targets; mobile/keyboard skip-link behaviour; vulnerable nested math dependency; and delayed Writing controls causing layout shift. Historical failed runs are retained in GitHub Actions. Re-run validation after future changes.
