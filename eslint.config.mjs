import next from 'eslint-config-next';
import tseslint from 'typescript-eslint';

const config = [
  ...next,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react/no-unescaped-entities': 'off',
      // Intentional, SSR-safe patterns are used (media-query + theme
      // initialisation and IntersectionObserver fallbacks) that require
      // syncing state from an effect after hydration.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
