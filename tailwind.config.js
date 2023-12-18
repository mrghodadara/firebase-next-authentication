/** @type {import('tailwindcss').Config} */
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roboto: 'Roboto',
      inter: 'Inter',
    },

    extend: {},
  },
  plugins: [lineClamp],
};
