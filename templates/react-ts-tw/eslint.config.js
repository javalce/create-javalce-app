import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  typescript: ['tsconfig.node.json', 'tsconfig.app.json'],
  react: true,
});
