const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontSize: {
        'main-headline': ['1.25rem', { fontWeight: '700' }],
        'sub-headline': ['1.125rem', { fontWeight: '700', lineHeight: '1.3' }],
        body1: ['1rem', { fontWeight: '400', lineHeight: '1.5' }],
        body2: ['0.875rem', { fontWeight: '400', lineHeight: '1.5' }],
        caption: ['0.75rem', { fontWeight: '400', lineHeight: '1.5' }],
        button1: ['1rem', { fontWeight: '600' }],
        button2: ['0.875rem', { fontWeight: '600' }],
        'accent-eng': ['1rem', { fontWeight: '600' }],
        'body-eng': ['0.875rem', { fontWeight: '600', lineHeight: '1.5' }],
        'caption-eng': ['0.75rem', { fontWeight: '400', lineHeight: '1.3' }],
      },
    },
  },
  plugins: [],
};
