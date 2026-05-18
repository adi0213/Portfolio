/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        card: "var(--card)",
        "primary-accent": "var(--primary-accent)",
        gold: "var(--gold)",
        cream: "var(--cream)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}