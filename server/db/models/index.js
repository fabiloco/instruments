// const { Book, BookSchema } = require('./book.model');

const { User, UserSchema } = require('./user.model');

const { Country, CountrySchema } = require('./country.model');
const { State, StateSchema } = require('./state.model');
const { Address, AddressSchema } = require('./address.model');
const { Payment, PaymentSchema } = require('./payment.model');
const { Cart, CartSchema } = require('./cart.model');
const { PaymentDetails, PaymentDetailsSchema } = require('./payment_details.model');
const { OrderHistorial, OrderHistorialSchema } = require('./order_historial.model');
const { Category, CategorySchema } = require('./category.model');
const { Discount, DiscountSchema } = require('./discount.model');
const { Inventory, InventorySchema } = require('./inventory.model');
const { Product, ProductSchema } = require('./product.model');
const { CartItem, CartItemSchema } = require('./cart_item.model');
const { OrderItem, OrderItemSchema } = require('./order_item.model');
const { CartItemLog, CartItemLogSchema } = require('./cart_item_log.model');
const { ProductLog, ProductLogSchema } = require('./product_log.model');

const setupModels = (sequilize) => {
	// Book.init(BookSchema, Book.config(sequilize));
	User.init(UserSchema, User.config(sequilize));

	Country.init(CountrySchema, Country.config(sequilize));
	State.init(StateSchema, State.config(sequilize));
	Address.init(AddressSchema, Address.config(sequilize));
	Payment.init(PaymentSchema, Payment.config(sequilize));
	Cart.init(CartSchema, Cart.config(sequilize));
	PaymentDetails.init(PaymentDetailsSchema, PaymentDetails.config(sequilize));
	OrderHistorial.init(OrderHistorialSchema, OrderHistorial.config(sequilize));
	Category.init(CategorySchema, Category.config(sequilize));
	Discount.init(DiscountSchema, Discount.config(sequilize));
	Inventory.init(InventorySchema, Inventory.config(sequilize));
	Product.init(ProductSchema, Product.config(sequilize));
	CartItem.init(CartItemSchema, CartItem.config(sequilize));
	OrderItem.init(OrderItemSchema, OrderItem.config(sequilize));
	CartItemLog.init(CartItemLogSchema, CartItemLog.config(sequilize));
	ProductLog.init(ProductLogSchema, ProductLog.config(sequilize));

	Country.associate(sequilize.models);
	State.associate(sequilize.models);
	User.associate(sequilize.models);
	Category.associate(sequilize.models);
	Discount.associate(sequilize.models);
	Inventory.associate(sequilize.models);
	Cart.associate(sequilize.models);
	Product.associate(sequilize.models);
	OrderHistorial.associate(sequilize.models);
};

module.exports = { setupModels };
