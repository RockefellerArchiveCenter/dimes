import js from '@eslint/js' // ESLint pinned to 9 because eslint-plugin-react is not yet compatible with ESLint 10
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  { ignores: ['build/**', 'backstop_data/**', 'src/locales/**'] },
  js.configs.recommended,
  {
    files: ['lingui.config.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  {
    files: ['vite.config.mjs', 'eslint.config.mjs'],
    languageOptions: { sourceType: 'module', globals: globals.node },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.vitest },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Not applicable here since we don't us prop-types, and we don't need to import React in scope for JSX
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // Severities matched to the create-react-app config this replaced
      'no-undef': 'error',
      'array-callback-return': 'warn',
      'no-unused-vars': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',

      // Rules CRA never ran. Warn now so pre-existing findings stay visible
      // but don't block until triaged.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-import-assign': 'warn',
      'react/no-children-prop': 'warn',
      'react/display-name': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/jsx-key': 'warn',
    },
  },
]
