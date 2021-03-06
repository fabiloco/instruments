const express = require('express');
const multer  = require('multer');

const validatorHandler = require('../middlewares/validator.handler');
const { createCartItemSchema, getCartItemByCartIdSchema, getCartItemSchema, updateCartItemSchema } = require('../schemas/cart-items.schema');

const CartItemsService = require('../services/cart-items.service');

const router = express.Router();

const service = new CartItemsService();


// Get all cart-.items
router.get('/',
	async (req, res, next) => {
		try {
			const addresses = await service.find();
			res.json(addresses);
		} catch(error) {
			next(error);
		};
	}
);

// Get cart-items by cart_id

router.get('/by-cart-id/:cart_id',
	validatorHandler(getCartItemByCartIdSchema, 'params'),
	async (req, res, next) => {
		try {
			const addresses = await service.findByCartId(req.params.cart_id);
			res.json(addresses);
		} catch(error) {
			next(error);
		};
	}
);

// Get a user by id
router.get('/:id',
	validatorHandler(getCartItemSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch(error) {
			next(error);
		};
	},
);

// Create a user
router.post('/',
	validatorHandler(createCartItemSchema, 'body'),
	async (req, res, next) => {
		try {
			const { body } = req;
			if(req.file) body.img_profile = req.file.path;
			const newUser = await service.create(body);
			res.json(newUser);
		}catch(error) {
			next(error);
		};
	},
);

// Update a user
router.patch('/:id',
	validatorHandler(getCartItemSchema, 'params'),
	validatorHandler(updateCartItemSchema, 'body'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			if(req.file) body.img_profile = req.file.path;
			const updatedUser = await service.update(id, body);
			res.json(updatedUser);
		}catch(error) {
			next(error);
		};
	},
);

// Delete a user
router.delete('/:id',
	validatorHandler(getCartItemSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			await service.delete(id);
			res.status(201).json({ id });
		}catch(error) {
			next(error);
		};
	},
);

module.exports = router;
