// TailwindCSS configuration file
/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    './index.html',
    './src/**/*.{jsx,tsx,js,ts}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'],
      },
    },
  },

  plugins: [],
};

export default config;
