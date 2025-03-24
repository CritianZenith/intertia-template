const defaultTheme = require('tailwindcss/defaultTheme')
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    './app/javascript/**/*.ts',
    './app/javascript/**/*.tsx',
    './app/views/**/*.{erb,haml,html,slim}',
    './node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/container-queries'),
    heroui()
  ]
}
