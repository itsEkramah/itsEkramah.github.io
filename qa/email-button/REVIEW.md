# Email label and snippet control — 16 November 2026

The owner asked to hide the spelled-out address under an Email button. `src/components/EmailLink.astro` now supplies the same native, keyboard-accessible mail link on Home, Portfolio and Contact. It works without JavaScript. The rendered label and accessible name are Email; the original approved destination is preserved. No backend, third-party form, script or authentication service was added.

The link is wrapped in a `span[data-nosnippet]`, following [Google's documented snippet controls](https://developers.google.com/search/docs/appearance/snippet). Metadata and structured data do not contain the address. Tests verify the three page bodies do not spell it out, while the native destination remains correct. Six targeted three-engine recruiter/client cases passed; see `targeted-results.json`.

This does **not** make the address private: the mail link's source and public repository history still contain it. It cannot recall older search results, cached copies or previously downloaded material. Current PDF text extraction did not find this Outlook address; the CV was preserved. No Search Console removal or recrawl request was submitted, and no instant search-result change is claimed.

The later consultation request is combined with this change in the contact-options release. Its protected full51-case CI and live verification must pass before publication is reported complete. The earlier design, article, keyboard-code and security reviews remain applicable.
