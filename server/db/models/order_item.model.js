const { Model, DataTypes, Sequelize } = require('sequelize');


const { PRODUCT_TABLE } = require('./product.model');
const { ORDER_HISTORIAL_TABLE } = require('./order_historial.model');

const ORDER_ITEM_TABLE = 'order_item';

const OrderItemSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	order_historial_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: ORDER_HISTORIAL_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	product_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class OrderItem extends Model {
	static associate() {

	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_ITEM_TABLE,
			modelName: 'OrderItem',
			timestamps: false,
		};
	};
};

module.exports = {
	ORDER_ITEM_TABLE,
	OrderItemSchema,
	OrderItem,
};
