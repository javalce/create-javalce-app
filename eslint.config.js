import { defineConfig } from '@javalce/eslint-config';

export default defineConfig({
  type: 'lib',
  overrides: [
    {
      ignores: ['templates'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
