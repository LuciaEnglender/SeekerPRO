const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('login', {

    
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    password :{
      type: DataTypes.STRING,
      allowNull: false
    },
    profile:{
        type: DataTypes.ENUM('POSTULANTE', 'BUSINESS'),
        allowNull: false
    }
  });
};