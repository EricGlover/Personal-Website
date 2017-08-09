'use strict';
module.exports = function(sequelize, DataTypes) {
  var Monster = sequelize.define('Monster', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    bio: DataTypes.TEXT,
    lvl: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    difficultyRating: DataTypes.INTEGER,
    dropItemId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Monster;
};