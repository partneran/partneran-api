'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notifications = sequelize.define('Notifications', {
    notificationId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notifications;
};