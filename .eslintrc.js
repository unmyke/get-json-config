module.exports = {
  root: true,
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'es5', arrowParens: 'always' },
    ],
  },
};
