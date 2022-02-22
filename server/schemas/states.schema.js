const Joi = require('joi');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(50);


const createStateSchema = Joi.object({
	name: name.required(),
	country_id: id.required(),
});

const updateStateSchema = Joi.object({
	name: name,
	country_id: id,
});

const getStateSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createStateSchema,
	updateStateSchema,
	getStateSchema,
};
