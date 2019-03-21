// http://eslint.org/docs/user-guide/configuring 


var state = process.env.NODE_ENV === 'production' ? 2 : 0;
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  env: {
    'browser': true
  },
  globals: {
    '$': 1
  },
  rules: {
    'one-var': 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': state,
    'no-console': 0,
    'semi': [2, 'always'],
    'no-extra-semi': 2,
    'space-before-function-paren': 0,
    'eqeqeq': 0,
    'spaced-comment': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'new-cap': 0,
    'camelcase': 0,
    'no-new': 0
  }
}
