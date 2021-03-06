'use strict';
var passportLocalSequelize = require('passport-local-sequelize')

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    userId: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    myhash: DataTypes.STRING(1024),
    mysalt: DataTypes.STRING,
    photo_URL: DataTypes.TEXT,
    verify: DataTypes.BOOLEAN,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    short_bio: DataTypes.TEXT,
    isSuper: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Ideas)
        Users.hasMany(models.Comments)
        Users.hasMany(models.Roles)
        Users.hasMany(models.Votes)
        Users.hasMany(models.Reports)
        Users.hasMany(models.Notifications)
        Users.hasMany(models.User_notifs)
        Users.hasMany(models.List_approves)
      }
    }
  });

  passportLocalSequelize.attachToUser(Users, {
    usernameField: 'email',
    hashField: 'myhash',
    saltField: 'mysalt'
  })
  return Users;
};
