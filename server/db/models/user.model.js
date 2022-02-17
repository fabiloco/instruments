const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	user_name: {
		allowNull: false,
		unique: true,
		type: DataTypes.STRING(50),
	},

	password: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	first_name1: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	first_name2: {
		allowNull: true,
		type: DataTypes.STRING(50),
	},

	last_name1: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	last_name2: {
		allowNull: true,
		type: DataTypes.STRING(50),
	},

	email: {
		allowNull: false,
		unique: true,
		type: DataTypes.STRING(255),
	},

	img_profile: {
		allowNull: true,
		type: DataTypes.STRING(255),
	},

	phone: {
		allowNull: false,
		type: DataTypes.STRING(50),
	},

	createdAt: {
		allowNull: true,
		field: 'created_at',
		defaultValue: Sequelize.NOW,
		type: DataTypes.DATE,
	},
};

class User extends Model {
	static associate(models) {
		this.hasOne(models.Address, {
			as: 'address',
			foreignKey: 'user_id'
		});

		this.hasMany(models.Payment, {
			as: 'payments',
			foreignKey: 'user_id'
		});

		this.hasOne(models.Cart, {
			as: 'cart',
			foreignKey: 'user_id'
		});

		this.hasOne(models.OrderHistorial, {
			as: 'order_historial',
			foreignKey: 'user_id'
		});
	};

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			timestamps: false,
		};
	};
};

module.exports = {
	USER_TABLE,
	UserSchema,
	User,
};
