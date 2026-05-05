import {
  comparisonArticles,
  guideArticles,
  reviewArticles,
  roundupArticles,
} from "./articleContent";

const toArticleCard = (article) => ({
  title: article.title,
  slug: article.canonical,
  category: article.category,
  categorySlug: article.categorySlug,
  type: article.typeLabel,
  date: article.date,
  readTime: article.readTime,
  excerpt: article.excerpt,
});

export const articles = [
  ...Object.values(reviewArticles).map(toArticleCard),
  ...Object.values(roundupArticles).map(toArticleCard),
  ...Object.values(guideArticles).map(toArticleCard),
  ...Object.values(comparisonArticles).map(toArticleCard),
  {
    title: "Camp Lighting Systems Worth Shortlisting",
    slug: "/category/camping",
    category: "Camping",
    categorySlug: "camping",
    type: "Spec Analysis",
    date: "Coming Soon",
    readTime: "Preview",
    excerpt:
      "What matters in lanterns, headlamps, battery banks, and low-glare camp lighting for longer nights outside.",
  },
  {
    title: "Camera Packs for Alpine Travel",
    slug: "/category/photography",
    category: "Photography",
    categorySlug: "photography",
    type: "Research Queue",
    date: "Coming Soon",
    readTime: "Preview",
    excerpt:
      "A research queue for stable, weather-conscious camera carry when the approach matters as much as the shot.",
  },
];

export const latestArticles = articles.slice(0, 6);

export const relatedArticles = articles.filter(
  (article) => article.slug !== reviewArticles["osprey-talon-22-review"].canonical
);
