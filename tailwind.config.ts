import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Rose - warm and inviting
        rose: {
          50: '#fff1f5',
          100: '#ffe4eb',
          200: '#ffc9d8',
          300: '#ff9bbe',
          400: '#ff6a94',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        // Accent: Amber - warm and energetic
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutrals: Slate - cool and calm
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        text: {
          primary: '#2d3436',
          secondary: '#636e72',
          tertiary: '#95a5a6',
        },
        // Flattened dark mode colors
        'dark-bg-primary': '#1a1d1a',
        'dark-bg-secondary': '#242824',
        'dark-bg-tertiary': '#2d322d',
        'dark-text-primary': '#e8ebe8',
        'dark-text-secondary': '#b8bdb8',
        'dark-text-tertiary': '#8a8f8a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['1rem', { lineHeight: '1.6' }],
        'base': ['1.125rem', { lineHeight: '1.7' }],
        'lg': ['1.25rem', { lineHeight: '1.7' }],
        'xl': ['1.5rem', { lineHeight: '1.6' }],
        '2xl': ['2rem', { lineHeight: '1.4' }],
        '3xl': ['2.5rem', { lineHeight: '1.3' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
      },
      maxWidth: {
        'content': '680px',
      },
      transitionProperty: {
        'all': 'all',
        'colors': 'background-color, border-color, color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
        'shadow': 'box-shadow',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gentle-bounce': 'gentleBounce 3s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;