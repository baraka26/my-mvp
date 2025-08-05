/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class', // Enables manual dark theme support
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
          DEFAULT: "var(--color-brand, #1e90ff)", // Uses CSS variable if defined, fallback ensured
          dark: "var(--color-brand-dark, #005bb5)", // Same for dark variant
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
};