'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define('Comments', {
    commentId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Comments.belongsTo(models.Users)
        Comments.belongsTo(models.Ideas)
      }
    }
  });
  return Comments;
};
