module.exports = {
  extends: [
    '../../.eslintrc.js',
    'next',
  ],
  rules: {
    'func-names': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "react/display-name": "off",
    'unused-imports/no-unused-imports-ts': 'error',
    "react/jsx-curly-brace-presence": "error",
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: '*.spec.ts',
};
