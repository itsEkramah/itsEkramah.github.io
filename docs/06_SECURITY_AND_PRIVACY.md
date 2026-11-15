# 06 — Security & Privacy Threat Model and Checklist

## Scope and realistic assurances
A static site has a lower attack surface than a server-side app, but is **not invulnerable**. The project must be tested for dependencies, HTML injection, malicious links, supply-chain compromise, exposed secrets, unsafe workflows, domain takeover, privacy leakage and misconfiguration. Never claim zero vulnerabilities or complete safety.

## Threat model
**Assets:** GitHub repository credentials, Actions permissions, domain/DNS control, published content integrity, users' browsing privacy, resume/contact information, third-party integrations.
**Threats:** compromised dependencies, unsafe Markdown/MDX HTML injection, malicious PR content, dependency install scripts, CI token abuse, third-party script tracking, stolen DNS credentials, misconfigured CNAME/subdomain, publicly exposed secrets or private data, link injection/open redirect, search poisoning.

## Must-have controls
1. Owner account and DNS accounts: strong unique credentials, MFA/2FA, recovery methods; no secret sharing in chat/commits/screenshots.
2. Repository: inspect existing code before modification; default branch protection if supported; PR review; restrict `GITHUB_TOKEN` permissions; deployment only on approved branch, no fork PR deploy; do not checkout untrusted PR code with elevated tokens.
3. CI: official, trusted actions; pin actions to immutable commit SHAs when feasible and keep reviewable update process; lock dependencies and `npm ci`; separate test and deploy permissions; no shell execution of untrusted content.
4. Dependency hygiene: minimize dependencies, inspect package scripts, `npm audit --omit=dev` plus full audit, Dependabot configuration, review high/critical advisories and exploitability; audit is not a guarantee.
5. No secrets in `PUBLIC_` variables, JS bundles, HTML or Git; `.gitignore` env files; scan tracked files/history before publishing and revoke leaked tokens, don't merely delete them.
6. Content: avoid `set:html`/`innerHTML` with untrusted strings; use framework-safe renderers, schema validation, safe code highlighting and sanitize any explicitly allowed HTML; no untrusted user submissions v1.
7. Third-party scripts/fonts/embeds: no remote JS by default; use click-to-load embeds and privacy notices where unavoidable; `rel="noopener noreferrer"` for `target="_blank"`; verify link destinations.
8. Security headers: static GitHub Pages does not provide custom response-header configuration. Do **not** pretend a `public/_headers` file works on GitHub Pages. Inspect actual response headers. Favor no external scripts; evaluate enforceable CSP via Astro meta/document if appropriate, noting meta CSP limitations (cannot replace every response-header directive); never claim HSTS/X-Frame-Options controlled by website code when host controls headers.
9. HTTPS: enforce through GitHub Pages after domain setup; avoid mixed content; verify certificate and redirect.
10. Domain: verify GitHub ownership/custom domain before mapping records; monitor dangling DNS; EU.org approval is separate from deSEC zone creation. Keep 2FA on registrar/DNS/GitHub.
11. Privacy: do not embed address/phone in public markup or generated JSON-LD without explicit approval. A private WHOIS setting does not ensure privacy of site content. Public email can attract spam; choose a dedicated professional address if desired.
12. No unnecessary contact form, cookies, third-party analytics, comment systems, or API keys. `mailto:` preferred initial contact.

## Required checks
- `npm audit` review (including development dependencies); dependency/license inventory.
- Secret scans (`git grep` + automated tool if available), source/bundle inspection for credentials and private details.
- Static output audit for risky `http:` links, third-party script requests, HTML injection surfaces, `target="_blank"` without rel, sourcemaps with secrets.
- Browser network panel: verify no unwanted trackers or unexpected outbound requests.
- CI permissions and event trigger review.
- HTTPS, DNS, canonical and redirect tests after deployment; security headers measured, not assumed.
- Dependabot or equivalent update process, monthly routine maintenance and immediate action on critical relevant advisories.

## Security issue handling
Classify by exploitability/impact; block launch on real exposed credentials, cross-site script injection, high-severity exploitable dependency, broken domain config or leaked private data. Record residual risks, remediation, version/retest. Do not run intrusive scans against third-party services without authorization.
