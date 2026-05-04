export const articles = [
  {
    title: "Osprey Talon 22 Review: Still the Benchmark Daypack?",
    slug: "/reviews/osprey-talon-22-review",
    category: "Hiking",
    categorySlug: "hiking",
    type: "Research Review",
    date: "Updated May 4, 2026",
    readTime: "9 min read",
    excerpt:
      "A specification-led review of Osprey's fast-moving 22-liter daypack, focused on fit, carry comfort, organization, and mountain utility.",
  },
  {
    title: "Best Ultralight Hiking Backpacks for Fast Mountain Days",
    slug: "/best/best-ultralight-hiking-backpacks",
    category: "Hiking",
    categorySlug: "hiking",
    type: "Buying Guide",
    date: "Updated May 4, 2026",
    readTime: "12 min read",
    excerpt:
      "Ranked picks for fast hikes, summit pushes, and lightweight day missions, with a comparison table and practical buying advice.",
  },
  {
    title: "How to Choose a Daypack for Hiking",
    slug: "/guides/how-to-choose-a-daypack",
    category: "Hiking",
    categorySlug: "hiking",
    type: "Buying Guide",
    date: "Updated May 4, 2026",
    readTime: "8 min read",
    excerpt:
      "A clear framework for choosing capacity, suspension, fit, materials, weather resistance, and pockets without overbuying.",
  },
  {
    title: "Osprey Talon 22 vs Deuter Speed Lite: Which Daypack Is Better?",
    slug: "/compare/osprey-talon-22-vs-deuter-speed-lite",
    category: "Hiking",
    categorySlug: "hiking",
    type: "Comparison",
    date: "Updated May 4, 2026",
    readTime: "10 min read",
    excerpt:
      "A head-to-head spec analysis for hikers choosing between a more structured daypack and a lighter fast-hiking design.",
  },
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
  (article) => article.slug !== "/reviews/osprey-talon-22-review"
);
