const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      primary: {
        100: '#eef6ef',
        300: '#86c08d',
        400: '#52A55C',
        700: '#29532e',
        900: '#081009'
      },
      secondary: {
        100: '#e5e8dd',
        300: '#587264',
        400: '#103621',
        700: '#081b11',
        900: '#020503'
      },
      neutral: {
        100: '#e5e8dd',
        300: '#d1d6c4',
        400: '#bdc5aa',
        700: '#5f6355',
        900: '#131411'
      },
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    extend: {
      backgroundImage: {
        'hero-image': 'url("assets/drone-above-field-1920.png")'
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      console.log(theme('colors'))
      addComponents({
        '.rotate-0': {
          'rotate': '0deg'
        },
        '.rotate-90': {
          'rotate': '90deg'
        },
        '.rotate-180': {
          'rotate': '180deg'
        },
        '.rotate-270': {
          'rotate': '270deg'
        },
        'h1': {
          'font-size': theme('fontSize.4xl'),
          'line-height': theme('lineHeight.10'),
          'font-weight': theme('fontWeight.bold'),
        },
        'button[primary]': {
          'background-color': theme('colors.primary.400'),
          'color': theme('colors.white'),
          'border-radius': theme('borderRadius.full'),
          'padding': theme('spacing.2') + ' ' + theme('spacing.4'),
          'font-size': theme('fontSize.md'),
          'font-weight': theme('fontWeight.medium'),
          'line-height': theme('lineHeight.6'),
          'transition': 'background-color 0.2s ease-in-out',
          '&:hover': {
            'background-color': theme('colors.primary.300'),
          }
        },
        'button[secondary]': {
        },
        'button[ghost]': {
          'background-color': theme('colors.transparent'),
          'color': theme('colors.primary.400'),
          'border': 'none',
          'padding': theme('spacing.1') + ' ' + theme('spacing.4'),
          'font-size': theme('fontSize.md'),
          'font-weight': theme('fontWeight.medium'),
          'line-height': theme('lineHeight.6'),
          'transition': 'background-color 0.2s ease-in-out',
          '&:hover': {
            'color': theme('colors.primary.300'),
          }
        }
      })
    })
  ]
};
