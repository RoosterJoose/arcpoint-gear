import bestUltralightHikingBackpacks from "./published/roundups/best-ultralight-hiking-backpacks.json";

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

const publishedRoundups = [bestUltralightHikingBackpacks] as PublishedArticle[];
const publishedReviews: PublishedArticle[] = [];
const publishedGuides: PublishedArticle[] = [];
const publishedComparisons: PublishedArticle[] = [];

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
