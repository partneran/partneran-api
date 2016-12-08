'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    userId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    myhash: DataTypes.STRING(1024),
    mysalt: DataTypes.STRING,
    photo_URL: DataTypes.STRING,
    verify: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};