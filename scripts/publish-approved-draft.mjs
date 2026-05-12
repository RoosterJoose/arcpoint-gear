import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const inboxDir = path.resolve('src/content-inbox');
const publishedDir = path.resolve('src/data/published');
const typeMap = {
  review: 'reviews',
  roundup: 'roundups',
  guide: 'guides',
  comparison: 'comparisons',
};

const entries = await readdir(inboxDir, { withFileTypes: true });
const jsonFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
  .map((entry) => path.join(inboxDir, entry.name))
  .sort();

if (jsonFiles.length === 0) {
  console.log('No JSON files found in src/content-inbox.');
  process.exit(0);
}

let promoted = 0;

for (const file of jsonFiles) {
  const raw = await readFile(file, 'utf8');
  const article = JSON.parse(raw);

  const folder = typeMap[article.articleType];
  if (!folder) {
    console.log(`Skip ${path.basename(file)}: unsupported articleType "${article.articleType}"`);
    continue;
  }

  if (article.status !== 'published') {
    console.log(`Skip ${path.basename(file)}: status is not "published"`);
    continue;
  }

  if (!article.complianceNotes?.approvedForPublication || article.complianceNotes?.requiresHumanReview !== false) {
    console.log(`Skip ${path.basename(file)}: compliance flags do not allow auto-publish`);
    continue;
  }

  const destinationDir = path.join(publishedDir, folder);
  const destinationFile = path.join(destinationDir, `${article.slug}.json`);
  await mkdir(destinationDir, { recursive: true });
  await writeFile(destinationFile, `${JSON.stringify(article, null, 2)}\n`);
  console.log(`Published ${path.relative(process.cwd(), destinationFile)}`);
  promoted += 1;
}

console.log(`Promoted ${promoted} approved article(s).`);
