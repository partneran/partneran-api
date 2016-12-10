'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ideas = sequelize.define('Ideas', {
    ideaId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ideas;
};
