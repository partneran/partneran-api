'use strict';
module.exports = function(sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    roleId: DataTypes.INTEGER,
    roles: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Roles;
};