import type { Config } from 'tailwindcss';

const config = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tic: {
          DEFAULT: '#102030',
          light: '#304050',
          lighter: '#708090',
          fill: '#F7F6F6',
          stroke: '#E5E7E9',
          purple: '#4B3BB0',
          'purple-light': '#A8ACE4',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
