/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.twig",
    "./assets/js/**/*.{js,jsx,ts,tsx}",
    './node_modules/flowbite/**/*.js',
    '.node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}
