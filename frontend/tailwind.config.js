/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // 'primary': "#38182F",
        'primary': "#0d2136",
        // 'bg': "#E9E9E9",
        'bg': "#9abbf1d4",
        'secondary': '#3b82f680',
        'white': '#FFFFFF',
        'white-200': "rgba(255, 255, 255, 0.8)",
        },
    },
  },
  plugins: [],
}