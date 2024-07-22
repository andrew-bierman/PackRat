// .eslintrc.js
module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs,jsx,ts,tsx}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: [
    '.eslintrc.js',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/types/**',
    '**/public/**',
    'babel.config.js',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    eqeqeq: 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-unreachable': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'import/no-duplicates': 'off',
    'multiline-ternary': 'off',
    'no-dupe-keys': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'array-callback-return': 'off',
    '@typescript-eslint/array-callback-return': 'off',
    'no-empty': 'off',
    'operator-linebreak': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/return-await': 'off',
  },
};
