/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0B0D0E',
        charcoal: '#151819',
        'dark-gray': '#252829',
        gold: '#D5A437',
        'gold-hover': '#B98A25',
        'warm-white': '#FAF8F4',
        cream: '#F4F0E8',
        'text-dark': '#181818',
        'text-gray': '#6B6B6B',
        'border-light': '#E7E2DA',
      },
      fontFamily: {
        heading: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
