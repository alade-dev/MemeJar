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
        'primary': "#060510",
        // 'primary': "#0d2136",
        'bg': "#060510",
        // 'bg': "#9abbf1d4",
        'secondary': '#fff',
        'white': '#FFFFFF',
        'tcolor': '#6e243d',
        'white-200': "rgba(255, 255, 255, 0.8)",
        },
    },
  },
  plugins: [],
}