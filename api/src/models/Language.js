const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('language', {
    
    // id:{
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   primaryKey: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
        type: DataTypes.STRING,
        // allowNull: false
        allowNull: true
    }
  });
};
