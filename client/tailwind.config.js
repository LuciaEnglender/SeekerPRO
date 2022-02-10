module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verdeOscuro:"#242121" ,
        verdeMedio: "#333333",
        verdeClaro: "#CDC7CB",
        verdeMuyClaro: "#cad2c5",
        verdeHover: "#c6e0b6",
        grisBoton: "#475569",
      },
      darkMode: 'class'
    },
  },
  plugins: [],
  fontFamily: {
    sans: ["Montserrat"],
    serif: ["Merriweather", "serif"],
  },
};
