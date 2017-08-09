"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Monsters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      lvl: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      difficultyRating: {
        type: Sequelize.INTEGER
      },
      dropItemId: {
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
    return queryInterface.dropTable("Monsters");
  }
};
