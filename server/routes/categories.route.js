const express = require('express');
const multer = require('multer');

const validatorHandler = require('../middlewares/validator.handler');
const {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} = require('../schemas/categories.schema');

const CategoryService = require('../services/categories.service');

const router = express.Router();

const service = new CategoryService();

// Get all addresses
router.get(
	'/',
	async (req, res, next) => {
		try {
			const addresses = await service.find();
			res.json(addresses);
		} catch (error) {
			next(error);
		}
	}
);

// Get a user by id
router.get(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
);

// Create a user
router.post(
	'/',
	validatorHandler(createCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const { body } = req;
			if (req.file) body.img_profile = req.file.path;
			const newUser = await service.create(body);
			res.json(newUser);
		} catch (error) {
			next(error);
		}
	}
);

// Update a user
router.patch(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	validatorHandler(updateCategorySchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			if (req.file) body.img_profile = req.file.path;
			const updatedUser = await service.update(id, body);
			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}
);

// Delete a user
router.delete(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await service.delete(id);
			res.status(201).json({ id });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
