const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// ------ Configure firebase admin ------
const admin = require('firebase-admin');
const serviceAccount = require('../cert.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ------ Configure swagger docs ------
const options = {
  swaggerDefinition: {
    info: {
      title: 'Floating Books API',
      version: '1.0.0',
      description: 'Backend API for Floating Books app',
    },
  },
  apis: [path.join(__dirname, '/routes/*.js')],
};
const swaggerSpecs = swaggerJsdoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).json({ result: 'Welcome to Floating Books API!' });
});

const genreRouter = require('../src/routes/genre');
const userRouter = require('../src/routes/user');
const bookRouter = require('../src/routes/book');
const favouriteRouter = require('../src/routes/favourite');
const orderRouter = require('../src/routes/order');
const emailRouter = require('../src/routes/email');

app.use(genreRouter);
app.use(userRouter);
app.use(bookRouter);
app.use(favouriteRouter);
app.use(orderRouter);
app.use(emailRouter);

module.exports = app;
