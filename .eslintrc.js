module.exports = {
  extends: ['airbnb-typescript/base'],

  parserOptions: {
    project: './tsconfig.json',
  },

  // We modify the linting rules from the base for some specific things
  // (listed in alphabetical order)
  rules: {
    // Prefer the "[]string" syntax over "Array<string>"
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

    // Command line programs need to use the console
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js#L27
    'no-console': ['off'],

    // Airbnb disallows these because it can lead to errors with minified code;
    // we don't have to worry about this in for loops though
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L330
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // Array destructuring can result in non-intuitive code
    // Object destructuring is disgustingly verbose in TypeScript
    // e.g. "const foo: string = bar.foo;" vs "const { foo }: { foo: string } = bar;"
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js#L114
    'prefer-destructuring': ['off'],
  },
}
