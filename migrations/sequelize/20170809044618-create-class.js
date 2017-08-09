"use strict";
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("Classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      className: {
        type: Sequelize.STRING
      },
      statId: {
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
    return queryInterface.dropTable("Classes");
  }
};
