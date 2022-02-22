const express = require('express');
const multer = require('multer');

const validatorHandler = require('../middlewares/validator.handler');
const {
	getCartSchema,
	createCartSchema,
	startShoppingSessionSchema,
	updateCartSchema,
	addItemToCartSchema,
	deleteItemFromCartSchema,
	endShoppingSessionSchema
} = require('../schemas/cart.schema');

const CartService = require('../services/cart.service');

const router = express.Router();

const service = new CartService();

// start shopping session
router.post(
	'/shopping-session/:user_id',
	validatorHandler(startShoppingSessionSchema, 'params'),
	async (req, res, next) => {
		try {
			const cart = await service.startShoppingSession(req.params.user_id);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
);

// get shopping session by user id
router.get(
	'/shopping-session/:user_id',
	validatorHandler(startShoppingSessionSchema, 'params'),
	async (req, res, next) => {
		try {
			console.log("hello");
			const cart = await service.findByUser(req.params.user_id);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
);

// Get add item to cart
router.post(
	'/add-item',
	validatorHandler(addItemToCartSchema, 'body'),
	async (req, res, next) => {
		try {
			const cart = await service.addItemToCart(
				req.body.idproduct,
				req.body.idcart,
				req.body.quantity
			);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
);

// delete item from the cart
router.post(
	'/remove-item',
	validatorHandler(deleteItemFromCartSchema, 'body'),
	async (req, res, next) => {
		try {
			const cart = await service.deleteItemFromTheCart(
				req.body.idproduct,
				req.body.idcart
			);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
);

// end shopping session
router.post(
	'/end-shopping',
	validatorHandler(endShoppingSessionSchema, 'body'),
	async (req, res, next) => {
		try {
			const cart = await service.endShoppingSession(
				req.body.idcart,
				req.body.message,
			);
			res.json(cart);
		} catch (error) {
			next(error);
		}
	}
);

// Get all cart
router.get('/', async (req, res, next) => {
	try {
		const cart = await service.find();
		res.json(cart);
	} catch (error) {
		next(error);
	}
});

// Get a cart by user id
router.get('/', async (req, res, next) => {
	try {
		const cart = await service.find();
		res.json(cart);
	} catch (error) {
		next(error);
	}
});

// Get a user by id
router.get(
	'/:id',
	validatorHandler(getCartSchema, 'params'),
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
	validatorHandler(createCartSchema, 'body'),
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
	validatorHandler(getCartSchema, 'params'),
	validatorHandler(updateCartSchema, 'body'),
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
	validatorHandler(getCartSchema, 'params'),
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
