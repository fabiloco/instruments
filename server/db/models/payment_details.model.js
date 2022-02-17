const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const PAYMENT_DETAILS_TABLE = 'payment_details';

const PaymentDetailsSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	total_amount: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	bank: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	state: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class PaymentDetails extends Model {
	static associate(models) {
		this.hasOne(models.OrderHistorial, {
			as: 'payment_details_id',
			foreignKey: 'user_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: PAYMENT_DETAILS_TABLE,
			modelName: 'PaymentDetails',
			timestamps: false,
		};
	};
};

module.exports = {
	PAYMENT_DETAILS_TABLE,
	PaymentDetailsSchema,
	PaymentDetails,
};
