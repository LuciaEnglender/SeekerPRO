const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("vacancy", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
