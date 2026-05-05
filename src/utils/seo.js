import { site } from "../data/site";

const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  email: site.email,
  logo: absoluteUrl("/favicon.svg"),
});

export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: site.url,
  publisher: { "@id": absoluteUrl("/#organization") },
});

export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    ...items.map((item, index) => {
      const listItem = {
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
      };

      if (item.href || item.pathname) {
        listItem.item = absoluteUrl(item.href || item.pathname);
      }

      return listItem;
    }),
  ],
});

export const buildArticleSchema = ({
  title,
  description,
  canonical,
  type = "Article",
  datePublished = "2026-05-04",
  dateModified = "2026-05-04",
  section,
  keywords = [],
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  headline: title,
  description,
  url: absoluteUrl(canonical),
  mainEntityOfPage: absoluteUrl(canonical),
  datePublished,
  dateModified,
  articleSection: section,
  keywords: keywords.join(", "),
  author: {
    "@type": "Organization",
    name: `${site.name} Editorial`,
    url: site.url,
  },
  publisher: { "@id": absoluteUrl("/#organization") },
});

export const buildFAQSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const buildReviewSchema = ({ product, canonical, title, reviewBody }) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  name: title,
  url: absoluteUrl(canonical),
  reviewBody,
  author: {
    "@type": "Organization",
    name: `${site.name} Editorial`,
  },
  publisher: { "@id": absoluteUrl("/#organization") },
  itemReviewed: {
    "@type": "Product",
    name: product.name,
    category: product.category,
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: product.score,
    bestRating: "10",
    worstRating: "1",
  },
  positiveNotes: {
    "@type": "ItemList",
    itemListElement: product.pros.map((note, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: note,
    })),
  },
  negativeNotes: {
    "@type": "ItemList",
    itemListElement: product.cons.map((note, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: note,
    })),
  },
});

export const buildItemListSchema = ({ name, canonical, items }) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  url: absoluteUrl(canonical),
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name || item.title,
    description: item.notes || item.excerpt || item.bestFor,
  })),
});

export const serializeJsonLd = (schemas = []) =>
  JSON.stringify(schemas.filter(Boolean), null, 2).replace(/</g, "\\u003c");
