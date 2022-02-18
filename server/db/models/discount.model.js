const { Model, DataTypes, Sequelize } = require('sequelize');

const DISCOUNT_TABLE = 'discount';

const DiscountSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	name: {
		allowNull: false,
		unique: true,
		type: DataTypes.STRING(50),
	},

	description: {
		allowNull: false,
		type: DataTypes.TEXT,
	},

	percent: {
		allowNull: false,
		type: DataTypes.FLOAT,
	},

	is_active: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
	},

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class Discount extends Model {
	static associate(models) {
		this.hasMany(models.Product, {
			as: 'product',
			foreignKey: 'discount_id'
		});

		this.hasMany(models.ProductLog, {
			as: 'product_log',
			foreignKey: 'discount_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: DISCOUNT_TABLE,
			modelName: 'Discount',
			timestamps: false,
		};
	};
};

module.exports = {
	DISCOUNT_TABLE,
	DiscountSchema,
	Discount,
};
