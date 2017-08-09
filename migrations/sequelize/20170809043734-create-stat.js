"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Stats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      health: {
        type: Sequelize.INTEGER
      },
      mana: {
        type: Sequelize.INTEGER
      },
      armor: {
        type: Sequelize.INTEGER
      },
      mr: {
        type: Sequelize.INTEGER
      },
      strength: {
        type: Sequelize.INTEGER
      },
      intelligence: {
        type: Sequelize.INTEGER
      },
      dexterity: {
        type: Sequelize.INTEGER
      },
      attackId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("Stats");
  }
};
