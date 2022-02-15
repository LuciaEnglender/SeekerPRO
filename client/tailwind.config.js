module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // colorFondo1: "#CAC5C4",
        // colorFondo2: "#CAC5C4",
        // colorFondo3: "#A2928E",
        // colorBoton: "#E94E2D",
        verdeOscuro: "#242121",
        verdeMedio: "#333333",
        verdeClaro: "#CDC7CB",
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
