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
        'hospital-green': '#ACD9B2',
      }),
      textColor: {
        'very-light-pink': '#C7C7C7',
        'text-input-field': '#F7F7F7',
        'hospital-green': '#ACD9B2',
      },
      colors: {
        'very-light-pink': '#C7C7C7',
        'text-input-field': '#F7F7F7',
        'hospital-green': '#ACD9B2',
        'border': '#DFDFDF',
      },
      fontFamily: {
        Quicksand: ['Quicksand', 'sans-serif']
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      gridTemplateColumns: {
        'autosm': 'repeat(auto-fill, 140px)',
        'automd': 'repeat(auto-fill, 240px)'
      }
    },
  },
  plugins: [],
}
