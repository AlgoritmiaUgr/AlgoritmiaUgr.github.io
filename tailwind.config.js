/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Colores puros para el modo oscuro
        'pure-black': '#000000',
        'pure-white': '#ffffff',
        'ultra-black': '#000000',
        'deep-black': '#0a0a0a',
        'deeper-black': '#050505',
        // Colores cálidos para efectos de fondo
        'warm-orange': '#ff6b35',
        'warm-pink': '#ff5470',
        'warm-red': '#ff4757',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'cloud-glow': 'cloudGlow 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        cloudGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      // Optimizaciones de spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Optimizaciones de screens
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    // Plugin para mejor performance del dark mode
    function({ addUtilities, theme, variants }) {
      const newUtilities = {
        '.transition-theme': {
          'transition-property': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'transition-duration': '200ms',
        }
      }
      addUtilities(newUtilities)
    }
  ],
  // Optimización para reducir el tamaño del bundle CSS
  corePlugins: {
    preflight: true,
  },
} 