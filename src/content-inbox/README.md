# Content Inbox

`src/content-inbox/` is for unpublished OpenClaw draft JSON files.

Files in this folder are intake examples or incoming drafts only. They are not imported by Astro, do not create live routes, and are not published until a human reviews them and converts approved content into the published data layer in `src/data/`.

## Required OpenClaw Draft JSON Format

OpenClaw should output one JSON object per draft article:

```json
{
  "articleType": "review | roundup | guide | comparison",
  "status": "draft",
  "title": "Best Example Gear for a Specific Use Case",
  "slug": "best-example-gear",
  "category": {
    "name": "Hiking",
    "slug": "hiking"
  },
  "label": "Buying Guide",
  "seoTitle": "Best Example Gear for a Specific Use Case | ArcPoint Gear",
  "metaDescription": "A research-based affiliate article summary written for search results.",
  "intro": [
    "Short opening paragraph that states the use case and research method.",
    "Second paragraph that clarifies this is not a hands-on test unless explicitly field-tested."
  ],
  "disclosure": "ArcPoint Gear may earn commissions from qualifying purchases through affiliate links. Exact retailer pricing may change.",
  "products": [
    {
      "productName": "Example Product",
      "brand": "Example Brand",
      "asin": "B000000000",
      "affiliateUrl": "https://www.amazon.com/?tag=arcpointgear-20",
      "badge": "Best Overall",
      "priceTier": "$$$",
      "arcpointScore": "8.7",
      "bestFor": "Specific buyer or use case.",
      "summary": "Research-based summary based on specifications, category comparison, and owner feedback themes.",
      "specs": [
        ["Capacity", "22 L"],
        ["Best Use", "Day hiking"]
      ],
      "pros": [
        "Research-supported advantage"
      ],
      "cons": [
        "Research-supported limitation"
      ],
      "imagePolicy": "Do not use Amazon product images. Use original, licensed, manufacturer-approved, or placeholder visuals only."
    }
  ],
  "sections": [
    {
      "heading": "Buying Advice",
      "body": [
        "Paragraph one.",
        "Paragraph two."
      ]
    }
  ],
  "faqs": [
    {
      "question": "Is this based on hands-on testing?",
      "answer": "No. This is a research-based article unless explicitly marked Field-Tested Review."
    }
  ],
  "relatedArticles": [
    {
      "title": "Related Article Title",
      "slug": "/guides/example-guide"
    }
  ],
  "sources": [
    {
      "title": "Manufacturer specifications",
      "url": "https://example.com/product",
      "sourceType": "manufacturer"
    }
  ],
  "complianceNotes": {
    "methodLabel": "Research Review | Spec Analysis | Field-Tested Review | Buying Guide",
    "handsOnTestingClaimed": false,
    "usesExactAmazonPrices": false,
    "usesAmazonReviewCounts": false,
    "usesScrapedAmazonImages": false,
    "usesCopiedAmazonDescriptions": false,
    "usesPriceTiersOnly": true,
    "affiliateDisclosureVisible": true
  }
}
```

## Product Object Rules

Each product in `products` must include:

- `productName`
- `brand`
- `asin`
- `affiliateUrl`
- `badge`
- `priceTier`
- `arcpointScore`
- `bestFor`
- `summary`
- `specs`
- `pros`
- `cons`
- `imagePolicy`

## Compliance Guidance

- No fake hands-on testing claims.
- No exact Amazon prices.
- No Amazon review counts.
- No scraped Amazon images.
- No copied Amazon product descriptions.
- Visible affiliate disclosure required.
- Article must state whether it is `Research Review`, `Spec Analysis`, or `Field-Tested Review`.
- If the article is not explicitly `Field-Tested Review`, use language like “based on specifications, category comparison, and owner feedback themes.”
- Keep price tiers only: `$`, `$$`, `$$$`, or `$$$$`.
