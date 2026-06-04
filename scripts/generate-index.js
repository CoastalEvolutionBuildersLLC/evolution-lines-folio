#!/usr/bin/env node
// generate-index.js
// Generates a minimal index.html for Netlify SPA deployment
// after `vite build` or `bun run build` produces assets in dist/client/assets

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist', 'client');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('ERROR: dist/client/assets not found. Did the build succeed?');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

// Find the main JS entry (largest .js file, or one not named "chunk")
const jsFiles = files.filter(f => f.endsWith('.js'));
const mainJs = jsFiles.find(f => !f.includes('chunk')) || jsFiles[0];

// Find the CSS file
const cssFile = files.find(f => f.endsWith('.css'));

if (!mainJs) {
  console.error('ERROR: No JS file found in dist/client/assets');
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

fs.writeFileSync(path.join(distDir, 'index.html'), html);
console.log(`index.html created (JS: ${mainJs}, CSS: ${cssFile || 'none'})`);
