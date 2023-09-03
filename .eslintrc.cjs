/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@tanstack/query'],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    'vue/block-lang': [
      'error',
      {
        style: {
          lang: 'scss',
        },
      },
    ],
    'vue/padding-line-between-blocks': ['error', 'always'],
  },
}
