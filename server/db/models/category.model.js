const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
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

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Product, {
			as: 'product',
			foreignKey: 'category_id'
		});

		this.hasMany(models.ProductLog, {
			as: 'product_log',
			foreignKey: 'category_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: CATEGORY_TABLE,
			modelName: 'Category',
			timestamps: false,
		};
	};
};

module.exports = {
	CATEGORY_TABLE,
	CategorySchema,
	Category,
};
