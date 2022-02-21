const Joi = require('joi');

const id = Joi.number().integer();

const address1 = Joi.string().min(3).max(50);

const address2 = Joi.string().min(3).max(50);

const city = Joi.string().min(3).max(50);

const postal_code = Joi.string().min(3).max(50);

const address_phone = Joi.string().min(3).max(50);

const user_phone = Joi.string().min(3).max(50);

const state_id = Joi.number().integer();

const user_id = Joi.number().integer();


const createAddressSchema = Joi.object({
	address1: address1.required(),
	address2: address2,
	city: city.required(),
	postal_code: postal_code.required(),
	address_phone: address_phone.required(),
	user_phone: user_phone.required(),
	state_id: state_id.required(),
	user_id: user_id.required(),
});

const updateAddressSchema = Joi.object({
	address1: address1,
	address2: address2,
	city: city,
	postal_code: postal_code,
	address_phone: address_phone,
	user_phone: user_phone,
	state_id: state_id,
	user_id: user_id,
});

const getAddressSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createAddressSchema,
	updateAddressSchema,
	getAddressSchema,
};
