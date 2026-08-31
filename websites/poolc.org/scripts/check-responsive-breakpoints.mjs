import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
const sourceExtensions = new Set(['.css', '.js', '.jsx', '.ts', '.tsx']);
const allowedBreakpoints = {
  'max-width': new Set([767, 1199]),
  'min-width': new Set([768, 1200]),
};

async function getSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) return getSourceFiles(filePath);
    return sourceExtensions.has(entry.name.slice(entry.name.lastIndexOf('.'))) ? [filePath] : [];
  }));

  return files.flat();
}

const files = await getSourceFiles(sourceRoot);
const violations = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const matches = source.matchAll(/@media\s*\(\s*(max-width|min-width)\s*:\s*(\d+)px\s*\)/g);

  for (const match of matches) {
    const [, direction, value] = match;
    if (!allowedBreakpoints[direction].has(Number(value))) {
      const line = source.slice(0, match.index).split('\n').length;
      violations.push(`${file.replace(sourceRoot, 'src')}:${line} uses ${direction}: ${value}px`);
    }
  }
}

if (violations.length > 0) {
  console.error('Responsive breakpoints must use the shared compact/wide contract:');
  console.error(violations.join('\n'));
  process.exit(1);
}

console.log('Responsive breakpoint contract is valid.');
