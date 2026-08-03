/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { 50: '#eef7ff', 100: '#d9edff', 200: '#badfff', 500: '#1685d8', 600: '#0869b5', 700: '#07558f', 900: '#07365b' }, ink: '#132238', canvas: '#f7f9fc' },
      boxShadow: { soft: '0 8px 30px rgba(25, 55, 90, .06)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
