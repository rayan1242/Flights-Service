'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type: 'foreign key',
      name: 'city_fkey_constraint',
      fields: ['cityId'],
      references:{
        table:'cities',
        field:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface('Airports','city_fkey_constraint');
  }
};
