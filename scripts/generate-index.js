#!/usr/bin/env node
// generate-index.js (ES module)
// Generates index.html for GitHub Pages deployment with correct base path.
import { existsSync, readdirSync, writeFileSync, readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

// GitHub Pages base path
const BASE = '/evolution-lines-folio';

// Check if Nitro prerendered an index.html (dist/public/index.html)
const prerenderHtml = join(root, 'dist', 'public', 'index.html');
if (existsSync(prerenderHtml)) {
  // Read the prerendered HTML and fix asset paths for GitHub Pages subdirectory
  let html = readFileSync(prerenderHtml, 'utf8');
  // Fix absolute asset paths: src="/assets/ -> src="/evolution-lines-folio/assets/
  html = html.replace(/src="\/assets\//g, `src="${BASE}/assets/`);
  html = html.replace(/href="\/assets\//g, `href="${BASE}/assets/`);
  html = html.replace(/from "\/assets\//g, `from "${BASE}/assets/`);
  const destDir = join(root, 'dist', 'client');
  writeFileSync(join(destDir, 'index.html'), html);
  console.log('Used prerendered index.html from dist/public/index.html (paths fixed for GitHub Pages)');
  process.exit(0);
}

// Fallback: generate shell index.html from dist/client/assets
const srcDir = join(root, 'dist', 'client');
const assetsDir = join(srcDir, 'assets');

if (!existsSync(assetsDir)) {
  console.error('ERROR: Could not find assets directory at', assetsDir);
  process.exit(1);
}

const files = readdirSync(assetsDir);
const jsFiles = files.filter(f => f.endsWith('.js'));
const mainJs = jsFiles.find(f => !f.includes('chunk')) || jsFiles[0];
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
console.log(`Shell index.html written. JS: ${mainJs}, Base: ${BASE}`);
