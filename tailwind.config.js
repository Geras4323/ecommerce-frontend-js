/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'very-light-pink': '#C7C7C7',
        'text-input-field': '#F7F7F7',
        'hospital-green': '#74c27e',
      }),
      textColor: {
        'very-light-pink': '#686e79',
        'text-input-field': '#F7F7F7',
        'hospital-green': '#20b000',
      },
      colors: {
        'very-light-pink': '#C7C7C7',
        'text-input-field': '#F7F7F7',
        'hospital-green': '#74c27e',
        'border': '#DFDFDF',
      },
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif']
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      gridTemplateColumns: {
        'autosm': 'repeat(auto-fill, 140px)',
        'automd': 'repeat(auto-fill, 240px)'
      },
      animation: {
        marqueeSlow: 'marquee 25s linear infinite',
        marqueeMed: 'marquee 20s linear infinite',
        marqueeFast: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(calc(-100% - 12px))' },
        },
      },
    },
  },
  plugins: [],
}
