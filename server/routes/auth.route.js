const express = require('express');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('../services/user.service');

const router = express.Router();

const service = new UserService();

// Create a user
router.post('/login',
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
			};
			const token = jwt.sign(payload, config.secret);
			res.json({
				user: req.user,
				token,
			});
		}catch(error) {
			next(error);
		};
	},
);

// is auth
router.get('/',
	async (req, res, next) => {
		try {
			const token = req.headers.authorization.substring(7);
			const payload = jwt.verify(token, config.secret);
			const userId = payload.sub;

			const user = await service.findOne(userId);

			res.json({ user, });
		}catch(error) {
			next(error);
		};
	},
);

module.exports = router;
