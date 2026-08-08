import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const assets = [
  {
    destination: 'src/assets/images/ball-x-pit/header.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2062430/5e7885a3802fe7d38b92fdeb44888b4828a842ba/header_alt_assets_2.jpg?t=1786035856',
    force: true,
  },
  {
    destination: 'src/assets/images/ball-x-pit/gameplay.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2062430/9ec0c5e5675c79ae2ff721f4ba2aa7844107588e/ss_9ec0c5e5675c79ae2ff721f4ba2aa7844107588e.1920x1080.jpg?t=1786035856',
    force: true,
  },
  {
    destination: 'src/assets/images/ball-x-pit/naturalist-update.jpg',
    url: 'https://i.ytimg.com/vi/1J8s-2ZR0T4/maxresdefault.jpg',
    force: true,
  },
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
    destination: 'src/assets/images/wanderburg/screenshot-1.jpg',
    url: 'https://cdn.mos.cms.futurecdn.net/yciqmHmPQaY2kyoMecwNTG.jpg',
  },
  {
    destination: 'src/assets/images/wanderburg/screenshot-2.jpg',
    url: 'https://cdn.mos.cms.futurecdn.net/GxL8XzQjt8JACWSnJG6qXG.jpg',
  },
  {
    destination: 'src/assets/images/moonlighter/header.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/606150/b6b0789b397ed98c8c5871dd2f99945a8fea0332/header.jpg?t=1782880501',
  },
  {
    destination: 'src/assets/images/moonlighter/screenshot-1.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/606150/ss_12301c80d516d688eb1d18e214df8459679e8e60.1920x1080.jpg?t=1782880501',
  },
  {
    destination: 'src/assets/images/moonlighter/screenshot-2.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/606150/ss_1ea2e271edeed3d9a78687316f1464050776984d.1920x1080.jpg?t=1782880501',
  },
  {
    destination: 'src/assets/images/moonlighter/screenshot-3.jpg',
    url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/606150/ss_3a7c6a55fd94bee28c2cf1fa5e13e51de17b75ac.1920x1080.jpg?t=1782880501',
  },
  {
    destination: 'src/assets/images/demon-lord-just-a-block/hero.jpg',
    url: 'https://gaming-cdn.com/images/products/21695/screenshot/demon-lord-just-a-block-pc-steam-wallpaper-3.jpg?v=1770130142',
  },
  {
    destination: 'src/assets/images/demon-lord-just-a-block/screenshot-1.jpg',
    url: 'https://shared.cdn.queniuqe.com/store_item_assets/steam/apps/3720420/a88e38c1a7ee957e4e1bbaf566d2e22f6b8d06fa/ss_a88e38c1a7ee957e4e1bbaf566d2e22f6b8d06fa.1920x1080.jpg?t=1777690212',
  },
  {
    destination: 'src/assets/images/demon-lord-just-a-block/screenshot-2.jpg',
    url: 'https://shared.cdn.queniuqe.com/store_item_assets/steam/apps/3720420/18e228eec558d52cf2a8b38c2ad023ee33de70b0/ss_18e228eec558d52cf2a8b38c2ad023ee33de70b0.1920x1080.jpg?t=1777690212',
  },
  {
    destination: 'src/assets/images/echoes-of-mystralia/hero.jpg',
    url: 'https://echoesofmystralia.com/wp-content/uploads/2026/02/Echoes_of_Mystralia_keyart_16x9_demo_EN.jpg',
  },
  {
    destination: 'src/assets/images/echoes-of-mystralia/screenshot-1.jpg',
    url: 'https://echoesofmystralia.com/wp-content/uploads/2026/02/Echoes_of_Mystralia_screenshots_combat_spell_01.jpg',
  },
  {
    destination: 'src/assets/images/echoes-of-mystralia/screenshot-2.jpg',
    url: 'https://echoesofmystralia.com/wp-content/uploads/2026/02/Echoes_of_Mystralia_screenshots_memory.jpg',
  },
  {
    destination: 'src/assets/images/echoes-of-mystralia/screenshot-3.jpg',
    url: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/974480/ss_20e52ea24e51ee6a6d7574a5f482645c7e393d2d.1920x1080.jpg?t=1741082452',
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

async function download({ destination, url, force = false }) {
  const outputPath = path.resolve(root, destination);

  if (!force && await isUsableFile(outputPath)) {
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
