#!/usr/bin/env node
// generate-index.js
// Generates index.html and prepares dist/public for Netlify SPA deployment
// Works whether vite build outputs to dist/ or dist/client/

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

// TanStack Start outputs to dist/client; plain Vite outputs to dist
let srcDir = path.join(root, 'dist', 'client');
if (!fs.existsSync(path.join(srcDir, 'assets'))) {
  srcDir = path.join(root, 'dist');
}

const assetsDir = path.join(srcDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('ERROR: Could not find assets in dist/client/assets or dist/assets.');
  console.error('Did the build succeed?');
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);

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

// Write index.html directly into the detected dist dir (which is the publish dir)
fs.writeFileSync(path.join(srcDir, 'index.html'), html);
console.log(`index.html written to: ${srcDir}`);
console.log(`  JS:  ${mainJs}`);
console.log(`  CSS: ${cssFile || 'none'}`);
console.log(`  Publish directory to use in netlify.toml: ${path.relative(root, srcDir)}`);
