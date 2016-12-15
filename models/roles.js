'use strict';
module.exports = function(sequelize, DataTypes) {
  var Roles = sequelize.define('Roles', {
    roleId: DataTypes.INTEGER,
    roles: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Roles.belongsTo(models.Users)
        Roles.belongsTo(models.Ideas)
      }
    }
  });
  return Roles;
};
