const { expect } = require('chai');
const request = require('supertest');
const { Book, Genre, User } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  let genres;
  let users;

  before(async () => {
    await Book.sequelize.sync({ force: true });
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

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
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
        });

        expect(response.status).to.equal(201);

        const newBookRecord = await Book.findByPk(response.body.id, {
          include: ['genre', 'donator', 'owner'],
        });

        expect(newBookRecord.title).to.equal('title001');
        expect(newBookRecord.ISBN).to.equal('isbn001');
        expect(newBookRecord.author).to.equal('author001');
        expect(newBookRecord.releaseDate).to.equal('2023-01-31');
        expect(newBookRecord.donateDate).to.equal('2023-01-31');

        const genreRow = await Genre.findByPk(newBookRecord.genreId, {
          raw: true,
        });
        const donatorRow = await User.findByPk(newBookRecord.donatorId, {
          raw: true,
        });
        const ownerRow = await User.findByPk(newBookRecord.ownerId, {
          raw: true,
        });

        expect(newBookRecord.genre.genre).to.equal(genreRow.genre);
        expect(newBookRecord.donator.userName).to.equal(donatorRow.userName);
        expect(newBookRecord.owner.userName).to.equal(ownerRow.userName);
      });

      it('title must be exist', async () => {
        const response = await request(app).post('/books').send({
          ISBN: 'isbn001',
          author: 'author001',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'title must be existed'
        );
      });

      it('title must not be empty', async () => {
        const response = await request(app).post('/books').send({
          title: '',
          ISBN: 'isbn001',
          author: 'author001',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'title must not be empty'
        );
      });

      it('ISBN must be exist', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          author: 'author001',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'ISBN must be existed'
        );
      });

      it('ISBN must not be empty', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          ISBN: '',
          author: 'author001',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'ISBN must not be empty'
        );
      });

      it('author must be exist', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          ISBN: 'isbn001',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'author must be existed'
        );
      });

      it('author must not be empty', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          ISBN: 'isbn001',
          author: '',
          releaseDate: '2023-01-31',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'author must not be empty'
        );
      });

      it('release date must be exist', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          ISBN: 'isbn001',
          author: 'author001',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'release date must be existed'
        );
      });

      it('release date must not be empty', async () => {
        const response = await request(app).post('/books').send({
          title: 'title001',
          ISBN: 'isbn001',
          author: 'author001',
          releaseDate: '',
          image: '',
          donatorcomment: '',
          donateDate: '2023-01-31',
          genreId: genres[0].toJSON().id,
          donatorId: users[0].toJSON().id,
          ownerId: users[0].toJSON().id,
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'release date must not be empty'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
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

    describe('GET /books', () => {
      it('gets all books records', async () => {
        let genreRow;
        let donatorRow;
        let ownerRow;
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        for (const book of response.body) {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.ISBN).to.equal(expected.ISBN);
          expect(book.author).to.equal(expected.author);
          expect(book.releaseDate).to.equal(expected.releaseDate);
          expect(book.donateDate).to.equal(expected.donateDate);

          genreRow = await Genre.findByPk(expected.genreId, {
            raw: true,
          });
          donatorRow = await User.findByPk(expected.donatorId, {
            raw: true,
          });
          ownerRow = await User.findByPk(expected.ownerId, {
            raw: true,
          });

          expect(book.genre.genre).to.equal(genreRow.genre);
          expect(book.donator.userName).to.equal(donatorRow.userName);
          expect(book.owner.userName).to.equal(ownerRow.userName);
        }
      });
    });

    describe('POST /books/search', () => {
      it('gets all books records with selection', async () => {
        const response = await request(app)
          .post('/books/search')
          .send({ title: 'title002' });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);

        const book = response.body[0];

        expect(book.title).to.equal('title002');
        expect(book.ISBN).to.equal('isbn002');
        expect(book.author).to.equal('author002');
        expect(book.releaseDate).to.equal('2023-02-28');
        expect(book.donateDate).to.equal('2023-02-28');
        expect(book.genre.genre).to.equal('genre002');
        expect(book.donator.userName).to.equal('email002@gmail.com');
        expect(book.owner.userName).to.equal('email002@gmail.com');
      });
    });

    describe('GET /books/:id', () => {
      it('gets books record by id', async () => {
        const book = books[1];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.ISBN).to.equal(book.ISBN);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.releaseDate).to.equal(book.releaseDate);
        expect(response.body.donateDate).to.equal(book.donateDate);

        const genreRow = await Genre.findByPk(response.body.genreId, {
          raw: true,
        });
        const donatorRow = await User.findByPk(response.body.donatorId, {
          raw: true,
        });
        const ownerRow = await User.findByPk(response.body.ownerId, {
          raw: true,
        });

        expect(response.body.genre.genre).to.equal(genreRow.genre);
        expect(response.body.donator.userName).to.equal(donatorRow.userName);
        expect(response.body.owner.userName).to.equal(ownerRow.userName);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Books could not be found.');
      });
    });

    describe('PATCH /books/:id', () => {
      it('updates book fields by id', async () => {
        const book = books[1];
        const response = await request(app).patch(`/books/${book.id}`).send({
          title: 'new title',
          ISBN: 'new ISBN',
          author: 'new author',
          releaseDate: '2000-12-31',
        });

        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.title).to.equal('new title');
        expect(updatedBookRecord.ISBN).to.equal('new ISBN');
        expect(updatedBookRecord.author).to.equal('new author');
        expect(updatedBookRecord.releaseDate).to.equal('2000-12-31');
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).patch('/books/12345').send({
          title: 'new title',
          ISBN: 'new ISBN',
          author: 'new author',
          releaseDate: '2000-12-31',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Books could not be found.');
      });

      it('title must not be empty', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ title: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'title must not be empty'
        );
      });

      it('ISBN must not be empty', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ ISBN: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'ISBN must not be empty'
        );
      });

      it('author must not be empty', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ author: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'author must not be empty'
        );
      });

      it('release date must not be empty', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ releaseDate: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'release date must not be empty'
        );
      });

      it('genreId must be existed in Genres table', async () => {
        const book = books[1];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ genreId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });

      it('donatorId must be existed in Users table', async () => {
        const book = books[1];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ donatorId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });

      it('ownerId must be existed in Users table', async () => {
        const book = books[1];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ ownerId: 999 });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal(
          'SequelizeForeignKeyConstraintError'
        );
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes book record by id', async () => {
        const book = books[1];
        const response = await request(app).delete(`/books/${book.id}`);

        expect(response.status).to.equal(204);

        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(deletedBook).to.equal(null);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Books could not be found.');
      });
    });
  });
});
