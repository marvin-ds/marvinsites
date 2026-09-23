import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const source = path.join(root, 'exemplos');
const target = path.join(root, 'dist', 'exemplos');
const whatsappNumber = process.env.PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '';
const whatsappWaNumber = whatsappNumber.startsWith('55') ? whatsappNumber : `55${whatsappNumber}`;

if (!existsSync(source)) {
  console.log('[portfolio] exemplos/ not found; skipping portfolio copy.');
  process.exit(0);
}

await mkdir(path.dirname(target), { recursive: true });
await cp(source, target, { recursive: true, force: true });

async function replacePlaceholders(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await replacePlaceholders(fullPath);
      continue;
    }

    if (!entry.name.endsWith('.html')) continue;

    const contents = await readFile(fullPath, 'utf8');
    if (!contents.includes('[WHATSAPP_MARVIN]')) continue;

    if (!whatsappNumber) {
      throw new Error('PUBLIC_WHATSAPP_NUMBER is required to publish portfolio WhatsApp links.');
    }

    await writeFile(
      fullPath,
      contents
        .replaceAll('55[WHATSAPP_MARVIN]', whatsappWaNumber)
        .replaceAll('[WHATSAPP_MARVIN]', whatsappWaNumber),
    );
  }
}

await replacePlaceholders(target);
console.log('[portfolio] exemplos/ copied to dist/exemplos.');
