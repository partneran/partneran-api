'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ideas = sequelize.define('Ideas', {
    ideaId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    slug: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Ideas.belongsTo(models.Users)
        Ideas.belongsTo(models.Categories)
        Ideas.hasMany(models.Comments)
        Ideas.hasMany(models.Roles)
      }
    }
  });
  return Ideas;
};
