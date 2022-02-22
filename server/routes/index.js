const express = require('express');

const usersRoute = require('./users.route');
const authRoute = require('./auth.route');
const addressesRoute = require('./addresses.route');
const productsRoute = require('./products.route');
const categoriesRoute = require('./categories.route');
const cartRoute = require('./cart.route');
const cartItemsRoute = require('./cart-items.route');
const statesRoute = require('./states.route');
const countriessRoute = require('./country.route');

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
	router.use('/states', statesRoute);
	router.use('/countries', countriessRoute);
};

module.exports = { routerApi };
