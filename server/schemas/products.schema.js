const Joi = require('joi');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(50);

const description = Joi.string().min(3);

const SKU = Joi.string().min(3).max(255);

const price = Joi.number().min(0).positive();

const img_url = Joi.string().min(3).max(255);

const createCategorySchema = Joi.object({
	name: name.required(),
	description: description.required(),
	SKU: SKU.required(),
	price: price.required(),
	img_url: img_url,
});

const updateCategorySchema = Joi.object({
	name: name,
	description: description,
	SKU: SKU,
	price: price,
	img_url: img_url,
});

const getCategoryByCategoryIdSchema = Joi.object({
	category_id: id.required(),
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
	getCategoryByCategoryIdSchema
};
