const { Model, DataTypes, Sequelize } = require('sequelize');

const { CART_TABLE } = require('./cart.model');
const { PRODUCT_TABLE } = require('./product.model');

const CART_ITEM_TABLE = 'cart_item';

const CartItemSchema = {
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

	cart_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CART_TABLE,
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

class CartItem extends Model {
	static associate() {

	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: CART_ITEM_TABLE,
			modelName: 'CartItem',
			timestamps: false,
		};
	};
};

module.exports = {
	CART_ITEM_TABLE,
	CartItemSchema,
	CartItem,
};
