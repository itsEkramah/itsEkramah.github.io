# Security and privacy review

Remediation, 16 November 2026: owner-authorised GitHub ruleset `27342891` is Active on `main`: PR, GitHub Actions `validate`, up-to-date branch and conversation resolution required; force pushes/deletion blocked; no bypass actor added. Approval count is zero for a sole-maintainer workflow, not independent second-person review. Branch metadata now reports protected. The older unprotected-branch finding below is historical; current evidence is linked from `qa/evidence-led-release/`.

Scope: static public website, Markdown/MDX content, npm supply chain and GitHub Pages workflow. This review does not certify the owner account, GitHub's infrastructure or third-party destinations.

## Controls implemented

- Static HTML output; no database, auth, backend contact handler, site analytics, remote fonts or third-party scripts executing in the parent page. Contact uses the approved mail link and an owner-requested Calendly booking option. The isolated calendar iframe is created only after a visitor opens it; Calendly may process booking details and use cookies. The initial page makes no Calendly request. Vendor cookie controls are not deliberately hidden.
- Exact direct dependency versions, lockfile, Node pin and disabled dependency lifecycle scripts. `npm ci` is used for validation. Dependabot covers npm and Actions.
- The math dependencies initially introduced a low advisory affecting nested KaTeX. A direct patched KaTeX version and explicit dependency override now align all nested versions. Final audit evidence is saved in `qa/`; rendering is exercised in browser checks.
- Markdown uses a sanitised rendering pipeline. Executable HTML and JavaScript links are covered by an adversarial rendering test. Code uses CSS classes rather than inline style exemptions. Equations use native MathML with KaTeX trust disabled.
- **MDX is executable trusted source, not a sandbox.** It is owner/reviewer controlled, has no public submission endpoint and must be reviewed as code. Markdown sanitisation does not prevent malicious MDX build-time execution. CI has no application secrets and uses read-only contents permissions during validation/build.
- Astro emits a hash-based CSP meta tag with same-origin assets/connections, blocked objects/forms, no remote parent-script sources and `frame-src https://calendly.com` for the optional booking frame. The frame uses an explicit sandbox and an origin-checked URL. The mutable vendor application and its own privacy/accessibility behaviour remain third-party risks. Test the built site: development does not enforce the same production policy.
- Workflow actions are pinned to reviewed commit SHAs. Checkout does not persist credentials. No `pull_request_target`, dynamic shell command from article content or fork deployment. Pages/OIDC write permissions exist only in the deployment job; that job consumes the validated artifact and does not check out source.
- Production deployment is restricted to `main` in the exact owner repository and waits for validation. Owner-required reviews and status checks require branch rules; workflow YAML and CODEOWNERS alone do not enforce them.
- `.env` files are ignored. Source, generated pages and reachable Git history receive a redacted pattern scan. The public CV was checked separately for private contact/address text. Reports never print matched credential values.

## Measured evidence

See `qa/dependency-audit.json`, `qa/production-dependency-audit.json`, `qa/security-scan.json`, `qa/licenses.json`, `qa/external-links.json` and browser results. npm audit and pattern scans have limited coverage and are not proof of complete safety.

The original old HTML/CSS and CV remain in the repository as requested. Static output uses only `public/` and generated pages. Drafts are excluded from the website, RSS and production sitemap; draft sources in a public repository are still public.

## Host and account limitations

GitHub Pages does not honour a `_headers` file for arbitrary response headers. No such file is supplied. A meta CSP cannot enforce `frame-ancestors`, report-only policy or every response-header directive. HSTS, X-Frame-Options, certificate policy and server request logs are hosting concerns. Actual live headers and redirects require measurement after the new site is deployed.

Post-deployment measurement on 15 November 2026: HTTP redirected to HTTPS with 301 and the host sent HSTS `max-age=31556952`. No X-Frame-Options, X-Content-Type-Options or CSP response header was observed. The generated meta CSP was verified on live core pages. See `qa/live-verification.json`; hosting behaviour can change independently of this repository.

GitHub/DNS MFA, account recovery, branch protection and environment approvals were not changed. No DNS, EU.org/deSEC configuration, custom-domain setting, credential or OAuth grant was created. These require owner actions/approval where applicable.

Residual risks include dependency compromise beyond advisory coverage, trusted MDX build execution, malicious reviewed content, public-email spam, copies of previously published material and host-controlled clickjacking/header limitations. Keep permissions small, review updates, preserve recovery access and revoke leaked credentials immediately.

Same-origin fetches are permitted so ordinary site resources, including robots.txt, can be inspected; off-origin connections remain blocked. Browser network checks confirm that no analytics or third-party requests are made.

## Fresh review, 16 November 2026

The [fresh review](../qa/independent-review-2026-11-16/REVIEW.md) measured `main` as unprotected, with required status checks disabled. This is an open high-priority production-integrity finding; CODEOWNERS and passing validation do not enforce the intended reviewed publishing process. No repository rules, bypass policy, account configuration or deployment was changed during that review.

The local secret scanner now also covers generated JavaScript, JSON, CSS, XML, SVG, text and source maps. A synthetic generated-JavaScript canary was detected and removed, followed by a clean scan. This expands pattern coverage without certifying the absence of all credentials. The review includes current dependency, live HTTPS/header, outbound-request and content-provenance evidence, and records assistive-technology, account/DNS controls and field Core Web Vitals as not tested.
