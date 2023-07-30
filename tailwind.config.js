const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
        pretendard: ['var(--font-pretendard)', ...fontFamily.sans],
      },
      colors: {
        primary: '#202020',
        nudge: '#19F1CA',
        grayscale: {
          100: '#F3F3F3',
          200: '#E8E8E8',
          300: '#BCBCBC',
          400: '#797979',
          500: '#3F3F3F',
          600: '#202020',
          700: '#1B1717',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.text-main-headline': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '1.25rem',
          fontWeight: '700',
          lineHeight: '1',
        },
        '.text-sub-headline': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '1.125rem',
          fontWeight: '700',
          lineHeight: '1.3',
        },
        '.text-body1': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '1rem',
          fontWeight: '500',
          lineHeight: '1.5',
        },
        '.text-body2': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '0.875rem',
          fontWeight: '400',
          lineHeight: '1.5',
        },
        '.text-body2-accent': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.text-caption': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '0.75rem',
          fontWeight: '500',
          lineHeight: '1.5',
        },
        '.text-button1': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1',
        },
        '.text-button2': {
          fontFamily: theme('fontFamily.pretendard'),
          fontSize: '0.875rem',
          fontWeight: '600',
          lineHeight: '1',
        },
        '.text-accent-eng': {
          fontFamily: theme('fontFamily.montserrat'),
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: '1',
        },
        '.text-body-eng': {
          fontFamily: theme('fontFamily.montserrat'),
          fontSize: '0.875rem',
          fontWeight: '600',
          lineHeight: '1.5',
        },
        '.text-caption-eng': {
          fontFamily: theme('fontFamily.montserrat'),
          fontSize: '0.75rem',
          fontWeight: '400',
          lineHeight: '1.3',
        },
        '.text-logo1': {
          fontFamily: theme('fontFamily.montserrat'),
          fontSize: '1.5rem',
          fontWeight: '600',
          lineHeight: '1.5',
        },
      });
    }),
    require('tailwind-scrollbar-hide'),
  ],
};
