'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_notifs = sequelize.define('User_notifs', {
    user_notif_id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    NotificationId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User_notifs.belongsTo(models.Users)
        User_notifs.belongsTo(models.Notifications)
      }
    }
  });
  return User_notifs;
};
