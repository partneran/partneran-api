'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notifications = sequelize.define('Notifications', {
    notificationId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Notifications.belongsTo(models.Users)
        Notifications.belongsTo(models.Ideas)
      }
    }
  });
  return Notifications;
};
