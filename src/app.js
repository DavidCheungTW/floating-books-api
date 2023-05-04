const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).json({ result: 'Welcome to Floating Books API!' });
});

const genreRouter = require('../src/routes/genre');
const userRouter = require('../src/routes/user');
const bookRouter = require('../src/routes/book');
const favouriteRouter = require('../src/routes/favourite');
const orderRouter = require('../src/routes/order');

app.use(genreRouter);
app.use(userRouter);
app.use(bookRouter);
app.use(favouriteRouter);
app.use(orderRouter);

module.exports = app;
