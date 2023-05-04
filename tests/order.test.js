const { expect } = require('chai');
const request = require('supertest');
const { Order, User, Book, Genre } = require('../src/models');
const app = require('../src/app');

describe('/orders', () => {
  let genres;
  let users;
  let books;

  before(async () => {
    await Order.sequelize.sync({ force: true });
  });

  before(async () => {
    genres = await Promise.all([
      Genre.create({
        genre: 'genre001',
      }),
      Genre.create({
        genre: 'genre002',
      }),
      Genre.create({
        genre: 'genre003',
      }),
    ]);
  });

  before(async () => {
    users = await Promise.all([
      User.create({
        firstName: 'first name 001',
        lastName: 'last name 001',
        userName: 'email001@gmail.com',
        emailVerified: true,
        postalAddress: 'postal address 001',
      }),
      User.create({
        firstName: 'first name 002',
        lastName: 'last name 002',
        userName: 'email002@gmail.com',
        emailVerified: true,
        postalAddress: 'postal address 002',
      }),
      User.create({
        firstName: 'first name 003',
        lastName: 'last name 003',
        userName: 'email003@gmail.com',
        emailVerified: true,
        postalAddress: 'postal address 003',
      }),
    ]);
  });

  before(async () => {
    books = await Promise.all([
      Book.create({
        title: 'title001',
        ISBN: 'isbn001',
        author: 'author001',
        releaseDate: '2023-01-31',
        image: '',
        donatorcomment: '',
        donateDate: '2023-01-31',
        genreId: genres[0].toJSON().id,
        donatorId: users[0].toJSON().id,
        ownerId: users[0].toJSON().id,
      }),
      Book.create({
        title: 'title002',
        ISBN: 'isbn002',
        author: 'author002',
        releaseDate: '2023-02-28',
        image: '',
        donatorcomment: '',
        donateDate: '2023-02-28',
        genreId: genres[1].toJSON().id,
        donatorId: users[1].toJSON().id,
        ownerId: users[1].toJSON().id,
      }),
      Book.create({
        title: 'title003',
        ISBN: 'isbn003',
        author: 'author003',
        releaseDate: '2023-03-31',
        image: '',
        donatorcomment: '',
        donateDate: '2023-03-31',
        genreId: genres[2].toJSON().id,
        donatorId: users[2].toJSON().id,
        ownerId: users[2].toJSON().id,
      }),
    ]);
  });

  beforeEach(async () => {
    await Order.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /orders', () => {
      it('creates a new order in the database', async () => {
        const response = await request(app).post('/orders').send({
          orderDate: '2023-02-28',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(201);

        const newOrderRecord = await Order.findByPk(response.body.id, {
          raw: true,
        });

        expect(newOrderRecord.orderDate).to.equal('2023-02-28');
        expect(newOrderRecord.userId).to.equal(users[0].toJSON().id);
        expect(newOrderRecord.bookId).to.equal(books[0].toJSON().id);
      });

      it('order date must be exist', async () => {
        const response = await request(app).post('/orders').send({
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'order date must be existed'
        );
      });

      it('order date must not be empty', async () => {
        const response = await request(app).post('/orders').send({
          orderDate: '',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'order date must not be empty'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let orders;

    beforeEach(async () => {
      orders = await Promise.all([
        Order.create({
          orderDate: '2023-02-28',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        }),
        Order.create({
          orderDate: '2023-03-28',
          userId: users[1].toJSON().id,
          bookId: books[1].toJSON().id,
        }),
        Order.create({
          orderDate: '2023-04-28',
          userId: users[2].toJSON().id,
          bookId: books[2].toJSON().id,
        }),
      ]);
    });

    describe('GET /orders', () => {
      it('gets all orders records', async () => {
        let userRow;
        let bookRow;
        const response = await request(app).get('/orders');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        for (const order of response.body) {
          const expected = orders.find((a) => a.id === order.id);

          expect(order.orderDate).to.equal(expected.orderDate);

          userRow = await User.findByPk(expected.userId, {
            raw: true,
          });
          bookRow = await Book.findByPk(expected.bookId, {
            raw: true,
          });

          expect(order.user.userName).to.equal(userRow.userName);
          expect(order.book.title).to.equal(bookRow.title);
        }
      });
    });

    describe('POST /orders/search', () => {
      it('gets all orders records with selection', async () => {
        const response = await request(app)
          .post('/orders/search')
          .send({ orderDate: '2023-03-28' });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe('GET /orders/:id', () => {
      it('gets orders record by id', async () => {
        const order = orders[1];
        const response = await request(app).get(`/orders/${order.id}`);

        expect(response.status).to.equal(200);

        userRow = await User.findByPk(response.body.userId, {
          raw: true,
        });
        bookRow = await Book.findByPk(response.body.bookId, {
          raw: true,
        });

        expect(response.body.orderDate).to.equal(order.orderDate);
        expect(response.body.user.userName).to.equal(userRow.userName);
        expect(response.body.book.title).to.equal(bookRow.title);
      });

      it('returns a 404 if the order does not exist', async () => {
        const response = await request(app).get('/orders/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Orders could not be found.');
      });
    });

    describe('PATCH /orders/:id', () => {
      it('updates order field by id', async () => {
        const order = orders[1];
        const response = await request(app).patch(`/orders/${order.id}`).send({
          orderDate: '2022-12-31',
        });

        const updatedOrderRecord = await Order.findByPk(order.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedOrderRecord.orderDate).to.equal('2022-12-31');
      });

      it('returns a 404 if the order does not exist', async () => {
        const response = await request(app).patch('/orders/12345').send({
          orderDate: '2022-12-31',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Orders could not be found.');
      });

      it('order date must not be empty', async () => {
        const order = orders[0];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ orderDate: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'order date must not be empty'
        );
      });

      it('userId must be existed in Users table', async () => {
        const order = orders[1];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ userId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });

      it('bookId must be existed in Books table', async () => {
        const order = orders[1];
        const response = await request(app)
          .patch(`/orders/${order.id}`)
          .send({ bookId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });
    });

    describe('DELETE /orders/:id', () => {
      it('deletes order record by id', async () => {
        const order = orders[1];
        const response = await request(app).delete(`/orders/${order.id}`);

        expect(response.status).to.equal(204);

        const deletedOrder = await Order.findByPk(order.id, {
          raw: true,
        });

        expect(deletedOrder).to.equal(null);
      });

      it('returns a 404 if the order does not exist', async () => {
        const response = await request(app).delete('/orders/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Orders could not be found.');
      });
    });
  });
});
