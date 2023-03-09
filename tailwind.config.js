module.exports = {
  mode: "jit", // Optionally use just in time engine
  purge: ["./src/**/*.{js,jsx,ts,tsx,css}", "./public/index.html"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
