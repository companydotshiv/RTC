import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, 'dist');
const rootDir = path.resolve(__dirname, '..');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run vite build first.');
  process.exit(1);
}

// Copy everything from dist to repository root so cPanel git pull serves it directly
fs.cpSync(distDir, rootDir, { recursive: true, force: true });
console.log('✅ Successfully synced production build to repository root.');
