const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');

const UserServices = require('../../../services/user.service');
const service = new UserServices();

const LocalStrategy = new Strategy(async (username, password, done) => {
	try {
		const user = await service.findByUsername(username);
		if (!user) {
			done(boom.unauthorized(), false);
		}
		if (user.password !== password) {
			done(boom.unauthorized(), false);
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
});

module.exports = LocalStrategy;
