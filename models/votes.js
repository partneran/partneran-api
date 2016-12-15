'use strict';
module.exports = function(sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    voteId: DataTypes.INTEGER,
    votes: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    IdeaId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Votes.belongsTo(models.Users)
        Votes.belongsTo(models.Ideas)
      }
    }
  });
  return Votes;
};
