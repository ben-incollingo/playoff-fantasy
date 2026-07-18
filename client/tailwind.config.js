/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.55)",
        modal: "0 24px 80px rgba(0, 0, 0, 0.65)",
      },
    },
  },
  plugins: [],
};
