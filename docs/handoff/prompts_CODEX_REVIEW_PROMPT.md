# CODEX INDEPENDENT REVIEW / HARDENING PROMPT

You are the independent senior reviewer for the Ekramah professional website. Review the implementation against all `docs/*.md`, not merely whether `npm run build` succeeds. Do not rubber-stamp. Inspect actual source, lockfile, GitHub workflow and compiled output; test in browser.

**Review dimensions:** (1) visual polish and originality — not generic AI template, (2) 10-second recruiter/client route clarity, (3) content authenticity and medical/research accuracy, (4) semantic SEO and canonical behavior, (5) WCAG 2.2 AA accessibility, (6) responsiveness and Core Web Vitals proxies, (7) repository/CI/dependency/domain security, (8) broken links/navigation/filter behavior, (9) maintainability and article publishing workflow.

**Testing:** run exact available commands (install, check, build, lint, unit/e2e, axe, Lighthouse, npm audit, secret and outbound request checks). If a tool is unavailable, record NOT TESTED, not PASS. Use real browser at 390/768/1440 widths and inspect screenshots for awkward density, excessive cards, missing CTAs, tiny copy and scroll problems. Verify GitHub Pages route refresh and HTTPS.

**Security focus:** supply chain, excessive GitHub Actions permissions, PR events with secrets, unsafe HTML/MDX, exposed credentials in JS/build/history, third-party scripts and DNS takeover risk. Do not claim custom security headers on GitHub Pages unless measured at HTTP response layer. Do not run unauthorized scanning against third-party hosts.

**Output:** an evidence-based report ordered by Critical / High / Medium / Low with file:line, reproducible steps, business impact and precise remediation. Fix critical/high items and retest where authorized; provide an acceptance matrix for each PRD requirement. Explicitly identify any unverified biography, project metrics, articles, social links or service claims. Conclude with GO / NO-GO for public launch, including residual risks and actual test results.
