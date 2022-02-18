const { Model, DataTypes, Sequelize } = require('sequelize');

const INVENTORY_TABLE = 'inventory';

const InventorySchema = {
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

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class Inventory extends Model {
	static associate(models) {
		this.hasOne(models.Product, {
			as: 'product',
			foreignKey: 'inventory_id'
		});

		this.hasMany(models.ProductLog, {
			as: 'product_log',
			foreignKey: 'inventory_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: INVENTORY_TABLE,
			modelName: 'Inventory',
			timestamps: false,
		};
	};
};

module.exports = {
	INVENTORY_TABLE,
	InventorySchema,
	Inventory,
};
