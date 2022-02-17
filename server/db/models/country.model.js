const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = 'country';

const CountrySchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	name: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},
};

class Country extends Model {
	static associate(models) {
		this.hasMany(models.State, {
			as: 'states',
			foreignKey: 'country_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: COUNTRY_TABLE,
			modelName: 'Country',
			timestamps: false,
		};
	};
};

module.exports = {
	COUNTRY_TABLE,
	CountrySchema,
	Country,
};
