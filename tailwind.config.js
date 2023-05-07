/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lofi: {
          ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
          "background-color": "#f8fafc",
        },
      },
      {
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=black]"],
          "background-color": "#0a0a0a",
        },
      },
    ],
    darkTheme: "black",
  },
  darkMode: ["class", '[data-theme="black"]'],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
