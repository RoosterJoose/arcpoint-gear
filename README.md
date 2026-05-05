# ArcPoint Gear

ArcPoint Gear is a Phase 1 front-end foundation for a premium affiliate gear publication focused on research-led outdoor, athletic, tactical, photography, golf, fishing, hunting, camping, and performance equipment coverage.

## Stack

- Astro
- Standard CSS
- GitHub
- Hostinger later

## Local Commands

```sh
npm run dev
npm run build
npm run preview
```

## Editorial and Affiliate Notes

- Do not make fake hands-on testing claims.
- Do not say products were field-tested unless the article is explicitly field-tested and the claim is true.
- Use research-review language when appropriate: specifications, category comparison, and owner feedback.
- Do not show exact Amazon prices.
- Do not show Amazon review counts.
- Affiliate disclosures are required anywhere affiliate links or buying CTAs appear.

## Current Status

Phase 1 front-end publishing foundation. No CMS, backend, user accounts, payments, shopping cart, admin dashboard, OpenClaw, NoCodeBackend, or live retailer API integrations are connected.

## OpenClaw Publishing Workflow

1. OpenClaw creates draft JSON in the format documented in `src/content-inbox/README.md`.
2. Draft JSON is submitted through a GitHub PR.
3. Codex performs compliance review for claims, method labels, affiliate disclosure, Amazon pricing, Amazon review counts, and image policy.
4. Approved drafts are converted to published article data in `src/data/articleContent.js`.
5. Run `npm run build`.
6. Deploy `dist/` to StartHost.

Drafts in `src/content-inbox/` are not published automatically.
