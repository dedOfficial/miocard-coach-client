module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      colors: {
        'dark-blue': '#20385D',
        'light-blue': '#5786F4',
        'base-blue': '#2E7CF6',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [],
};
