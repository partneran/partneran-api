'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reports = sequelize.define('Reports', {
    reportId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Reports.belongsTo(models.Users)
        Reports.belongsTo(models.Ideas)
      }
    }
  });
  return Reports;
};
