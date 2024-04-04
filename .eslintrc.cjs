module.exports = {
  root: true,
    env: { browser: true, es2020: true, node: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:@react-three/all",
    "plugin:import/recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "react/no-unknown-property": ["error", { "ignore": ["object"] }],
    'react/jsx-no-target-blank': 'off',
  'react/prop-types': 'off', 
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
