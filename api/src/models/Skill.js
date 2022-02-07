const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('skill', {
    name: {
      type:/* DataTypes.ARRAY(DataTypes.STRING)*/ DataTypes.STRING,
      allowNull: false,
    },
  });
};
