import { cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  outDir: 'dist',
  // Copy the templates files to the dist folder
  async onSuccess() {
    await cp(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates'),
      path.join('dist', 'templates'),
      {
        recursive: true,
        // Exclude the node_modules folder
        filter: (src) => {
          return !src.includes('node_modules');
        },
      },
    );
  },
});
