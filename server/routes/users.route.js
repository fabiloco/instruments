const express = require('express');
const multer  = require('multer');

const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/user.schema');

const UserService = require('../services/user.service');

const router = express.Router();

const service = new UserService();

// configuración de multer
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function(req, file, cb)  {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

// Get all users
router.get('/',
	async (req, res, next) => {
		try {
			const users = await service.find();
			res.json(users);
		} catch(error) {
			next(error);
		};
	}
);

// Get a user by id
router.get('/:id',
	validatorHandler(getUserSchema, 'params'),
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
	upload.single('img_profile'),
	validatorHandler(createUserSchema, 'body'),
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
	upload.single('img_profile'),
	validatorHandler(getUserSchema, 'params'),
	validatorHandler(updateUserSchema, 'body'),
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
	validatorHandler(getUserSchema, 'params'),
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
