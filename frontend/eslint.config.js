import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // ESLintの対象外
  globalIgnores(['dist', 'node_modules']),

  // JavaScript / TypeScript 共通の基本ルール
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    extends: [js.configs.recommended],
  },

  // React + TypeScript
  {
    files: ['src/**/*.{ts,tsx}'],

    extends: [
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,
    },
  },

  // ViteなどNode.js上で動く設定ファイル
  {
    files: ['vite.config.ts', 'eslint.config.js'],

    languageOptions: {
      globals: globals.node,
    },
  },

  // PrettierとESLintのフォーマットルールを競合させない
  prettier,
]);
