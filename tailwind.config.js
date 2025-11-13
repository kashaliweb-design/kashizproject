/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, rgb(15 23 42) 0%, rgb(88 28 135) 50%, rgb(15 23 42) 100%)',
        'glass': 'rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        'glass': '10px',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};