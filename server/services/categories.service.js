const boom = require('@hapi/boom');
const { models } = require('../libs/sequilize');

class CategoryService {
	constructor() {
		this.categoryModel = models.Category;
	};

	async find() {
		const categories = await this.categoryModel.findAll();
		return categories;
	};

	async findOne(id) {
		const category = await this.categoryModel.findByPk(id);
		if(!category) {
			throw boom.notFound('user not found');
		}
		return category;
	};

	async create(data) {
		const category = await this.categoryModel.create(data);
		return category.toJSON();
	};


	async update(id, changes) {
		const oldCategory = await this.findOne(id);
		const newUser = await oldCategory.update(changes);
		return newUser;
	};

	async delete(id) {
		const category = await this.findOne(id);
		await category.destroy();
		return { id, };
	};
};

module.exports = CategoryService;
