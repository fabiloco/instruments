const express = require('express');

const usersRoute = require('./users.route');
const authRoute = require('./auth.route');
const addressesRoute = require('./addresses.route');
const productsRoute = require('./products.route');
const categoriesRoute = require('./categories.route');
const cartRoute = require('./cart.route');
const cartItemsRoute = require('./cart-items.route');

const routerApi = (app) => {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/auth', authRoute);
	router.use('/user', usersRoute);
	router.use('/address', addressesRoute);
	router.use('/products', productsRoute);
	router.use('/categories', categoriesRoute);
	router.use('/cart', cartRoute);
	router.use('/cart-item', cartItemsRoute);
};

module.exports = { routerApi };
