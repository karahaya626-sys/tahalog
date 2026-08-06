import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const assets = [
  {
    destination: 'src/assets/images/vena/header.jpg',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/846a303db5b2fcc00f354cb79258a4ae4842cd0a/header.jpg?t=1780866011',
  },
  {
    destination: 'src/assets/images/vena/screenshot-1.avif',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/extras/e7f6992bc8e8e5d64c1abf65b8e1bef9.avif?t=1780866011',
  },
  {
    destination: 'src/assets/images/vena/screenshot-2.avif',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4165740/extras/23336b2169b9cc03dc38b6e896ef66b2.avif?t=1780866011',
  },
  {
    destination: 'src/assets/images/wanderburg/screenshot-1.avif',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3624140/extras/9ee8a002038fb47b68c47a6168182349.avif?t=1776354662',
  },
  {
    destination: 'src/assets/images/wanderburg/screenshot-2.avif',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3624140/extras/e26fc58ea12a3dadbc4fb82bb2545f82.avif?t=1776354662',
  },
];

const root = process.cwd();

async function isUsableFile(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile() && stats.size > 1_000;
  } catch {
    return false;
  }
}

async function download({ destination, url }) {
  const outputPath = path.resolve(root, destination);

  if (await isUsableFile(outputPath)) {
    console.log(`skip: ${destination}`);
    return;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; taha.log image fetcher)',
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Unexpected content type for ${url}: ${contentType || 'unknown'}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length <= 1_000) {
    throw new Error(`Downloaded image is too small: ${destination} (${bytes.length} bytes)`);
  }

  const temporaryPath = `${outputPath}.tmp`;
  await fs.writeFile(temporaryPath, bytes);
  await fs.rename(temporaryPath, outputPath);
  console.log(`downloaded: ${destination} (${bytes.length} bytes)`);
}

for (const asset of assets) {
  await download(asset);
}
