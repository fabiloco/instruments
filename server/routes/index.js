const express = require('express');

const usersRoute = require('./users.route');
const authRoute = require('./auth.route');
const addressesRoute = require('./addresses.route');
const productsRoute = require('./products.route');
const categoriesRoute = require('./categories.route');

const routerApi = (app) => {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/auth', authRoute);
	router.use('/user', usersRoute);
	router.use('/address', addressesRoute);
	router.use('/products', productsRoute);
	router.use('/categories', categoriesRoute);
};

module.exports = { routerApi };
