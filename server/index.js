const express = require('express');

const { routerApi } = require('./routes');

const {
	logErrors,
	errorHandler,
	boomErrorHandler,
	ormErrorHandler,
} = require('./middlewares/error.handler');

const cors = require('cors');
const { config } = require('./config/config');

// Configuraciones
const app = express();

// // Access whitelist
// const whitelist = ['http://localhost:3000'];

// CORS options
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('No permitido'));
		}
	},
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors(options));
app.use(cors());

app.use('/uploads', express.static('uploads'));

// authentication
require('./utils/auth');

// Routes
routerApi(app);

// Middlewares
app.use(logErrors);
// app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () => {
	console.log(`Server listening in http://localhost:${config.port}`);
});
