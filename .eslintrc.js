module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 300 }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    'no-undef': 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'no-nested-ternary': 'off',
  },
};
