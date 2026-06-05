#!/usr/bin/env node
// generate-index.js (ES module)
// Generates index.html for GitHub Pages deployment with correct base path.
import { existsSync, readdirSync, writeFileSync, copyFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

// GitHub Pages base path
const BASE = '/evolution-lines-folio';

// TanStack Start with netlify preset outputs client assets to dist/client
const srcDir = join(root, 'dist', 'client');
const assetsDir = join(srcDir, 'assets');

if (!existsSync(assetsDir)) {
  console.error('ERROR: Could not find assets directory at', assetsDir);
  console.error('Did the build succeed?');
  process.exit(1);
}

const files = readdirSync(assetsDir);

// Find the main JS entry
const jsFiles = files.filter(f => f.endsWith('.js'));
const mainJs = jsFiles.find(f => !f.includes('chunk')) || jsFiles[0];

// Find the CSS file
const cssFile = files.find(f => f.endsWith('.css'));

if (!mainJs) {
  console.error('ERROR: No JS file found in assets directory:', assetsDir);
  process.exit(1);
}

const cssTag = cssFile
  ? `<link rel="stylesheet" crossorigin href="${BASE}/assets/${cssFile}">`
  : '';

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coastal Evolution Builders</title>
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="${BASE}/assets/${mainJs}"></script>
  </body>
</html>`;

writeFileSync(join(srcDir, 'index.html'), html);
console.log(`index.html written to: ${srcDir}`);
console.log(` JS: ${mainJs}`);
console.log(` CSS: ${cssFile || 'none'}`);
console.log(` Base path: ${BASE}`);
