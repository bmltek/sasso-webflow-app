/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          800: '#065f46', // Deep forest green
          600: '#059669',
          500: '#10b981',
        },
        lime: {
          500: '#84cc16', // Vibrant lime green
          400: '#a3e635',
          300: '#bef264',
        },
      },
    },
  },
  plugins: [],
};