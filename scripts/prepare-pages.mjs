import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [sourceRoot, outputRoot, requestedBase = '/fuchen-afterlight-website/'] = process.argv.slice(2);
if (!sourceRoot || !outputRoot) throw new Error('Usage: node scripts/prepare-pages.mjs <backup-root> <output-dir> [base-path]');
const source = path.resolve(sourceRoot);
const output = path.resolve(outputRoot);
const publicRoot = path.join(source, 'public');
const basePath = `/${requestedBase.split('/').filter(Boolean).join('/')}/`.replace('//', '/');
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(basePath)) throw new Error('Invalid base path');
if (fs.existsSync(output)) throw new Error(`Output already exists: ${output}`);

const manifest = JSON.parse(fs.readFileSync(path.join(source, 'FILE-MANIFEST.json'), 'utf8'));
let verified = 0;
for (const [relativePath, expected] of Object.entries(manifest)) {
  if (!relativePath.startsWith('public/')) continue;
  const file = fs.readFileSync(path.join(source, relativePath));
  const actualHash = crypto.createHash('sha256').update(file).digest('hex');
  if (file.length !== expected.bytes || actualHash !== expected.sha256) {
    throw new Error(`Backup checksum mismatch: ${relativePath}`);
  }
  verified++;
}
fs.cpSync(publicRoot, output, {recursive: true});
function filesBelow(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(filename) : [filename];
  });
}
const pages = filesBelow(output).filter(filename => filename.endsWith('.html'));
let references = 0;
for (const filename of pages) {
  let html = fs.readFileSync(filename, 'utf8');
  // Rebase the generated HTML without changing the archived source or runtime.
  html = html.replace(/\b(href|src)="\/(?!\/)/g, (_, attribute) => `${attribute}="${basePath}`);
  html = html.replace(/"logo":"\/(?!\/)/g, `"logo":"${basePath}`);
  fs.writeFileSync(filename, html);
  for (const match of html.matchAll(/\b(?:href|src)="([^"\s]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (!raw.startsWith('/')) continue;
    if (!raw.startsWith(basePath)) throw new Error(`Unrebased URL in ${filename}: ${raw}`);
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0].slice(basePath.length));
    const target = path.resolve(output, pathname);
    if (target !== output && !target.startsWith(`${output}${path.sep}`)) throw new Error(`Path escapes site: ${raw}`);
    if (!fs.existsSync(target)) throw new Error(`Missing local resource in ${filename}: ${raw}`);
    references++;
  }
}
if (pages.length !== 18 || !fs.existsSync(path.join(output, 'index.html'))) {
  throw new Error(`Expected 18 pages, got ${pages.length}`);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Verified ${verified} archived public files; prepared ${pages.length} pages and checked ${references} local references at ${basePath}`);
