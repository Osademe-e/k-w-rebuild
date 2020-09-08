module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'Arial'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          100: '#fbf6d7',
          200: '#f7edaf',
          300: '#f4e587',
          400: '#f0dc5f',
          500: '#edd437',
          600: '#bsa92c',
          700: '#8e7f21',
          800: '#5e5416',
          900: '#2f2a0b',
        },
        secondary: '#3560A1',
      },
    },
  },
  variants: {
    backgroundImage: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
};
