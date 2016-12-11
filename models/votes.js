'use strict';
module.exports = function(sequelize, DataTypes) {
  var Votes = sequelize.define('Votes', {
    voteId: DataTypes.INTEGER,
    votes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Votes;
};