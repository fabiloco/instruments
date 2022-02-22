const boom = require('@hapi/boom');
const { models } = require('../libs/sequilize');

class ProductsService {
	constructor() {
		this.usersModel = models.Product;
	};

	async find() {
		const products = await this.usersModel.findAll({
			include: ['category', 'inventory', 'discount']
		});
		return products;
	};

	async findDiscount() {
		const products = await this.usersModel.sequelize.query("SELECT * FROM product WHERE product.discount_id in (SELECT discount.id FROM discount WHERE discount.is_active = true);", {
			include: ['discount']
		});
		return products[0];
	};

	async findByCategory(categoryId) {
		const products = await this.usersModel.findAll({
			where: {
				category_id: categoryId,
			},
			include: ['category', 'inventory', 'discount']
		});
		return products;
	};

	async findOne(id) {
		const product = await this.usersModel.findByPk(id, {
			include: ['category', 'inventory', 'discount']
		});
		if(!product) {
			throw boom.notFound('product not found');
		}
		return product;
	};

	async create(data) {
		const newProduct = await this.usersModel.create(data);
		return newProduct.toJSON();
	};


	async update(id, changes) {
		const oldProduct = await this.findOne(id);
		const newProduct = await oldProduct.update(changes);
		return newProduct;
	};

	async delete(id) {
		const product = await this.findOne(id);
		await product.destroy();
		return { id, };
	};
};

module.exports = ProductsService;
