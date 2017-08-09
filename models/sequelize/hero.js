'use strict';
module.exports = function(sequelize, DataTypes) {
  var Hero = sequelize.define('Hero', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    bio: DataTypes.TEXT,
    hometown: DataTypes.STRING,
    favoriteQuote: DataTypes.STRING,
    lvl: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    statId: DataTypes.INTEGER,
    attackId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Hero;
};