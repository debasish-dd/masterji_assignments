/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/**/*.html",    // <-- include all HTML in dist
    "./src/**/*.{js,css}", // if you ever import Tailwind classes in JS/CSS
  ],
  theme: { extend: {} },
  plugins: [],
};
