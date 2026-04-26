/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "industrial-charcoal": "#121212",
        "industrial-steel": "#222222",
        "industrial-recessed": "#0A0A0A",
        "industrial-border": "#333333",
        "industrial-silver": "#E2E2E2",
        "industrial-gray": "#A0A0A0",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
