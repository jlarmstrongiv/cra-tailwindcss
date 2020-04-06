const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

// REFACTOR
// https://tailwindcss.com/docs/using-with-preprocessors#future-css-features
// const postcssPresetEnv = require('postcss-preset-env');
// MOVE STYLES OUTSIDE SRC to prevent double reloading?

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwind.js'),
    require('postcss-nested'),

    // https://tailwindcss.com/docs/using-with-preprocessors#variables
    process.env.NODE_ENV === 'production'
      ? require('postcss-custom-properties')
      : null,
    // https://flaviocopes.com/tailwind-setup/
    process.env.NODE_ENV === 'production'
      ? require('autoprefixer')
      : null,
    process.env.NODE_ENV === 'production'
      ? cssnano({ preset: 'default' })
      : null,
    process.env.NODE_ENV === 'production'
      ? purgecss({
          // Specify the paths to all of the template files in your project
          content: [
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx',
          ],

          // Include any special characters you're using in this regular expression
          defaultExtractor: (content) =>
            content.match(/[\w-/.:]+(?<!:)/g) || [],
        })
      : null,
  ],
};
