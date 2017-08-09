'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    rarity: DataTypes.INTEGER,
    kind: DataTypes.STRING,
    statId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Item;
};