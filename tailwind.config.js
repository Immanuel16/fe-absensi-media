/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: ({ theme }) => theme("colors"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
        btn: "25px",
        input: "8px",
        card: "20px",
        header: "36px",
      },
      boxShadow: ({ boxShadow }) => ({
        ...boxShadow,
        pagination: "2px 2px 8px rgba(134, 134, 134, 0.15)",
        card: "2px 2px 5px rgba(42, 218, 242, 0.6)",
      }),
      colors: ({ colors }) => ({
        ...colors,
        media: {
          "primary-orange": "#F06726",
          "secondary-orange": "rgba(240, 103, 38, 0.2)",
          "primary-gray": "#838484",
          "secondary-gray": "#d0d0d0",
          "primary-black": "#333",
          "primary-green": "#00ba88",
          "secondary-green": "#2accc8",
          "secondary-green-2": "rgba(0, 186, 136, 0.2)",
          "primary-blue": "#2adaf2",
          "secondary-blue": "#b8eeed",
          "secondary-blue-2": "#c6fffe",
          "primary-yellow": "#ffd04b",
          "danger-3": "#ef233c",
          "danger-2": "#FF5C84",
          "danger-1": "#FFEAEF",
          disabled: "#cdcdcd",
          "black-1": "#333",
          "black-2": "#696969",
          "black-3": "#838484",
          "black-4": "#868686",
          "black-5": "#c4c4c4",
          "black-6": "#d0d0d0",
          "black-7": "#979797",
        },
      }),
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxs: ["10px", { lineHeight: "18px" }],
        xs: ["0.75rem", { lineHeight: "18px" }],
        sm: ["0.875rem", { lineHeight: "24px" }],
        base: ["1rem", { lineHeight: "24px" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "30px" }],
        "2xl": ["1.5rem", { lineHeight: "36px" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["40px", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],

        h1: ["24px", { lineHeight: "140%" }],
        h2: ["20px", { lineHeight: "140%" }],
        h3: ["18px", { lineHeight: "140%" }],
        h4: ["16px", { lineHeight: "140%" }],
        h5: ["14px", { lineHeight: "140%" }],
        h6: ["12px", { lineHeight: "140%" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
    require("tailwindcss-children"),
  ],
};
