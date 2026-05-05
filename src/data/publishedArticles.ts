type PublishedArticle = {
  articleType: "review" | "roundup" | "guide" | "comparison";
  status: "published";
  title: string;
  slug: string;
  canonical?: string;
  category: {
    name: string;
    slug: string;
  };
  label: string;
  seoTitle: string;
  metaDescription: string;
  date?: string;
  datePublished?: string;
  dateModified?: string;
  readTime?: string;
  excerpt?: string;
  heroLabel?: string;
  keywords?: string[];
  intro: string[];
  disclosure: string;
  products?: Array<{
    productName: string;
    badge: string;
    priceTier: string;
    bestFor: string;
    summary: string;
    weightClass?: string;
    affiliateUrl?: string;
  }>;
  product?: {
    name: string;
    category: string;
    priceTier: string;
    score: string;
    bestFor: string;
    affiliateUrl: string;
    specs: string[][];
    pros: string[];
    cons: string[];
  };
  buySkip?: {
    buy: string;
    skip: string;
  };
  analysis?: string[];
  verdict?: string;
  cta?: {
    label: string;
    href: string;
    priceTier?: string;
    disclosure: string;
  };
  factors?: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  specRows?: string[][];
  tableRows?: string[][];
  winners?: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  sections?: Array<{
    heading: string;
    body: string[];
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  relatedArticles?: Array<{
    title: string;
    slug: string;
  }>;
  complianceNotes: {
    approvedForPublication: boolean;
    requiresHumanReview: boolean;
  };
};

const publishedArticleModules = import.meta.glob<PublishedArticle>("./published/**/*.json", {
  eager: true,
  import: "default",
});

const publishedArticleSeeds = Object.values(publishedArticleModules);
const publishedRoundups = publishedArticleSeeds.filter((article) => article.articleType === "roundup");
const publishedReviews = publishedArticleSeeds.filter((article) => article.articleType === "review");
const publishedGuides = publishedArticleSeeds.filter((article) => article.articleType === "guide");
const publishedComparisons = publishedArticleSeeds.filter((article) => article.articleType === "comparison");

const isApprovedPublishedArticle = (article: PublishedArticle) =>
  article.status === "published" &&
  article.complianceNotes?.approvedForPublication === true &&
  article.complianceNotes?.requiresHumanReview === false;

const normalizeRoundupArticle = (article: PublishedArticle) => ({
  kind: "roundup",
  title: article.title,
  description: article.metaDescription,
  canonical: article.canonical ?? `/best/${article.slug}`,
  category: article.category.name,
  categorySlug: article.category.slug,
  typeLabel: article.label,
  date: article.date ?? "",
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  readTime: article.readTime ?? "",
  excerpt: article.excerpt ?? article.metaDescription,
  heroLabel: article.heroLabel ?? article.label,
  keywords: article.keywords ?? [],
  intro: article.intro,
  disclosure: article.disclosure,
  products: (article.products ?? []).map((product) => ({
    rank: product.badge,
    name: product.productName,
    priceTier: product.priceTier,
    weightClass: product.weightClass ?? "Research shortlist",
    bestFor: product.bestFor,
    notes: product.summary,
    affiliateUrl: product.affiliateUrl,
  })),
  tableRows: [
    ["Pick", "Product", "Price Tier", "Best For"],
    ...(article.products ?? []).map((product) => [
      product.badge,
      product.productName,
      product.priceTier,
      product.bestFor,
    ]),
  ],
  buyingAdvice: (article.sections ?? []).flatMap((section) => section.body),
  sections: article.sections ?? [],
  cta: {
    label: "Check Current Price",
    href: article.products?.[0]?.affiliateUrl ?? "https://www.amazon.com/?tag=arcpointgear-20",
    disclosure: article.disclosure,
  },
  faqs: article.faqs ?? [],
  relatedArticles: article.relatedArticles ?? [],
  approvedForPublication: article.complianceNotes.approvedForPublication,
});

const normalizeBaseArticle = (article: PublishedArticle, canonicalPrefix: string) => ({
  kind: article.articleType,
  title: article.title,
  description: article.metaDescription,
  canonical: article.canonical ?? `/${canonicalPrefix}/${article.slug}`,
  category: article.category.name,
  categorySlug: article.category.slug,
  typeLabel: article.label,
  date: article.date ?? "",
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  readTime: article.readTime ?? "",
  excerpt: article.excerpt ?? article.metaDescription,
  heroLabel: article.heroLabel ?? article.label,
  keywords: article.keywords ?? [],
  intro: article.intro,
  disclosure: article.disclosure,
  faqs: article.faqs ?? [],
  relatedArticles: article.relatedArticles ?? [],
  approvedForPublication: article.complianceNotes.approvedForPublication,
});

const normalizeReviewArticle = (article: PublishedArticle) => ({
  ...normalizeBaseArticle(article, "reviews"),
  product: article.product,
  buySkip: article.buySkip ?? { buy: "", skip: "" },
  analysis: article.analysis ?? [],
  verdict: article.verdict ?? "",
  cta: article.cta ?? {
    label: "Check Price on Amazon",
    href: article.product?.affiliateUrl ?? "https://www.amazon.com/?tag=arcpointgear-20",
    priceTier: article.product?.priceTier,
    disclosure: article.disclosure,
  },
});

const normalizeGuideArticle = (article: PublishedArticle) => ({
  ...normalizeBaseArticle(article, "guides"),
  factors: article.factors ?? [],
  sections: (article.sections ?? []).map((section) => ({
    title: section.heading,
    text: section.body.join("\n\n"),
  })),
  specRows: article.specRows ?? [],
});

const normalizeComparisonArticle = (article: PublishedArticle) => ({
  ...normalizeBaseArticle(article, "compare"),
  tableRows: article.tableRows ?? [],
  winners: article.winners ?? [],
  sections: (article.sections ?? []).map((section) => ({
    title: section.heading,
    text: section.body.join("\n\n"),
  })),
});

export const publishedArticles = [
  ...publishedRoundups,
  ...publishedReviews,
  ...publishedGuides,
  ...publishedComparisons,
].filter(isApprovedPublishedArticle);

export const publishedArticlesByType = {
  roundups: publishedRoundups.filter(isApprovedPublishedArticle),
  reviews: publishedReviews.filter(isApprovedPublishedArticle),
  guides: publishedGuides.filter(isApprovedPublishedArticle),
  comparisons: publishedComparisons.filter(isApprovedPublishedArticle),
};

export const getPublishedArticlesByCategory = (categorySlug: string) =>
  publishedArticles.filter((article) => article.category.slug === categorySlug);

export const getPublishedArticleBySlug = (slug: string) =>
  publishedArticles.find((article) => article.slug === slug);

export const getPublishedRoundupBySlug = (slug: string) => {
  const article = publishedArticlesByType.roundups.find((item) => item.slug === slug);
  return article ? normalizeRoundupArticle(article) : undefined;
};

export const getPublishedReviewBySlug = (slug: string) => {
  const article = publishedArticlesByType.reviews.find((item) => item.slug === slug);
  return article ? normalizeReviewArticle(article) : undefined;
};

export const getPublishedGuideBySlug = (slug: string) => {
  const article = publishedArticlesByType.guides.find((item) => item.slug === slug);
  return article ? normalizeGuideArticle(article) : undefined;
};

export const getPublishedComparisonBySlug = (slug: string) => {
  const article = publishedArticlesByType.comparisons.find((item) => item.slug === slug);
  return article ? normalizeComparisonArticle(article) : undefined;
};
