const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('postulant', {
 
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    CV: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    github : {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedIn:{
      type: DataTypes.STRING,
      allowNull: true
    },
    portfolio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    extras:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
};
