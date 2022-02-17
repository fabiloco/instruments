// const { Book, BookSchema } = require('./book.model');

const { User, UserSchema } = require('./user.model');

const { Country, CountrySchema } = require('./country.model');
const { State, StateSchema } = require('./state.model');
const { Address, AddressSchema } = require('./address.model');
const { Payment, PaymentSchema } = require('./payment.model');
const { Cart, CartSchema } = require('./cart.model');
const { PaymentDetails, PaymentDetailsSchema } = require('./payment_details.model');
const { OrderHistorial, OrderHistorialSchema } = require('./order_historial.model');

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

	Country.associate(sequilize.models);
	State.associate(sequilize.models);
	User.associate(sequilize.models);
};

module.exports = { setupModels };
