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
      "amazonUrl": "https://www.amazon.com/dp/B000000000",
      "affiliateUrl": "https://www.amazon.com/dp/B000000000?tag=arcpointgear-20",
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
      "images": {
        "primary": "https://m.media-amazon.com/images/I/EXAMPLE.jpg",
        "source": "amazon"
      },
      "imagePolicy": "Amazon product images may be used for draft workflow and review packaging. Final publication handling remains subject to site review policy."
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
      "title": "Amazon product listing",
      "url": "https://www.amazon.com/dp/B000000000",
      "sourceType": "amazon"
    }
  ],
  "complianceNotes": {
    "methodLabel": "Research Review | Spec Analysis | Field-Tested Review | Buying Guide",
    "handsOnTestingClaimed": false,
    "usesExactAmazonPrices": false,
    "usesAmazonReviewCounts": false,
    "usesAmazonProductImages": true,
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
- `amazonUrl`
- `affiliateUrl`
- `badge`
- `priceTier`
- `arcpointScore`
- `bestFor`
- `summary`
- `specs`
- `pros`
- `cons`
- `images`
- `imagePolicy`

## Compliance Guidance

- No fake hands-on testing claims.
- No exact Amazon prices.
- No Amazon review counts.
- Amazon product image references may be included in draft packages for review workflows.
- No copied Amazon product descriptions.
- Amazon product data and Amazon image references are allowed in draft packages.
- Visible affiliate disclosure required.
- Article must state whether it is `Research Review`, `Spec Analysis`, or `Field-Tested Review`.
- If the article is not explicitly `Field-Tested Review`, use language like “based on specifications, category comparison, and owner feedback themes.”
- Keep price tiers only: `$`, `$$`, `$$$`, or `$$$$`.
