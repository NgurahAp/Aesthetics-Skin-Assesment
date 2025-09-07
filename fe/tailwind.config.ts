import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Jika menggunakan src folder
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f0f4f0',
          100: '#e1e8e1',
          200: '#c3d4c3',
          300: '#a5c0a5',
          400: '#87ac87',
          500: '#6a9669',
          600: '#4c6a4c',
          700: '#3a523a',
          800: '#2d4a2d', // Added for more variations
          900: '#1f3520', // Added for deeper shade
        },
        cream: {
          50: '#fefcf7',
          100: '#faf6ed',
          200: '#f5f0e3',
          300: '#f0ebd9',
          400: '#e8dcc8', // Added for more variations
          500: '#dfc7a6', // Added for more variations
        }
      }
    },
  },
  plugins: [],
}

export default config