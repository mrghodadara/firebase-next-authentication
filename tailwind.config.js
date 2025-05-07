/** @type {import('tailwindcss').Config} */
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      roboto: 'Roboto',
      inter: 'Inter',
    },

    extend: {
      colors: {
        primary: '#1D7AFC',
        surface: '#F6F8FA',
        blue: {
          5: '#E9F2FF',
        },
        gray: {
          5: '#57606A',
          10: '#D0D7DE',
          15: '#8C959F',
          25: '#24292F',
        },
        danger: {
          10: '#E34935',
        },
      },

      boxShadow: {
        input: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        authBox: '0px 6px 24px 0px rgba(0, 0, 0, 0.1)',
        header: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [lineClamp],
};
