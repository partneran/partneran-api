'use strict';
module.exports = function(sequelize, DataTypes) {
  var List_approves = sequelize.define('List_approves', {
    list_approve_id: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return List_approves;
};