const Joi = require('joi');

const id = Joi.number().integer();

const user_name = Joi.string().min(3).max(50);

const password = Joi.string().min(3).max(50);

const first_name1 = Joi.string().min(3).max(50);

const first_name2 = Joi.string().min(3).max(50);

const last_name1 = Joi.string().min(3).max(50);

const last_name2 = Joi.string().min(3).max(50);

const email = Joi.string().email();

const img_profile = Joi.string().uri();

const phone = Joi.string().min(3).max(50);


const createUserSchema = Joi.object({
	user_name: user_name.required(),
	password: password.required(),
	first_name1: first_name1.required(),
	first_name2: first_name2,
	last_name1: last_name1.required(),
	last_name2: last_name2,
	email: email.required(),
	img_profile: img_profile,
	phone: phone.required(),
});

const updateUserSchema = Joi.object({
	user_name: user_name,
	password: password,
	first_name1: first_name1,
	first_name2: first_name2,
	last_name1: last_name1,
	last_name2: last_name2,
	email: email,
	img_profile: img_profile,
	phone: phone,
});

const getUserSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
