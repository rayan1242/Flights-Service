'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Airplanes',
          key:'id'
        },
        onDelete:CASCADE
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:CASCADE
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Airports',
          key:'code'
        },
        onDelete:CASCADE 
      },
      arrivalTime: {
        type: Sequelize.DATE
      },
      departureTime: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.INTEGER
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeates: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};