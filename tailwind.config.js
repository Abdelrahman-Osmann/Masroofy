module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        'primary-light': '#CCFBF1',
        danger: '#E11D48',
        warning: '#D97706',
      },
    },
  },
  plugins: [],
};
