'use strict';

const { USER_TABLE, UserSchema } = require('../models/user.model');
const { COUNTRY_TABLE, CountrySchema } = require('../models/country.model');
const { STATE_TABLE, StateSchema } = require('../models/state.model');
const { ADDRESS_TABLE, AddressSchema } = require('../models/address.model');
const { PAYMENT_TABLE, PaymentSchema } = require('../models/payment.model');
const { CART_TABLE, CartSchema } = require('../models/cart.model');
const { PAYMENT_DETAILS_TABLE, PaymentDetailsSchema } = require('../models/payment_details.model');
const { ORDER_HISTORIAL_TABLE, OrderHistorialSchema } = require('../models/order_historial.model');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { DISCOUNT_TABLE, DiscountSchema } = require('../models/discount.model');
const { INVENTORY_TABLE, InventorySchema } = require('../models/inventory.model');
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { CART_ITEM_TABLE, CartItemSchema } = require('../models/cart_item.model');
const { ORDER_ITEM_TABLE, OrderItemSchema } = require('../models/order_item.model');
const { CART_ITEM_LOG_TABLE, CartItemLogSchema } = require('../models/cart_item_log.model');
const { PRODUCT_LOG_TABLE, ProductLogSchema } = require('../models/product_log.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(COUNTRY_TABLE, CountrySchema);
		await queryInterface.createTable(STATE_TABLE, StateSchema);
		await queryInterface.createTable(ADDRESS_TABLE, AddressSchema);
		await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
		await queryInterface.createTable(CART_TABLE, CartSchema);
		await queryInterface.createTable(PAYMENT_DETAILS_TABLE, PaymentDetailsSchema);
		await queryInterface.createTable(ORDER_HISTORIAL_TABLE, OrderHistorialSchema);
		await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
		await queryInterface.createTable(DISCOUNT_TABLE, DiscountSchema);
		await queryInterface.createTable(INVENTORY_TABLE, InventorySchema);
		await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
		await queryInterface.createTable(CART_ITEM_TABLE, CartItemSchema);
		await queryInterface.createTable(ORDER_ITEM_TABLE, OrderItemSchema);
		await queryInterface.createTable(CART_ITEM_LOG_TABLE, CartItemLogSchema);
		await queryInterface.createTable(PRODUCT_LOG_TABLE, ProductLogSchema);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.drop(USER_TABLE);
		await queryInterface.drop(COUNTRY_TABLE);
		await queryInterface.drop(STATE_TABLE);
		await queryInterface.drop(ADDRESS_TABLE);
		await queryInterface.drop(PAYMENT_TABLE);
		await queryInterface.drop(CART_TABLE);
		await queryInterface.drop(PAYMENT_DETAILS_TABLE);
		await queryInterface.drop(ORDER_HISTORIAL_TABLE);
		await queryInterface.drop(DISCOUNT_TABLE);
		await queryInterface.drop(INVENTORY_TABLE);
		await queryInterface.drop(PRODUCT_TABLE);
		await queryInterface.drop(CART_ITEM_TABLE);
		await queryInterface.drop(ORDER_ITEM_TABLE);
		await queryInterface.drop(CART_ITEM_LOG_TABLE);
		await queryInterface.drop(PRODUCT_LOG_TABLE);
	},
};
