module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-param-reassign": 0,
    "indent": ["error", 4],
    "no-tabs": 0,
    "no-restricted-syntax": ["error"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "implicit-arrow-linebreak": 0,
    "linebreak-style": ["error", "windows"],
    "consistent-return": 0,
    "no-unused-vars": [
    "error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
  ],
  "eol-last": ["error", "always"]
  },
};
