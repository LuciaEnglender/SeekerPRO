module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('/src/component/postulantes/Styles/Imagenes/FOndo2.jpg')",
      },
      padding: {
        "20%": "20vh",
        "25%": "20vh",
        "30%": "20vh",
        "35%": "20vh",
      },
      colors: {
        //NUEVOS
        colorFondo1: "#353535",
        colorFondo2: "#3c6e71",
        colorFondo3: "#ffffff",
        colorBotones: "#d9d9d9",
        colorDetalles: "#284b63",

        //DANI
        azul: "#044c7b",
        gris: "#5a6462",

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
