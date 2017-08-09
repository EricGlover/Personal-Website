"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Heros", {
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
      hometown: {
        type: Sequelize.STRING
      },
      favoriteQuote: {
        type: Sequelize.STRING
      },
      lvl: {
        type: Sequelize.INTEGER
      },
      xp: {
        type: Sequelize.INTEGER
      },
      classId: {
        type: Sequelize.INTEGER
      },
      statId: {
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
    return queryInterface.dropTable("Heros");
  }
};
