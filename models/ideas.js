'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ideas = sequelize.define('Ideas', {
    ideaId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ideas;
};
