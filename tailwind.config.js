module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "brand-green": "#b6e82e",
        "bg-dark": "#14171c",
        "bg-darker": "#272a2e",
        "text-muted": "#b6e82e14",
      },
      borderRadius: {
        xl: "1.875rem", // 30px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};
