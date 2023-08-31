/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        hero: 'url("/hero.jpg")',
      },
    },
  },
  plugins: [],
};
