'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    commentId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comments;
};