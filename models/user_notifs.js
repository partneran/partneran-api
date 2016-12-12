'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_notifs = sequelize.define('User_notifs', {
    user_notif_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User_notifs;
};