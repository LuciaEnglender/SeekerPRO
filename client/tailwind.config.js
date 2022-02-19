module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "86vh": "86vh",
      },
      width: {
        "96%": "96%",
      },
      padding: {
        "20%": "20vh",
        "25%": "20vh",
        "30%": "20vh",
        "35%": "20vh",
      },
      colors: {
        //NUEVOS
        colorGrisClaro: "#dee2e6",
        colorGris: "#81929e",
        colorNegro: "#353535",
        colorFondo1: "#e8edec",
        colorFondo2: "#cad9d9",
        colorFondo3: "#3c6e71",
        colorBotones1: "#2c4555",
        colorBotones2: "#2f3e46",
        colorDetalles1: "#608a83",
        colorDetalles2: "#95afa4",

        //NUEVOS
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
  fontFamily: {},
};
