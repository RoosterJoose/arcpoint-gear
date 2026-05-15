import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const publishedDir = path.resolve("src/data/published");
const pagesDir = path.resolve("src/pages");
const requiredAmazonTag = "alphagear0a-20";
const errors = [];
const warnings = [];

const addIssue = (collection, file, message) => {
  collection.push(`${path.relative(process.cwd(), file)}: ${message}`);
};

const getJsonFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return getJsonFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    })
  );

  return files.flat().sort();
};

const findUrls = (value, trail = []) => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findUrls(item, [...trail, String(index)]));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  return Object.entries(value).flatMap(([key, nestedValue]) => {
    const nextTrail = [...trail, key];
    if (typeof nestedValue === "string" && /url$/i.test(key)) {
      return [{ key, value: nestedValue, trail: nextTrail.join(".") }];
    }

    return findUrls(nestedValue, nextTrail);
  });
};

const routeExists = async (route) => {
  if (!route.startsWith("/")) return false;
  if (route.startsWith("/category/")) return true;

  const trimmed = route.replace(/^\/|\/$/g, "");
  const segments = trimmed.split("/");
  const dynamicRoute = path.join(
    pagesDir,
    ...segments.slice(0, -1),
    "[slug].astro"
  );
  const candidates = [
    path.join(pagesDir, `${trimmed}.astro`),
    path.join(pagesDir, trimmed, "index.astro"),
    dynamicRoute,
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Try next candidate.
    }
  }

  return false;
};

const validateAffiliateUrls = (file, article) => {
  for (const url of findUrls(article)) {
    if (!url.value.includes("amazon.com")) continue;

    if (url.key.toLowerCase() === "affiliateurl" || url.trail.endsWith(".href")) {
      if (!url.value.includes(`tag=${requiredAmazonTag}`)) {
        addIssue(errors, file, `${url.trail} must include tag=${requiredAmazonTag}`);
      }

      if (/amazon\.com\/?\?tag=/.test(url.value)) {
        addIssue(errors, file, `${url.trail} should not use a generic Amazon homepage affiliate URL`);
      }
    }
  }
};

const validateInternalRoutes = async (file, article) => {
  const internalRoutes = [
    article.canonical,
    ...(article.relatedArticles ?? []).map((link) => link.slug),
    ...(article.products ?? []).map((product) => product.reviewUrl).filter(Boolean),
    article.product?.parentRoundupUrl,
  ].filter(Boolean);

  for (const route of internalRoutes) {
    if (!(await routeExists(route))) {
      addIssue(errors, file, `internal route does not resolve to a known page: ${route}`);
    }
  }
};

const validateArticle = async (file, article) => {
  if (article.status !== "published") {
    addIssue(warnings, file, 'published content file has status other than "published"');
  }

  if (article.complianceNotes?.approvedForPublication !== true) {
    addIssue(errors, file, "approved published content must set complianceNotes.approvedForPublication true");
  }

  if (article.complianceNotes?.requiresHumanReview !== false) {
    addIssue(errors, file, "approved published content must set complianceNotes.requiresHumanReview false");
  }

  validateAffiliateUrls(file, article);
  await validateInternalRoutes(file, article);
};

const jsonFiles = await getJsonFiles(publishedDir);

for (const file of jsonFiles) {
  let article;

  try {
    article = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    addIssue(errors, file, `invalid JSON (${error.message})`);
    continue;
  }

  await validateArticle(file, article);
}

console.log(`Validated ${jsonFiles.length} published article JSON file(s).`);

if (warnings.length > 0) {
  console.log("\nWarnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error("\nValidation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Published content validation passed.");
