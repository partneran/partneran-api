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
    photo_URL: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    short_bio: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
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
