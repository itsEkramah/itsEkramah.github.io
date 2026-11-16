# Contact options — 16 November 2026

The owner explicitly requested a labelled Email button, a free15-minute discussion and the supplied inline Calendly booking option. The public event URL ends in `/30min`, but direct browser inspection showed **15 Minute Meeting /15 min** and available dates. The offer's free status is the owner's statement; no invented client engagement or result is implied.

## Implementation and threat boundary

`src/components/EmailLink.astro` replaces the spelled-out address on Home, Portfolio and Contact. Its native mail destination remains public. Google's snippet exclusion is display control, not secrecy or a removal request. See the [Email review](../email-button/REVIEW.md).

`src/lib/site.ts` holds the booking link/duration. Shared consultation links appear on Home's contact preview, Services and its details, and Contact. The copy describes an initial research/data/development discussion, a possible approach and next steps, with no promised solution or medical consultation.

`src/components/BookingPanel.astro` places the calendar on Contact only after the visitor chooses **Show booking calendar**. Before that, no frame or Calendly request exists. The direct link remains available without JavaScript. The frame has a descriptive title, sandbox, strict referrer policy, approved-origin validation and visible close control. Focus returns to the opening control on close. The site CSP permits frames only from `https://calendly.com`; script sources were not widened.

The supplied vendor script is not executed in the parent document. Calendly documents a [basic iframe integration](https://calendly.com/help/how-to-embed-calendly-with-an-iframe); this avoids granting a mutable external script access to the website's DOM. It gives up automatic height adjustment/event tracking. The compact event parameter is used. The `hide_gdpr_banner=1` parameter is deliberately omitted so the site's code does not suppress the vendor's cookie choices; [Calendly's own guidance](https://calendly.com/help/how-to-customize-your-embed) explains the additional responsibility if those choices are hidden. No legal-compliance certification is claimed.

Calendar data, cookies, availability, accessibility and continued service operation remain vendor-controlled. The footer and Contact privacy text now disclose this exception. No API key, account connection, backend form, analytics or auth service was added. No appointment was submitted.

## Evidence and acceptance

Three-engine integration tests use an explicitly labelled local fixture for the external frame: no background request, correct URL/sandbox, open/close/focus, reflow at320/390/768/1440 and a no-JavaScript fallback. The real Calendly calendar was separately opened in the actual browser: the event title and date/time selector rendered inside the site. Fixture tests are not represented as a completed real booking.

Six targeted Email journey checks and three booking checks passed locally; report summaries and actual screenshots accompany this review. The protected PR must pass the full51-case suite, type/build/unit/publishing/link/advisory/pattern checks, and the deployed result must be checked again before completion. Initial-load performance and privacy are measured separately from loading the third-party calendar.

Native zoom, full assistive-technology review, independent timed comprehension, field CWV, credential authentication and actual appointment/email delivery remain unverified. The original [71-requirement matrix](../evidence-led-release/ACCEPTANCE.md) retains its baseline chronology and qualifications.

## Remaining performance limitation

The latest six-page local lab sample scored Home99 /Portfolio99 /Services85 /Writing92 /Contact96 /article92, with A/BP/SEO100, LCP0.9–1.7s and CLS0. A targeted three-sample Services check returned92/86/87 (median87), so its P≥90 target is **not met** in this environment. Earlier lower samples and repeatability checks are retained, not relabelled as passes. Styling is now delivered with HTML using Astro's hashed inline styles; this avoids a blocking stylesheet request at the cost of repeated CSS bytes on navigation. No off-screen rendering or accessibility exclusion was reintroduced. Further score tuning is deferred rather than holding the contact release indefinitely. This is GO for the authorised static publication with this medium limitation, not full PRD acceptance or field-performance certification.
