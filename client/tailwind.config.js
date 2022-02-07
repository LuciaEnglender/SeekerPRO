module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verdeOscuro: "#354f52",
        verdeMedio: "#52796f",
        verdeClaro: "#84a98c",
        verdeMuyClaro: "#cad2c5",
        verdeHover: "#c6e0b6",
        grisBoton: "#475569",
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ["Montserrat"],
    serif: ["Merriweather", "serif"],
  },
};
