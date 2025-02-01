module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
    'shared-node-browser': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },
  ignorePatterns: ['docs/**/*'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  settings: {
    next: {
      rootDir: 'docs/',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        selector: 'variable',
        leadingUnderscore: 'allow',
      },
      { format: ['camelCase', 'PascalCase'], selector: 'function' },
      { format: ['PascalCase'], selector: 'interface' },
      { format: ['PascalCase'], selector: 'typeAlias' },
    ],

    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'private-static-field',
          'public-instance-field',
          'private-instance-field',
          'public-constructor',
          'private-constructor',
          'public-instance-method',
          'private-instance-method',
        ],
      },
    ],

    'no-implicit-coercion': 'error',
    'no-warning-comments': [
      'warn',
      {
        terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
        location: 'anywhere',
      },
    ],
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'linebreak-style': 'off',
    'global-require': 'off',

    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',

    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};
