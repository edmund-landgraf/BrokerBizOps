/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6c0a',
          700: '#c2500a',
          800: '#9a3d10',
          900: '#7c3210',
        },
        slate: {
          950: '#0b1220',
          900: '#0f172a',
          850: '#141e30',
          800: '#1e293b',
          700: '#334155',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'orange-radial': 'radial-gradient(ellipse at top, #f97316 0%, #ea580c 50%, #c2410c 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0b1220 0%, #141e30 50%, #1e293b 100%)',
      },
      boxShadow: {
        'orange': '0 4px 24px rgba(249,115,22,0.35)',
        'orange-lg': '0 8px 40px rgba(249,115,22,0.45)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'float':   'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
