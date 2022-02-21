'use strict';

const { ADDRESS_TABLE, AddressSchema } = require('../models/address.model');

module.exports = {
	async up(queryInterface, Sequelize) {

		await queryInterface.changeColumn(ADDRESS_TABLE, 'state_id', AddressSchema.state_id);

	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
