/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E74504',
        interface: '#000000',
        secondary: 'rgba(51, 51, 51, 0.8)', 
      },
      fontFamily: {
        bayon: ['Bayon', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kaisei: ['Kaisei Tokumin', 'serif']
      },
      spacing: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        '4': '24px',
        '5': '32px',
        '6': '48px',
      },
    },
  },
  plugins: [],
}

