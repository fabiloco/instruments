const { Model, DataTypes, Sequelize } = require('sequelize');

const COUNTRY_TABLE = require('./country.model');

const STATE_TABLE = 'state';

const StateSchema = {
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

	country_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: COUNTRY_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
	},
};

class State extends Model {
	static associate(models) {
		this.hasMany(models.Address, {
			as: 'address',
			foreignKey: 'state_id',
		});

		this.belongsTo(models.Country, { foreignKey: 'country_id' });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: STATE_TABLE,
			modelName: 'State',
			timestamps: false,
		};
	}
}

module.exports = {
	STATE_TABLE,
	StateSchema,
	State,
};
