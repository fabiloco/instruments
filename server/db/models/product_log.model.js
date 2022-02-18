const { Model, DataTypes, Sequelize } = require('sequelize');

const { DISCOUNT_TABLE } = require('./discount.model');
const { INVENTORY_TABLE } = require('./inventory.model');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_LOG_TABLE = 'product_log';

const ProductLogSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	discount_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: DISCOUNT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	inventory_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: INVENTORY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	category_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		unique: true,
		references: {
			model: CATEGORY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},

	name: {
		allowNull: false,
		type: DataTypes.STRING(100),
	},

	description: {
		allowNull: false,
		type: DataTypes.TEXT,
	},

	SKU: {
		allowNull: false,
		type: DataTypes.STRING(255),
	},

	price: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	img_url: {
		allowNull: false,
		type: DataTypes.STRING(255),
	},

	deletedAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class ProductLog extends Model {
	static associate(models) {
		this.hasMany(models.CartItem, {
			as: 'cart_item',
			foreignKey: 'product_id'
		});

		this.hasMany(models.OrderItem, {
			as: 'order_item',
			foreignKey: 'product_id'
		});

		this.hasMany(models.CartItemLog, {
			as: 'cart_item_log',
			foreignKey: 'product_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_LOG_TABLE,
			modelName: 'ProductLog',
			timestamps: false,
		};
	};
};

module.exports = {
	PRODUCT_LOG_TABLE,
	ProductLogSchema,
	ProductLog,
};
