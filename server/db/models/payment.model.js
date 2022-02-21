const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const PAYMENT_TABLE = 'payment';

const PaymentSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	bank: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	payment_type: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	card_number: {
		allowNull: false,
		type: DataTypes.STRING(255),
	},

	expiry_date: {
		allowNull: false,
		type: DataTypes.STRING(10),
	},

	user_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: USER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},
};

class Payment extends Model {
	static associate() {

	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: PAYMENT_TABLE,
			modelName: 'Payment',
			timestamps: false,
		};
	};
};

module.exports = {
	PAYMENT_TABLE,
	PaymentSchema,
	Payment,
};
