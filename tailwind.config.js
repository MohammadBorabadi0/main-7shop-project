const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F4F5FC",
        secondary__light: "#faf5fc",
        secondary__dark: "#888",
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(300px, 1fr))",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        navbar: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        showModal: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        wiggle: "wiggle .3s ease-in-out forwards",
        navbar: "navbar .3s ease-in-out forwards",
        showModal: "showModal .7s ease-in-out forwards",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        "html::-webkit-scrollbar": {
          width: "12px",
        },
        "html::-webkit-scrollbar-track": {
          background: "#F4F5FC",
        },
        "html::-webkit-scrollbar-thumb": {
          "background-color": "#f97316",
          "border-radius": "10px",
        },
        ".aside::-webkit-scrollbar": {
          width: "10px",
          "max-height": "100px",
        },
        ".aside::-webkit-scrollbar-thumb": {
          "background-color": "#f97316",
          "border-radius": "10px",
        },
      });
    }),
  ],
};
