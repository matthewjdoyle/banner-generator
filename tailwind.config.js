/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary: Electric Purple (from logo - #9B5DE5)
        primary: {
          50: '#faf7ff',
          100: '#f2ecff',
          200: '#e7dcff',
          300: '#d4c2ff',
          400: '#bb9bff',
          500: '#9b5de5',
          600: '#8b42d9',
          700: '#7b31c7',
          800: '#6527a4',
          900: '#532184',
          950: '#351357'
        },
        // Secondary: Viridis Green (from logo - #05e68c)
        secondary: {
          50: '#f0fdf7',
          100: '#dcfceb',
          200: '#bbf7d8',
          300: '#86efbb',
          400: '#4ade96',
          500: '#05e68c',
          600: '#04c46b',
          700: '#059b56',
          800: '#087a47',
          900: '#0a653c',
          950: '#023a20'
        },
        // Accent: Viridis Yellow (from logo - #fde725)
        accent: {
          50: '#fffee7',
          100: '#fffcc1',
          200: '#fff886',
          300: '#ffed41',
          400: '#fde725',
          500: '#edc707',
          600: '#cd9c02',
          700: '#a47006',
          800: '#87580d',
          900: '#734711',
          950: '#432505'
        },
        // Neutral: Warm Grays (Modern & Clean)
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09'
        },
        // Success: Fresh Green
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        // Warning: Vibrant Yellow
        warning: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006'
        },
        // Error: Modern Red
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #9b5de5 0%, #7b31c7 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #05e68c 0%, #059b56 100%)',
        'gradient-accent': 'linear-gradient(135deg, #fde725 0%, #edc707 100%)',
        'gradient-hero': 'linear-gradient(135deg, #9b5de5 0%, #05e68c 50%, #fde725 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
} 