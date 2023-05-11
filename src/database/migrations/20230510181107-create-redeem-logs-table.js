'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('RedeemLogs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      codeInput: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      success: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      ticketId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('RedeemLogs');
  },
};
