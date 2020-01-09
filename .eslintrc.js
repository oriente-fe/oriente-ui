module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'prettier/standard',
    'prettier/vue',
    'plugin:vue/essential'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  }
}
