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
    '@nuxtjs',
    // https://eslint.vuejs.org/rules/
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 'off'
  }
}
