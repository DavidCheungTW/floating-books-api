const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../src/models');
const app = require('../src/app');

describe('/users', () => {
  before(async () => await User.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('with no record in the database', () => {
    describe('POST /users', () => {
      it('creates a new user in the database', async () => {
        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: 'last name 001',
          userName: 'email001@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(201);
        expect(response.body.firstName).to.equal('first name 001');
        expect(response.body.lastName).to.equal('last name 001');
        expect(response.body.userName).to.equal('email001@gmail.com');
        expect(response.body.emailVerified).to.equal(true);
        expect(response.body.postalAddress).to.equal('postal address 001');

        const newUserRecord = await User.findByPk(response.body.id, {
          raw: true,
        });

        expect(newUserRecord.firstName).to.equal('first name 001');
        expect(newUserRecord.lastName).to.equal('last name 001');
        expect(newUserRecord.userName).to.equal('email001@gmail.com');
        expect(newUserRecord.emailVerified).to.equal(true);
        expect(newUserRecord.postalAddress).to.equal('postal address 001');
      });

      it('user name must be unique', async () => {
        await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: 'last name 001',
          userName: 'email001@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: 'last name 001',
          userName: 'email001@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeUniqueConstraintError');
        expect(response.body.errors[0].message).to.equal(
          'user name must be unique'
        );
      });

      it('first name must be provided', async () => {
        const response = await request(app).post('/users').send({
          lastName: 'last name 001',
          userName: 'email888@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'first name must be existed'
        );
      });

      it('first name must not be empty', async () => {
        const response = await request(app).post('/users').send({
          firstName: '',
          lastName: 'last name 001',
          userName: 'email888@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'first name must not be empty'
        );
      });

      it('last name must be provided', async () => {
        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          userName: 'email001@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'last name must be existed'
        );
      });

      it('last name must not be empty', async () => {
        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: '',
          userName: 'email001@gmail.com',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'last name must not be empty'
        );
      });

      it('user name must be provided', async () => {
        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: 'last name 001',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'user name must be existed'
        );
      });

      it('user name must not be empty', async () => {
        const response = await request(app).post('/users').send({
          firstName: 'first name 001',
          lastName: 'last name 001',
          userName: '',
          emailVerified: true,
          postalAddress: 'postal address 001',
        });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'user name must not be empty'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let users;

    beforeEach(async () => {
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

    describe('GET /users', () => {
      it('get all users records', async () => {
        const response = await request(app).get('/users');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((user) => {
          const expected = users.find((a) => a.id === user.id);

          expect(user.firstName).to.equal(expected.firstName);
          expect(user.lastName).to.equal(expected.lastName);
          expect(user.userName).to.equal(expected.userName);
          expect(user.emailVerified).to.equal(expected.emailVerified);
          expect(user.postalAddress).to.equal(expected.postalAddress);
        });
      });
    });

    describe('POST /users/search', () => {
      it('gets all users records with selection', async () => {
        const response = await request(app)
          .post('/users/search')
          .send({ userName: 'email002@gmail.com' });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe('GET /users/:id', () => {
      it('gets users record by id', async () => {
        const user = users[1];
        const response = await request(app).get(`/users/${user.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.firstName).to.equal(user.firstName);
        expect(response.body.lastName).to.equal(user.lastName);
        expect(response.body.userName).to.equal(user.userName);
        expect(response.body.emailVerified).to.equal(user.emailVerified);
        expect(response.body.postalAddress).to.equal(user.postalAddress);
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app).get('/users/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Users could not be found.');
      });
    });

    describe('PATCH /users/:id', () => {
      it('updates users user by id', async () => {
        const user = users[1];
        const response = await request(app)
          .patch(`/users/${user.id}`)
          .send({ userName: 'email999@gmail.com' });

        expect(response.status).to.equal(200);

        const updatedUserRecord = await User.findByPk(user.id, {
          raw: true,
        });

        expect(updatedUserRecord.userName).to.equal('email999@gmail.com');
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app)
          .patch('/users/12345')
          .send({ userName: 'email999@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Users could not be found.');
      });

      it('user name must not be empty', async () => {
        const user = users[1];
        const response = await request(app)
          .patch(`/users/${user.id}`)
          .send({ userName: '' });

        expect(response.status).to.equal(400);
        expect(response.body.name).to.equal('SequelizeValidationError');
        expect(response.body.errors[0].message).to.equal(
          'user name must not be empty'
        );
      });
    });

    describe('DELETE /users/:id', () => {
      it('deletes user record by id', async () => {
        const user = users[1];
        const response = await request(app).delete(`/users/${user.id}`);

        expect(response.status).to.equal(204);

        const deletedUser = await User.findByPk(user.id, { raw: true });

        expect(deletedUser).to.equal(null);
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app).delete('/users/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The Users could not be found.');
      });
    });
  });
});
