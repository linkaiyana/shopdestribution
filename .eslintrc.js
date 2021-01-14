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
  },
};
