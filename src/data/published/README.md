# Published Article Data

This folder contains approved article data that can power live ArcPoint Gear pages.

## Drafts vs Published Content

- `src/content-inbox/` is for OpenClaw draft packages only.
- Drafts are not imported by Astro and are not live.
- Published content belongs in `src/data/published/` only after human review.
- Only content with `status: "published"` and `complianceNotes.approvedForPublication: true` should be placed here.
- Published article data powers live pages through `src/data/publishedArticles.ts`.

## Publishing Rules

- OpenClaw does not write directly here unless explicitly instructed after review.
- Human review is required before publication.
- Do not publish exact Amazon prices unless a compliant refresh/timestamp system exists.
- Do not publish Amazon review counts.
- Do not copy Amazon product descriptions verbatim.
- Keep affiliate disclosure visible anywhere affiliate CTAs appear.
- Keep draft-only package fields in `src/content-inbox/` until the article is approved.
