const boom = require('@hapi/boom');
const sequilize = require('../libs/sequilize');

class AddressService {
	constructor() {
		this.cartModel = sequilize.models.Cart;
		this.sequilize = sequilize;
	};

	async startShoppingSession(idUser) {
		const cartId = await this.sequilize.query('CALL StartShoppingSession(:iduser)', {
			replacements: {
				iduser: idUser
			},
		});
		return cartId;
	};

	async addItemToCart(idProduct, idCart, quantity) {
		const cart = await this.sequilize.query('CALL addItemToTheCart(:idproduct, :idcart, :quantity)', {
			replacements: {
				idproduct: idProduct,
				idcart: idCart,
				quantity: quantity
			},
		});
		return cart;
	};

	async deleteItemFromTheCart(idProduct, idCart) {
		const cart = await this.sequilize.query('CALL deleteItemFromTheCart(:idproduct, :idcart)', {
			replacements: {
				idproduct: idProduct,
				idcart: idCart,
			},
		});
		return cart;
	};

	async endShoppingSession(idCart, message) {
		const cart = await this.sequilize.query('CALL endShoppingSession(:idcart, :message)', {
			replacements: {
				idcart: idCart,
				message: message,
			},
		});
		return cart;
	};

	async find() {
		const carts = await this.cartModel.findAll();
		return carts;
	};

	async findByUser(userId) {
		const cart = await this.cartModel.findOne({
			where: {
				user_id: userId,
			}
		});
		return cart;
	};

	async findOne(id) {
		const cart = await this.cartModel.findByPk(id);
		if(!cart) {
			throw boom.notFound('cart not found');
		}
		return cart;
	};

	async create(data) {
		const newCart = await this.cartModel.create(data);
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
