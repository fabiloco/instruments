const boom = require('@hapi/boom');
const sequilize = require('../libs/sequilize');

class AddressService {
	constructor() {
		this.cartItemsModel = sequilize.models.CartItem;
	};

	async find() {
		const carts = await this.cartItemsModel.findAll({
			include: ['product']
		});
		return carts;
	};

	async findByCartId(cartId) {
		const carts = await this.cartItemsModel.findAll({
			where: {
				cart_id: cartId,
			},
			include: ['product']
		});
		return carts;
	};

	async findOne(id) {
		const cart = await this.cartItemsModel.findByPk(id);
		if(!cart) {
			throw boom.notFound('cart not found');
		}
		return cart;
	};

	async create(data) {
		const newCart = await this.cartItemsModel.create(data);
		return newCart.toJSON();
	};


	async update(id, changes) {
		const oldCart = await this.findOne(id);
		const newCart = await oldCart.update(changes);
		return newCart;
	};

	async delete(id) {
		const cart = await this.findOne(id);
		await cart.destroy();
		return { id, };
	};
};

module.exports = AddressService;
