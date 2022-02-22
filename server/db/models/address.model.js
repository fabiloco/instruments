const { Model, DataTypes, Sequelize } = require('sequelize');

const { STATE_TABLE } = require('./state.model');
const { USER_TABLE } = require('./user.model');

const ADDRESS_TABLE = 'address';

const AddressSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	address1: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	address2: {
		allowNull: true,
		type: DataTypes.STRING(50),
	},

	city: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	postal_code: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	address_phone: {
		allowNull: true,
		type: DataTypes.STRING(50),
	},

	user_phone: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	state_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: STATE_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
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
};

class Address extends Model {
	static associate(models) {
		this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
		this.belongsTo(models.State, { as: 'state', foreignKey: 'state_id' });
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: ADDRESS_TABLE,
			modelName: 'Address',
			timestamps: false,
		};
	};
};

module.exports = {
	ADDRESS_TABLE,
	AddressSchema,
	Address,
};
