const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { PAYMENT_DETAILS_TABLE } = require('./payment_details.model');

const ORDER_HISTORIAL_TABLE = 'order_historial';

const OrderHistorialSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	payment_details_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: PAYMENT_DETAILS_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
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

	total: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class OrderHistorial extends Model {
	static associate(models) {
		this.hasMany(models.OrderItem, {
			as: 'order_item',
			foreignKey: 'order_historial_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_HISTORIAL_TABLE,
			modelName: 'OrderHistorial',
			timestamps: false,
		};
	};
};

module.exports = {
	ORDER_HISTORIAL_TABLE,
	OrderHistorialSchema,
	OrderHistorial,
};
