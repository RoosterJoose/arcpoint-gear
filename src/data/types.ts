export type PriceTier = "$" | "$$" | "$$$" | "$$$$";

export type FAQItem = {
  question: string;
  answer: string;
};

export type SpecRow = [label: string, value: string];

export type ProsCons = {
  pros: string[];
  cons: string[];
};

export type AffiliateCTA = {
  label: string;
  href: string;
  disclosure: string;
  priceTier?: PriceTier;
};

export type ProductCard = {
  name: string;
  category: string;
  priceTier: PriceTier;
  score?: string;
  bestFor: string;
  affiliateUrl?: string;
  specs?: SpecRow[];
  pros?: string[];
  cons?: string[];
  rank?: string;
  weightClass?: string;
  notes?: string;
};

type BaseArticle = {
  kind: "review" | "roundup" | "guide" | "comparison";
  title: string;
  description: string;
  canonical: string;
  category: string;
  categorySlug: string;
  typeLabel: string;
  date: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  excerpt: string;
  heroLabel: string;
  keywords: string[];
  faqs: FAQItem[];
};

export type ReviewArticle = BaseArticle & {
  kind: "review";
  product: ProductCard;
  buySkip: {
    buy: string;
    skip: string;
  };
  analysis: string[];
  verdict: string;
  cta: AffiliateCTA;
};

export type RoundupArticle = BaseArticle & {
  kind: "roundup";
  products: ProductCard[];
  tableRows: string[][];
  buyingAdvice: string[];
  cta: AffiliateCTA;
};

export type GuideArticle = BaseArticle & {
  kind: "guide";
  factors: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  sections: Array<{
    title: string;
    text: string;
  }>;
  specRows: SpecRow[];
};

export type ComparisonArticle = BaseArticle & {
  kind: "comparison";
  tableRows: string[][];
  winners: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  sections: Array<{
    title: string;
    text: string;
  }>;
};
