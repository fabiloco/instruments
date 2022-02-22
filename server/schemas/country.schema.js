const Joi = require('joi');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(50);


const createCountrySchema = Joi.object({
	name: name.required(),
});

const updateCountrySchema = Joi.object({
	name: name,
});

const getCountrySchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCountrySchema,
	updateCountrySchema,
	getCountrySchema,
};
