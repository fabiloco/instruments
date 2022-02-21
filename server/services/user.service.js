const boom = require('@hapi/boom');
const { models } = require('../libs/sequilize');

class UserService {
	constructor() {
		this.usersModel = models.User;
	};

	async find() {
		const users = await this.usersModel.findAll({
			include: ['address']
		});
		return users;
	};

	async findOne(id) {
		const user = await this.usersModel.findByPk(id);
		if(!user) {
			throw boom.notFound('user not found');
		}
		return user;
	};

	async create(data) {
		const newUser = await this.usersModel.create(data);
		return newUser.toJSON();
	};


	async update(id, changes) {
		const oldUser = await this.findOne(id);
		const newUser = await oldUser.update(changes);
		return newUser;
	};

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id, };
	};
};

module.exports = UserService;
