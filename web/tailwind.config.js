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
        brand: {
          navy: '#0B132B',
          deep: '#0F172A',
          card: '#1E293B',
          cyan: '#38BDF8',
          blue: '#0284C7',
          purple: '#8B5CF6',
          violet: '#A855F7',
          accent: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
