import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const blogDirectory = path.resolve(process.cwd(), 'src/content/blog');
const articleFiles = fs
  .readdirSync(blogDirectory)
  .filter((name) => /\.mdx?$/.test(name))
  .sort((a, b) => a.localeCompare(b, 'ja'));

const failures = [];

function resolveArticleAsset(articlePath, assetPath) {
  return path.resolve(path.dirname(articlePath), assetPath.replace(/^<|>$/g, ''));
}

for (const filename of articleFiles) {
  const articlePath = path.join(blogDirectory, filename);
  const source = fs.readFileSync(articlePath, 'utf8');
  const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    failures.push(`${filename}: frontmatterを読み取れない`);
    continue;
  }

  const frontmatter = frontmatterMatch[1];
  const heroMatch = frontmatter.match(/^heroImage:\s*['"]?([^'"\r\n]+)['"]?\s*$/m);

  if (!heroMatch) {
    failures.push(`${filename}: heroImageがない`);
  } else {
    const heroPath = heroMatch[1].trim();
    if (/^https?:\/\//i.test(heroPath)) {
      failures.push(`${filename}: heroImageが外部URLになっている`);
    } else if (!fs.existsSync(resolveArticleAsset(articlePath, heroPath))) {
      failures.push(`${filename}: heroImageが存在しない (${heroPath})`);
    }
  }

  const body = source.slice(frontmatterMatch[0].length);
  const markdownImages = [...body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((match) =>
    match[1].trim().split(/\s+/)[0].replace(/^<|>$/g, ''),
  );
  const htmlImages = [...body.matchAll(/<img\b[^>]*\bsrc=['"]([^'"]+)['"][^>]*>/gi)].map(
    (match) => match[1].trim(),
  );
  const bodyImages = [...markdownImages, ...htmlImages];
  const externalBodyImages = bodyImages.filter((image) => /^https?:\/\//i.test(image));
  const localBodyImages = bodyImages.filter((image) => !/^https?:\/\//i.test(image));

  if (externalBodyImages.length > 0) {
    failures.push(`${filename}: 本文に外部直リンク画像がある`);
  }

  if (localBodyImages.length < 2) {
    failures.push(`${filename}: 本文画像が${localBodyImages.length}枚（最低2枚必要）`);
  }

  for (const imagePath of localBodyImages) {
    if (!fs.existsSync(resolveArticleAsset(articlePath, imagePath))) {
      failures.push(`${filename}: 本文画像が存在しない (${imagePath})`);
    }
  }

  console.log(`${filename}: hero 1枚 / 本文 ${localBodyImages.length}枚`);
}

if (failures.length > 0) {
  console.error('\n記事画像チェックに失敗した。');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`\n${articleFiles.length}記事の画像チェックに成功した。`);
