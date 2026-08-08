import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();

const sources = [
  {
    chunks: 'scripts/assets/wanderburg-png/loadout',
    output: 'src/assets/images/wanderburg-play/loadout.png',
  },
  {
    chunks: 'scripts/assets/wanderburg-png-v2/upgrade',
    output: 'src/assets/images/wanderburg-play/upgrade.png',
  },
];

for (const { chunks, output } of sources) {
  const chunksDir = path.resolve(root, chunks);
  const outputPath = path.resolve(root, output);
  const files = (await fs.readdir(chunksDir))
    .filter((name) => name.endsWith('.b64'))
    .sort();

  if (files.length === 0) {
    throw new Error(`PNG source chunks not found: ${chunks}`);
  }

  const base64 = (await Promise.all(
    files.map(async (name) => (await fs.readFile(path.join(chunksDir, name), 'utf8')).trim()),
  )).join('');

  const bytes = Buffer.from(base64, 'base64');
  if (bytes.length <= 1_000 || bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
    throw new Error(`Invalid PNG restored from: ${chunks}`);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, bytes);
  console.log(`restored: ${output} (${bytes.length} bytes)`);
}
