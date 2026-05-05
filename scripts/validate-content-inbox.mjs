import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const inboxDir = path.resolve("src/content-inbox");
const articleTypesRequiringProducts = new Set(["review", "roundup", "comparison"]);
const exactPriceKeys = new Set([
  "amazonprice",
  "currentprice",
  "exactprice",
  "listprice",
  "price",
  "retailprice",
  "saleprice",
]);

const errors = [];
const warnings = [];

const addIssue = (collection, file, message) => {
  collection.push(`${path.relative(process.cwd(), file)}: ${message}`);
};

const hasAffiliateDisclosure = (article) =>
  typeof article.disclosure === "string" && article.disclosure.trim().length > 0;

const hasExactPriceSignal = (value, trail = []) => {
  if (Array.isArray(value)) {
    return value.some((item, index) => hasExactPriceSignal(item, [...trail, String(index)]));
  }

  if (!value || typeof value !== "object") {
    if (typeof value !== "string") {
      return false;
    }

    const key = trail.at(-1)?.toLowerCase() ?? "";
    return key !== "pricetier" && /\$\s?\d/.test(value);
  }

  return Object.entries(value).some(([key, nestedValue]) => {
    const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, "");

    if (normalizedKey !== "pricetier" && exactPriceKeys.has(normalizedKey)) {
      return true;
    }

    return hasExactPriceSignal(nestedValue, [...trail, key]);
  });
};

const validateArticle = (file, article) => {
  const requiredFields = ["articleType", "title", "slug", "status"];

  for (const field of requiredFields) {
    if (!article[field]) {
      addIssue(errors, file, `missing required field "${field}"`);
    }
  }

  if (!article.complianceNotes || typeof article.complianceNotes !== "object") {
    addIssue(errors, file, 'missing required object "complianceNotes"');
  } else {
    if (typeof article.complianceNotes.requiresHumanReview !== "boolean") {
      addIssue(errors, file, 'missing boolean "complianceNotes.requiresHumanReview"');
    }

    if (typeof article.complianceNotes.approvedForPublication !== "boolean") {
      addIssue(errors, file, 'missing boolean "complianceNotes.approvedForPublication"');
    }
  }

  if (articleTypesRequiringProducts.has(article.articleType) && !Array.isArray(article.products)) {
    addIssue(errors, file, `"products" array is required for articleType "${article.articleType}"`);
  }

  if (!hasAffiliateDisclosure(article)) {
    addIssue(errors, file, "missing affiliate disclosure");
  }

  if (hasExactPriceSignal(article)) {
    addIssue(errors, file, "contains an obvious exact price field or value");
  }

  if (article.status === "published") {
    addIssue(warnings, file, 'inbox content should normally keep "status": "draft"');
  }
};

const entries = await readdir(inboxDir, { withFileTypes: true });
const jsonFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
  .map((entry) => path.join(inboxDir, entry.name))
  .sort();

if (jsonFiles.length === 0) {
  console.log("No JSON files found in src/content-inbox.");
  process.exit(0);
}

for (const file of jsonFiles) {
  let article;

  try {
    article = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    addIssue(errors, file, `invalid JSON (${error.message})`);
    continue;
  }

  validateArticle(file, article);
}

console.log(`Validated ${jsonFiles.length} content-inbox JSON file(s).`);

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

console.log("Content inbox validation passed.");
