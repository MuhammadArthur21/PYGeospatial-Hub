/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefbf3',
          100: '#d5f5e0',
          200: '#adeac4',
          300: '#78d8a2',
          400: '#3fc07d',
          500: '#1ba863',
          600: '#0e884f',
          700: '#0e6d41',
          800: '#105736',
          900: '#0e482f',
          950: '#06281a',
        },
        ocean: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe2fe',
          300: '#93d0fd',
          400: '#60b4fa',
          500: '#3b94f5',
          600: '#2577ea',
          700: '#1d62d7',
          800: '#1e4fae',
          900: '#1e4589',
          950: '#172b54',
        },
        surface: {
          DEFAULT: '#0a0e1a',
          50: '#f0f2f8',
          100: '#d4d8e8',
          200: '#a9b1d1',
          300: '#7783b5',
          400: '#525f94',
          500: '#3b4779',
          600: '#2f3962',
          700: '#282f4e',
          800: '#222841',
          900: '#1a1f35',
          950: '#0a0e1a',
        },
        accent: {
          DEFAULT: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
