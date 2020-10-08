'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description:{
        type:Sequelize.STRING,
        allowNull: false
      },
      notation:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      admin_id:{
        type: Sequelize.INTEGER,
         references: {model: 'users', key: 'id'},
         onUpdate: 'CASCADE',
         onDelete: 'SET NULL',
         allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('movies');
  },
};

