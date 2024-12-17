import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A3D977',
        'primary-dark': '#8BC34A',
        secondary: '#FFF8E1',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: '.',
  },
};
