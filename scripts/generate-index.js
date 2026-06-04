#!/usr/bin/env node
// generate-index.js (ES module)
// Generates or copies index.html for Netlify SPA deployment.
// Priority:
//   1. Use prerendered index.html from Nitro (dist/public/index.html)
//   2. Fallback to generating a shell index.html from dist/client/assets

import { existsSync, readdirSync, writeFileSync, copyFileSync, readFileSync } from 'fs';
import { join, resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = resolve(__dirname, '..');

// Check if Nitro prerendered an index.html (dist/public/index.html)
const prerenderHtml = join(root, 'dist', 'public', 'index.html');
if (existsSync(prerenderHtml)) {
  // Copy prerendered HTML to dist/client/ for Netlify to serve
  const destDir = join(root, 'dist', 'client');
  copyFileSync(prerenderHtml, join(destDir, 'index.html'));
  console.log('Used prerendered index.html from dist/public/index.html');
  process.exit(0);
}

// TanStack Start outputs to dist/client; plain Vite outputs to dist
let srcDir = join(root, 'dist', 'client');
if (!existsSync(join(srcDir, 'assets'))) {
  srcDir = join(root, 'dist');
}

const assetsDir = join(srcDir, 'assets');

if (!existsSync(assetsDir)) {
  console.error('ERROR: Could not find prerendered HTML or assets directory.');
  console.error('  Checked:', prerenderHtml);
  console.error('  Checked:', assetsDir);
  console.error('Did the build succeed?');
  process.exit(1);
}

const files = readdirSync(assetsDir);

// Find the main JS entry (one not named "chunk", fallback to first)
const jsFiles = files.filter(f => f.endsWith('.js'));
const mainJs = jsFiles.find(f => !f.includes('chunk')) || jsFiles[0];

// Find the CSS file
const cssFile = files.find(f => f.endsWith('.css'));

if (!mainJs) {
  console.error('ERROR: No JS file found in assets directory:', assetsDir);
  process.exit(1);
}

const cssTag = cssFile
  ? `<link rel="stylesheet" crossorigin href="/assets/${cssFile}">`
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
    <script type="module" crossorigin src="/assets/${mainJs}"></script>
  </body>
</html>`;

writeFileSync(join(srcDir, 'index.html'), html);
console.log(`Shell index.html written to: ${srcDir}`);
console.log(`  JS:  ${mainJs}`);
console.log(`  CSS: ${cssFile || 'none'}`);
