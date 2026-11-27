/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF2F8',
          100: '#D6DFEC',
          200: '#ADBFD9',
          300: '#7E95BC',
          400: '#4E658F',
          500: '#274068',
          600: '#152A4B',
          700: '#0A1931',
          800: '#071224',
          900: '#040C1A',
        },
        brand: {
          50: '#FFF3F3',
          100: '#FFE1E1',
          200: '#FFC2C2',
          300: '#FF9494',
          400: '#FF5C5C',
          500: '#FF2D2D',
          600: '#E01F1F',
          700: '#B81616',
          800: '#8F1111',
          900: '#660C0C',
        },
        gold: {
          50: '#FFFBEA',
          100: '#FFF3C4',
          200: '#FCE588',
          300: '#FADB5F',
          400: '#FFC107',
          500: '#F0B400',
          600: '#DE911D',
          700: '#CB6E17',
        },
        success: {
          400: '#2ADD71',
          500: '#00C853',
          600: '#00A344',
          700: '#008037',
        },
      },
      fontFamily: {
        heading: ['Sora', 'Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(10, 25, 49, 0.12)',
        lift: '0 16px 48px -12px rgba(10, 25, 49, 0.22)',
        glow: '0 0 40px -8px rgba(255, 45, 45, 0.45)',
      },
      borderRadius: {
        xl2: '16px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.8)', opacity: '0.4' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
