/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9eedb',
          200: '#f1dcb2',
          300: '#e7c683',
          400: '#dbad5b',
          500: '#c5a059',
          600: '#ab8443',
          700: '#8f6834',
          800: '#77542d',
          900: '#624527',
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
        'gold-radial': 'radial-gradient(ellipse at top, #dbad5b 0%, #c5a059 50%, #ab8443 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0b1220 0%, #141e30 50%, #1e293b 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(197,160,89,0.35)',
        'gold-lg': '0 8px 40px rgba(197,160,89,0.45)',
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
