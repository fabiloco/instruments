const express = require('express');
const multer = require('multer');

const validatorHandler = require('../middlewares/validator.handler');
const {
	createCategorySchema,
	getCategoryByCategoryIdSchema,
	getCategorySchema,
	updateCategorySchema,
} = require('../schemas/products.schema');

const ProductsService = require('../services/products.service');

const router = express.Router();

const service = new ProductsService();

// Get all products
router.get(
	'/',
	async (req, res, next) => {
		try {
			const products = await service.find();
			res.json(products);
		} catch (error) {
			next(error);
		}
	}
);

// Get all products with discount
router.get(
	'/discount',
	async (req, res, next) => {
		try {
			const products = await service.findDiscount();
			res.json(products);
		} catch (error) {
			next(error);
		}
	}
);


// get all products by category id
router.get(
	'/by-category/:category_id',
	validatorHandler(getCategoryByCategoryIdSchema, 'params'),
	async (req, res, next) => {
		try {
			const products = await service.findByCategory(req.params.category_id);
			res.json(products);
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
			const product = await service.findOne(id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

// Create a product
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
