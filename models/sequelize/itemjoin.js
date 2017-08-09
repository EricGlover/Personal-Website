'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemJoin = sequelize.define('ItemJoin', {
    heroId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ItemJoin;
};