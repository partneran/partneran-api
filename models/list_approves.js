'use strict';
module.exports = function(sequelize, DataTypes) {
  var List_approves = sequelize.define('List_approves', {
    list_approve_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        List_approves.belongsTo(models.Users)
        List_approves.belongsTo(models.Ideas)
      }
    }
  });
  return List_approves;
};
