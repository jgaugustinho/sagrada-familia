// @ts-check
import { defineConfig } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import sharedRules from '../../eslint.shared.mjs';

export default defineConfig(
  { ignores: [ 'dist/**' ] },
  ...tseslint.configs.recommended,
  ...pluginVue.configs[ 'flat/recommended' ],
  {
    files: [ '**/*.vue' ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    plugins: {
      '@stylistic': stylistic
    }
  },
  ...sharedRules
);
