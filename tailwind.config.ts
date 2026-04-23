import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '390px',
        xl: '1280px',
      },
      colors: {
        primary: 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',

        surface: {
          highest: 'var(--color-surface-highest)',
          low: 'var(--color-surface-low)',
        },

        background: 'var(--color-background)',

        slate: {
          900: 'var(--color-slate-900)',
          600: 'var(--color-slate-600)',
          500: 'var(--color-slate-500)',
          400: 'var(--color-slate-400)',
          300: 'var(--color-slate-300)',
        },

        success: 'var(--color-success)',

        error:{
          default: 'var(--color-error)',
          900: 'var(--color-error-900)',
          200: 'var(--color-error-200)',
        },
        warning: 'var(--color-warning)',
      },

      /* =========================
         🔤 TYPOGRAPHY SCALE
      ========================== */
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': [
          '56px',
          {
            lineHeight: '56px',
            letterSpacing: '-2.8px',
          },
        ],

        'headline-lg': [
          '32px',
          {
            lineHeight: '40px',
            letterSpacing: '0px',
          },
        ],

        'title-md': [
          '18px',
          {
            lineHeight: '27px',
            letterSpacing: '0px',
          },
        ],

        'body-md': [
          '14px',
          {
            lineHeight: '22.75px',
            letterSpacing: '0px',
          },
        ],

        'label-sm': [
          '11px',
          {
            lineHeight: '16.5px',
            letterSpacing: '1.1px',
          },
        ],
      },
    },
  },
  plugins: [],
}

export default config;
