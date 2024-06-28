const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.eslint.json');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // General rules
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    // TypeScript rules
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    // Import rules
    'import/no-default-export': 'off',
    'import/order': [
      'warn',
      {
        groups: ['type', 'builtin', 'object', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    // Unicorn rules
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['App.tsx'],
      },
    ],
  },
};
