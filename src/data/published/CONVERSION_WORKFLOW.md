# Draft-to-Published Conversion Workflow

This workflow keeps `src/content-inbox/` draft-only while giving reviewed OpenClaw JSON a repeatable path into approved live article data under `src/data/published/`.

## 1. Review the OpenClaw Draft

1. Open the draft JSON in `src/content-inbox/`.
2. Confirm the file is valid JSON and has the expected article shape for its `articleType`.
3. Read the article as an editor, not just as data. Remove unsupported claims, thin summaries, duplicate language, and anything that sounds like hands-on testing unless documented testing exists.
4. Do not edit live page files to point at `src/content-inbox/`. The inbox remains draft-only.

## 2. Verify Compliance Fields

Confirm `complianceNotes` exists and includes:

- `requiresHumanReview`
- `approvedForPublication`
- `handsOnTestingClaimed`
- `usesExactAmazonPrices`
- `usesAmazonReviewCounts`
- `usesCopiedAmazonDescriptions`
- `usesPriceTiersOnly`
- `affiliateDisclosureVisible`

For a draft moving to published data, the final approved values must be:

- `status`: `published`
- `complianceNotes.approvedForPublication`: `true`
- `complianceNotes.requiresHumanReview`: `false`

## 3. Verify Product and Affiliate Data

For every product entry:

1. Verify the ASIN is real and matches the exact product.
2. Verify the Amazon URL opens the intended product or search result.
3. Verify the affiliate URL includes the correct ArcPoint Gear affiliate tag.
4. Verify product names, brands, specs, pros, cons, and summaries against approved sources.
5. Use price tiers only. Do not publish exact Amazon prices.
6. Do not publish Amazon review counts.
7. Do not copy Amazon product descriptions.

## 4. Verify Images and Sources

1. Review every `images` object and `imagePolicy`.
2. Confirm image source, usage status, and publication rights.
3. Do not self-host Amazon product images unless a separate approved workflow explicitly allows it.
4. Refresh or remove draft-only image references before publication.
5. Confirm `sources` are legitimate, relevant, and not placeholder-only.

## 5. Confirm Claims and Disclosures

Before publication, confirm:

- No fake field testing or hands-on testing claims.
- Research-based methodology is clearly described where applicable.
- Affiliate disclosure is visible on pages that include affiliate CTAs.
- Exact retailer pricing is not shown.
- Amazon review counts are not shown.

## 6. Choose the Published Destination

Copy the reviewed JSON into the destination folder that matches `articleType`:

- `roundup` -> `src/data/published/roundups/`
- `review` -> `src/data/published/reviews/`
- `guide` -> `src/data/published/guides/`
- `comparison` -> `src/data/published/comparisons/`

Use the article slug as the filename:

```text
src/data/published/<type-folder>/<slug>.json
```

## 7. Confirm SEO and Schema Fields

Before the JSON is approved, confirm these fields are present and accurate:

- `title`
- `seoTitle`
- `metaDescription`
- `canonical`
- `datePublished`
- `dateModified`
- `category`
- `keywords`
- `faqs`, only when FAQs are visibly rendered on the page

Confirm the live page emits:

- Article schema
- Breadcrumb schema
- FAQ schema only where visible FAQs exist

## 8. Validate and Build

Run:

```bash
npm run validate:inbox
npm run build
```

Treat validation failures as review blockers. Fix the draft, repeat validation, and only then move approved data into `src/data/published/`.

## 9. Human Approval and Deployment

OpenClaw creates PRs, Codex reviews and builds, and the user merges only after review. Deploy only after human approval. Do not connect NoCodeBackend or Amazon API as part of this conversion workflow.
