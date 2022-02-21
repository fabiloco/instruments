const express = require('express');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const router = express.Router();

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

module.exports = router;
