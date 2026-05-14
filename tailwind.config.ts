import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FAF5ED',
          mid:     '#F0E8D5',
          dark:    '#E4D4B5',
        },
        walnut: {
          DEFAULT: '#1C140A',
          light:   '#4A3520',
          muted:   '#7A6248',
        },
        gold: {
          DEFAULT: '#B8922C',
          light:   '#D4AF5A',
          shimmer: '#E8C96B',
        },
        rose: {
          DEFAULT: '#8B3A52',
          light:   '#B56078',
        },
      },
      fontFamily: {
        heading:   ['var(--font-heading)', 'serif'],
        body:      ['var(--font-body)',    'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        amiri:     ['var(--font-amiri)',     'serif'],
      },
      animation: {
        shimmer:         'shimmer 5s linear infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'fade-up':       'fadeUp 1s cubic-bezier(0.4,0,0.2,1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        scrollBounce: {
          '0%,100%': { transform: 'rotate(45deg) translateY(0)' },
          '50%':     { transform: 'rotate(45deg) translateY(9px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
