const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CART_TABLE = 'cart';

const CartSchema = {
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

	user_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: USER_TABLE,
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

class Cart extends Model {
	static associate() {

	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: CART_TABLE,
			modelName: 'Cart',
			timestamps: false,
		};
	};
};

module.exports = {
	CART_TABLE,
	CartSchema,
	Cart,
};
