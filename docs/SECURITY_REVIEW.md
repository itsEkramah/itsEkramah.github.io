# Security and privacy review

Scope: static public website, Markdown/MDX content, npm supply chain and GitHub Pages workflow. This review does not certify the owner account, GitHub's infrastructure or third-party destinations.

## Controls implemented

- Static HTML output; no database, auth, backend contact handler, analytics, cookies, remote fonts, external scripts or embedded video. Contact uses an owner-approved mail link and public profiles.
- Exact direct dependency versions, lockfile, Node pin and disabled dependency lifecycle scripts. `npm ci` is used for validation. Dependabot covers npm and Actions.
- The math dependencies initially introduced a low advisory affecting nested KaTeX. A direct patched KaTeX version and explicit dependency override now align all nested versions. Final audit evidence is saved in `qa/`; rendering is exercised in browser checks.
- Markdown uses a sanitised rendering pipeline. Executable HTML and JavaScript links are covered by an adversarial rendering test. Code uses CSS classes rather than inline style exemptions. Equations use native MathML with KaTeX trust disabled.
- **MDX is executable trusted source, not a sandbox.** It is owner/reviewer controlled, has no public submission endpoint and must be reviewed as code. Markdown sanitisation does not prevent malicious MDX build-time execution. CI has no application secrets and uses read-only contents permissions during validation/build.
- Astro emits a hash-based CSP meta tag with same-origin assets, same-origin connections and blocked objects/forms and no remote script sources. Test the built site: development does not enforce the same production policy.
- Workflow actions are pinned to reviewed commit SHAs. Checkout does not persist credentials. No `pull_request_target`, dynamic shell command from article content or fork deployment. Pages/OIDC write permissions exist only in the deployment job; that job consumes the validated artifact and does not check out source.
- Production deployment is restricted to `main` in the exact owner repository and waits for validation. Owner-required reviews and status checks require branch rules; workflow YAML and CODEOWNERS alone do not enforce them.
- `.env` files are ignored. Source, generated pages and reachable Git history receive a redacted pattern scan. The public CV was checked separately for private contact/address text. Reports never print matched credential values.

## Measured evidence

See `qa/dependency-audit.json`, `qa/production-dependency-audit.json`, `qa/security-scan.json`, `qa/licenses.json`, `qa/external-links.json` and browser results. npm audit and pattern scans have limited coverage and are not proof of complete safety.

The original old HTML/CSS and CV remain in the repository as requested. Static output uses only `public/` and generated pages. Drafts are excluded from the website, RSS and production sitemap; draft sources in a public repository are still public.

## Host and account limitations

GitHub Pages does not honour a `_headers` file for arbitrary response headers. No such file is supplied. A meta CSP cannot enforce `frame-ancestors`, report-only policy or every response-header directive. HSTS, X-Frame-Options, certificate policy and server request logs are hosting concerns. Actual live headers and redirects require measurement after the new site is deployed.

GitHub/DNS MFA, account recovery, branch protection and environment approvals were not changed. No DNS, EU.org/deSEC configuration, custom-domain setting, credential or OAuth grant was created. These require owner actions/approval where applicable.

Residual risks include dependency compromise beyond advisory coverage, trusted MDX build execution, malicious reviewed content, public-email spam, copies of previously published material and host-controlled clickjacking/header limitations. Keep permissions small, review updates, preserve recovery access and revoke leaked credentials immediately.

Same-origin fetches are permitted so ordinary site resources, including robots.txt, can be inspected; off-origin connections remain blocked. Browser network checks confirm that no analytics or third-party requests are made.
