<<<<<<< HEAD
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("message", {
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		conversationId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sender: {
			type: DataTypes.STRING,
		},
		text: {
			type: DataTypes.STRING,
		},
	});
};
=======
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('new', {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING
    }
  });
};
>>>>>>> 173c939c452cedfc796ed12a1635108ba76665fa
