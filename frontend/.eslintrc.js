module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-no-constructed-context-values': ['warn'],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
