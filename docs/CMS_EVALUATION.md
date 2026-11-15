# Optional browser CMS evaluation

Decision, 15 November 2026: use Markdown/MDX and reviewed Git changes. No CMS, OAuth application, third-party authentication service or new credential has been installed or created. Adding one requires owner approval.

| Option | GitHub Pages fit | Authentication and upkeep | Assessment |
| --- | --- | --- | --- |
| GitHub web editor | Source editing plus Actions static build. | Existing GitHub account/MFA and repository permissions. No additional authentication service. Basic preview differs from Astro. | Recommended initial browser workflow. |
| Decap CMS, GitHub backend | Static editor, with a server/helper or external OAuth client for GitHub authentication. Pages cannot keep a client secret or run the callback server. | OAuth service, callback configuration, token scopes/storage, editor updates and custom MDX preview need maintenance. Editors need repository push access. | Consider when publishing volume justifies extra infrastructure. |
| Keystatic GitHub mode | Public site can stay static, but a deployed editor needs separate server handling or a hosted service. | GitHub app/secret or cloud service, admin runtime, access reviews, schema maintenance, availability and possible costs. | Requires an agreed editor-hosting and authentication plan. |

Sources consulted on 15 November 2026: [Decap GitHub backend](https://decapcms.org/docs/github-backend/) and [Keystatic GitHub mode](https://keystatic.com/docs/github-mode). Their capabilities and plans may change.

Before approving an integration, choose editors, MDX scope, authentication host, repository permissions, token storage/revocation, update ownership and an outage/rollback path. Never expose a GitHub token or OAuth client secret in a static admin bundle. A CMS would retain the schema, factual review, validation and static deployment pipeline.
