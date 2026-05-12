import { publishedArticles } from "./publishedArticles";

const toArticleCard = (article) => ({
  title: article.title,
  slug: article.canonical,
  category: article.category.name,
  categorySlug: article.category.slug,
  type: article.label,
  date: article.date ?? "",
  readTime: article.readTime ?? "",
  excerpt: article.excerpt ?? article.metaDescription,
});

const publishedArticleCards = publishedArticles
  .slice()
  .sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""))
  .map(toArticleCard);

export const articles = [
  ...publishedArticleCards,
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

export const getRelatedArticles = (currentSlug) =>
  articles.filter((article) => article.slug !== currentSlug);

export const relatedArticles = getRelatedArticles();
