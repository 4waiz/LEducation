import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#1b1b1f',
        },
        navy: {
          900: '#fff8ef',
          950: '#f7f4ee',
        },
        chalk: {
          50: '#1a1a1f',
          100: '#2b2b33',
          200: '#4b4b55',
          300: '#5f5f6b',
          400: '#7a7a86',
          500: '#9a9aa5',
          600: '#b8b8c0',
          700: '#d5d5db',
          800: '#e6e5ea',
          900: '#f2f1f5',
        },
        lime: {
          400: '#ffb703',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(28, 28, 34, 0.12)',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
} satisfies Config;

