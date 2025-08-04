// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#1e90ff", // Main accent color
          dark: "#005bb5", // Hover/dark variant
        },
      },
      borderRadius: {
        '2xl': '1.25rem', // Smooth, generous rounding
      },
    },
  },
  plugins: [],
};