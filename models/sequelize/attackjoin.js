'use strict';
module.exports = function(sequelize, DataTypes) {
  var AttackJoin = sequelize.define('AttackJoin', {
    entityId: DataTypes.INTEGER,
    attackId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AttackJoin;
};