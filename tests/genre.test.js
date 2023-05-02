const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe('/genres', () => {
  before(async () => await Genre.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no record in the database', () => {
    describe('POST /genres', () => {
      it('creates a new genre in the database', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'genre001',
        });

        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal('genre001');

        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(newGenreRecord.genre).to.equal('genre001');
      });

      it('genre must be unique', async () => {
        await request(app).post('/genres').send({
          genre: 'genre999',
        });
        const response = await request(app).post('/genres').send({
          genre: 'genre999',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeUniqueConstraintError');
        expect(response.body.errors[0].message).to.equal(
          'genre must be unique'
        );
      });

      it('genre must not be empty', async () => {
        const response = await request(app).post('/genres').send({
          genre: '',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'genre must not be empty'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let genres;

    beforeEach(async () => {
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

    describe('GET /genres', () => {
      it('get all genres records', async () => {
        const response = await request(app).get('/genres');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((a) => a.id === genre.id);
          expect(genre.genre).to.equal(expected.genre);
        });
      });
    });

    describe('POST /genres/search', () => {
      it('gets all genres records with selection', async () => {
        const response = await request(app)
          .post('/genres/search')
          .send({ genre: 'genre002' });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe('GET /genres/:id', () => {
      it('gets genres record by id', async () => {
        const genre = genres[1];
        const response = await request(app).get(`/genres/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).get('/genres/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Genres could not be found.');
      });
    });

    describe('PATCH /genres/:id', () => {
      it('updates genres genre by id', async () => {
        const genre = genres[1];
        const response = await request(app)
          .patch(`/genres/${genre.id}`)
          .send({ genre: 'genre999' });

        expect(response.status).to.equal(200);

        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(updatedGenreRecord.genre).to.equal('genre999');
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app)
          .patch('/genres/12345')
          .send({ genre: 'genre999' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Genres could not be found.');
      });

      it('genre must not be empty', async () => {
        const genre = genres[1];
        const response = await request(app)
          .patch(`/genres/${genre.id}`)
          .send({ genre: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'genre must not be empty'
        );
      });
    });

    describe('DELETE /genres/:id', () => {
      it('deletes genre record by id', async () => {
        const genre = genres[1];
        const response = await request(app).delete(`/genres/${genre.id}`);

        expect(response.status).to.equal(204);

        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(deletedGenre).to.equal(null);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).delete('/genres/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Genres could not be found.');
      });
    });
  });
});
