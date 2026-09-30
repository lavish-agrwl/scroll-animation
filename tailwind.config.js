/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        cream: "#F5F1E8",
        lime: "#C8F04B",
        ember: "#FF4D2E",
        smoke: "#131315",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        mega: "0.35em",
      }
    },
  },
  plugins: [],
};
