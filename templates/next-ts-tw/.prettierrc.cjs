const prettierConfig = require('@javalce/prettier-config');

/** @type {import('prettier').Config} */
module.exports = {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, 'prettier-plugin-tailwindcss'],
};
