const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('admin', {
  
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{ 
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        // set(value) {
        //   // Storing passwords in plaintext in the database is terrible.
        //   // Hashing the value with an appropriate cryptographic hash function is better.
        //   // Using the username as a salt is better.
        //   this.setDataValue('password', hash(this.username + value));
        // }
        allowNull: false,
      },
  });
};
