module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.js'),
    // https://tailwindcss.com/docs/using-with-preprocessors#future-css-features
    require('postcss-preset-env')({
      stage: 1,
      features: {
        // https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
        'focus-within-pseudo-class': false,
      },
      autoprefixer: process.env.NODE_ENV === 'production',
    }),

    // https://flaviocopes.com/tailwind-setup/
    process.env.NODE_ENV === 'production'
      ? require('cssnano')({ preset: 'default' })
      : null,
    process.env.NODE_ENV === 'production'
      ? require('@fullhuman/postcss-purgecss')({
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
