const { expect } = require('chai');
const request = require('supertest');
const { Favourite, User, Book, Genre } = require('../src/models');
const app = require('../src/app');

describe('/favourites', () => {
  let genres;
  let users;
  let books;

  before(async () => {
    await Favourite.sequelize.sync({ force: true });
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
    await Favourite.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /favourites', () => {
      it('creates a new favourite in the database', async () => {
        const response = await request(app).post('/favourites').send({
          createDate: '2023-01-31',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(201);

        const newFavouriteRecord = await Favourite.findByPk(response.body.id, {
          raw: true,
        });

        expect(newFavouriteRecord.createDate).to.equal('2023-01-31');
        expect(newFavouriteRecord.userId).to.equal(users[0].toJSON().id);
        expect(newFavouriteRecord.bookId).to.equal(books[0].toJSON().id);
      });

      it('create date must be exist', async () => {
        const response = await request(app).post('/favourites').send({
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'create date must be existed'
        );
      });

      it('create date must not be empty', async () => {
        const response = await request(app).post('/favourites').send({
          createDate: '',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'create date must not be empty'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let favourites;

    beforeEach(async () => {
      favourites = await Promise.all([
        Favourite.create({
          createDate: '2023-01-28',
          userId: users[0].toJSON().id,
          bookId: books[0].toJSON().id,
        }),
        Favourite.create({
          createDate: '2023-02-28',
          userId: users[1].toJSON().id,
          bookId: books[1].toJSON().id,
        }),
        Favourite.create({
          createDate: '2023-03-28',
          userId: users[2].toJSON().id,
          bookId: books[2].toJSON().id,
        }),
      ]);
    });

    describe('GET /favourites', () => {
      it('gets all favourites records', async () => {
        let userRow;
        let bookRow;
        const response = await request(app).get('/favourites');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        for (const favourite of response.body) {
          const expected = favourites.find((a) => a.id === favourite.id);

          expect(favourite.createDate).to.equal(expected.createDate);

          userRow = await User.findByPk(expected.userId, {
            raw: true,
          });
          bookRow = await Book.findByPk(expected.bookId, {
            raw: true,
          });

          expect(favourite.user.userName).to.equal(userRow.userName);
          expect(favourite.book.title).to.equal(bookRow.title);
        }
      });
    });

    describe('POST /favourites/search', () => {
      it('gets all favourites records with selection', async () => {
        const response = await request(app)
          .post('/favourites/search')
          .send({ createDate: '2023-02-28' });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe('GET /favourites/:id', () => {
      it('gets favourites record by id', async () => {
        const favourite = favourites[1];
        const response = await request(app).get(`/favourites/${favourite.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.createDate).to.equal(favourite.createDate);

        const userRow = await User.findByPk(response.body.userId, {
          raw: true,
        });
        const bookRow = await Book.findByPk(response.body.bookId, {
          raw: true,
        });

        expect(response.body.user.userName).to.equal(userRow.userName);
        expect(response.body.book.title).to.equal(bookRow.title);
      });

      it('returns a 404 if the favourite does not exist', async () => {
        const response = await request(app).get('/favourites/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          'The Favourites could not be found.'
        );
      });
    });

    describe('PATCH /favourites/:id', () => {
      it('updates favourite field by id', async () => {
        const favourite = favourites[1];
        const response = await request(app)
          .patch(`/favourites/${favourite.id}`)
          .send({
            createDate: '2022-12-31',
          });

        const updatedFavouriteRecord = await Favourite.findByPk(favourite.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedFavouriteRecord.createDate).to.equal('2022-12-31');
      });

      it('returns a 404 if the favourite does not exist', async () => {
        const response = await request(app).patch('/favourites/12345').send({
          createDate: '2022-12-31',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          'The Favourites could not be found.'
        );
      });

      it('create date must not be empty', async () => {
        const favourite = favourites[0];
        const response = await request(app)
          .patch(`/favourites/${favourite.id}`)
          .send({ createDate: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'create date must not be empty'
        );
      });

      it('userId must be existed in Users table', async () => {
        const favourite = favourites[1];
        const response = await request(app)
          .patch(`/favourites/${favourite.id}`)
          .send({ userId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });

      it('bookId must be existed in Books table', async () => {
        const favourite = favourites[1];
        const response = await request(app)
          .patch(`/favourites/${favourite.id}`)
          .send({ bookId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });
    });

    describe('DELETE /favourites/:id', () => {
      it('deletes favourite record by id', async () => {
        const favourite = favourites[1];
        const response = await request(app).delete(
          `/favourites/${favourite.id}`
        );

        expect(response.status).to.equal(204);

        const deletedFavourite = await Favourite.findByPk(favourite.id, {
          raw: true,
        });

        expect(deletedFavourite).to.equal(null);
      });

      it('returns a 404 if the favourite does not exist', async () => {
        const response = await request(app).delete('/favourites/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          'The Favourites could not be found.'
        );
      });
    });
  });
});
