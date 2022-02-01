const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'global-require': RULES.OFF,
    'no-console': RULES.OFF,
  },
};
