/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'search-background': 'url(/worl-map.png)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#590bd8',
        primaryDarker: '#312a4f',
        primaryLighter: '#ddd6ea',
        grayPrimary: '#717171',
        grayLighter: '#bbbfbf',
        walterWhile: '#e0e0fc',
      },
      textColor: {
        dark: '#717171',
      },
    },
  },
  plugins: [],
};
