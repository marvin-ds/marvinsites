/**
 * Netlify ignore-build script.
 *
 * Convention (Netlify docs):
 *   exit 0  → cancel (skip) this build
 *   exit 1  → proceed with build
 *
 * Fail-safe principle: when in doubt, BUILD.
 *
 * Directories whose changes alone do NOT affect the Netlify site:
 *   - docs/
 *   - supabase/
 *   - apps/
 *
 * Any file outside these (src/, public/, package.json, netlify.toml, etc.)
 * will always trigger a build.
 */

import { execSync } from 'child_process';

const SKIP_ONLY_DIRS = ['docs/', 'supabase/', 'apps/'];

function getChangedFiles(from, to) {
  const output = execSync(`git diff --name-only ${from} ${to}`, {
    encoding: 'utf8',
  }).trim();
  if (!output) return [];
  return output.split('\n').map((f) => f.trim()).filter(Boolean);
}

function shouldSkip(files) {
  if (files.length === 0) {
    // No changed files detected — build anyway to be safe
    return false;
  }
  return files.every((file) =>
    SKIP_ONLY_DIRS.some((dir) => file.startsWith(dir))
  );
}

const prev = process.env.CACHED_COMMIT_REF;
const curr = process.env.COMMIT_REF;

if (!prev || !curr) {
  console.log('[ignore-build] Cannot determine commit range — proceeding with build.');
  process.exit(1);
}

if (prev === curr) {
  console.log('[ignore-build] Same commit — proceeding with build.');
  process.exit(1);
}

try {
  const files = getChangedFiles(prev, curr);
  console.log(`[ignore-build] Changed files (${files.length}):`);
  files.forEach((f) => console.log(`  ${f}`));

  if (shouldSkip(files)) {
    console.log('[ignore-build] All changes in docs/, supabase/, or apps/ — skipping Netlify build.');
    process.exit(0);
  } else {
    console.log('[ignore-build] Site-relevant change detected — proceeding with build.');
    process.exit(1);
  }
} catch (err) {
  console.error('[ignore-build] Error determining changed files:', err.message);
  console.log('[ignore-build] Fail-safe: proceeding with build.');
  process.exit(1);
}
