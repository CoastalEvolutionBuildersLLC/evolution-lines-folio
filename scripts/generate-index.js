#!/usr/bin/env node
// generate-index.js (ES module)
// Generates index.html for GitHub Pages deployment with correct base path.
import { readdirSync, writeFileSync } from 'fs';
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

const files = readdirSync(assetsDir);

// Find the main JS entry (the entry point, not chunk files)
const jsFiles = files.filter(f => f.endsWith('.js'));
const mainJs = jsFiles.find(f => !f.includes('chunk')) || jsFiles[0];

// Find the CSS file
const cssFile = files.find(f => f.endsWith('.css'));

const cssTag = cssFile
  ? `<link rel="stylesheet" crossorigin href="${BASE}/assets/${cssFile}">`
  : '';

// TanStack Start's startClient() mounts to document directly (not a #root div)
// So we provide a minimal HTML shell with just the script tag
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coastal Evolution Builders</title>
    ${cssTag}
    <script type="module" crossorigin src="${BASE}/assets/${mainJs}"></script>
  </head>
  <body>
  </body>
</html>`;

writeFileSync(join(srcDir, 'index.html'), html);
console.log(`index.html written. JS: ${mainJs}, Base: ${BASE}`);
