const Joi = require('joi');

const id = Joi.number().integer();

const quantity = Joi.number().integer();

const total_amount = Joi.number();

const message = Joi.string().min(3).max(50);

const createCartSchema = Joi.object({
	id: id.required(),
	user_id: id.required(),
	total_amount: total_amount.required(),
});

const updateCartSchema = Joi.object({
	id: id,
	user_id: id,
	total_amount: total_amount,
});

const getCartSchema = Joi.object({
	id: id.required(),
});

const startShoppingSessionSchema = Joi.object({
	user_id: id.required(),
});

const addItemToCartSchema = Joi.object({
	idproduct: id.required(),
	idcart: id.required(),
	quantity: quantity.required(),
});

const deleteItemFromCartSchema = Joi.object({
	idproduct: id.required(),
	idcart: id.required(),
});

const endShoppingSessionSchema = Joi.object({
	idcart: id.required(),
	message: message,
});

module.exports = {
	createCartSchema,
	updateCartSchema,
	getCartSchema,
	startShoppingSessionSchema,
	addItemToCartSchema,
	deleteItemFromCartSchema,
	endShoppingSessionSchema,
};
