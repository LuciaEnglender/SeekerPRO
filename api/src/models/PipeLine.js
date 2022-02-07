const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pipeLine', {
    //cambio de nombre de campos de la  tabla  duda en entrevista y entrevista tecnica
    new: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    review:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    contacted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    inter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    tech: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    offered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rejected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  });
};