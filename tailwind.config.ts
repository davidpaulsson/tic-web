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
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'background-position-spin': {
          '0%': { backgroundPosition: 'top center' },
          '100%': { backgroundPosition: 'bottom center' },
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        backgroundPositionSpin: 'background-position-spin 3000ms infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
