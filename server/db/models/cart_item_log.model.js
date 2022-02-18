const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { PRODUCT_TABLE } = require('./product.model');

const CART_ITEM_LOG_TABLE = 'cart_item_log';

const CartItemLogSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	quantity: {
		allowNull: false,
		type: DataTypes.INTEGER,
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

	product_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	deletedAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class CartItemLog extends Model {
	static associate() {

	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: CART_ITEM_LOG_TABLE,
			modelName: 'CartItemLog',
			timestamps: false,
		};
	};
};

module.exports = {
	CART_ITEM_LOG_TABLE,
	CartItemLogSchema,
	CartItemLog,
};
