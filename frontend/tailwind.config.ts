import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#06b6d4",
          blue: "#0284c7",
          slate: "#020617",
          black: "#000000",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
