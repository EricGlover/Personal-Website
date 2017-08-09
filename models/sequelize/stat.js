'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define('Stat', {
    health: DataTypes.INTEGER,
    mana: DataTypes.INTEGER,
    armor: DataTypes.INTEGER,
    mr: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    attackId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Stat;
};