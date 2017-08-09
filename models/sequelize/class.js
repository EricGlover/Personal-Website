'use strict';
module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define('Class', {
    className: DataTypes.STRING,
    statId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Class;
};