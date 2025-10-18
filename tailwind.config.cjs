/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-right': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(50%,0,0)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left var(--marquee-duration, 15s) linear infinite',
        'marquee-right': 'marquee-right var(--marquee-duration, 15s) linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};


