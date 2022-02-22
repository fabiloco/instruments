const Joi = require('joi');

const id = Joi.number().integer();

const quantity = Joi.number().integer();

const createCartItemSchema = Joi.object({
	id: id.required(),
	quantity: quantity.required(),
	cart_id: id.required(),
	product_id: id.required(),
});

const updateCartItemSchema = Joi.object({
	id: id,
	quantity: quantity,
	cart_id: id,
	product_id: id,
});

const getCartItemByCartIdSchema = Joi.object({
	cart_id: id,
});

const getCartItemSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCartItemSchema,
	updateCartItemSchema,
	getCartItemSchema,
	getCartItemByCartIdSchema
};
