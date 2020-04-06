module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    // https://www.notion.so/Tailwind-UI-Documentation-f9083ed0e2694690ac89253e88afb2b6
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
  ],
};
