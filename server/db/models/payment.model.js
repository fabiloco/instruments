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

	payment_type: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	card_number: {
		allowNull: false,
		type: DataTypes.INTEGER.UNSIGNED,
	},

	expiry_date: {
		allowNull: false,
		type: DataTypes.DATE,
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
