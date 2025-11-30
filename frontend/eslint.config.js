import javascript from '@eslint/js';
import browserGlobals from 'globals';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores as ignorePaths } from 'eslint/config';

export default defineConfig([
  // Ignore build directory
  ignorePaths(['dist']),

  {
    files: ['**/*.{js,jsx}'],

    extends: [
      javascript.configs.recommended,
      hooksPlugin.configs['recommended-latest'],
      refreshPlugin.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...browserGlobals.browser,
      },
    },

    rules: {
      // Allow ignoring certain uppercase globals
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]+' },
      ],
    },
  },
]);
