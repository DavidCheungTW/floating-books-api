const Sequelize = require('sequelize');
const GenreModel = require('./genre');
const UserModel = require('./user');
const BookModel = require('./book');
const FavouriteModel = require('./favourite');
const RequestModel = require('./request');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
    logging: false,
  });

  const Genre = GenreModel(connection, Sequelize);
  const User = UserModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Favourite = FavouriteModel(connection, Sequelize);
  const Request = RequestModel(connection, Sequelize);

  Book.belongsTo(Genre, {
    as: 'genre',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Book must have Genre' },
        notEmpty: { msg: 'Book must have Genre' },
      },
    },
  });

  Book.belongsTo(User, {
    as: 'user',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Book must have Donator' },
        notEmpty: { msg: 'Book must have Donator' },
      },
    },
  });

  Favourite.belongsTo(User, {
    as: 'user',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Favourite must have User' },
        notEmpty: { msg: 'Favourite must have User' },
      },
    },
  });

  Favourite.belongsTo(Book, {
    as: 'book',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Favourite must have Book' },
        notEmpty: { msg: 'Favourite must have Book' },
      },
    },
  });

  Request.belongsTo(User, {
    as: 'user',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Request must have User' },
        notEmpty: { msg: 'Request must have User' },
      },
    },
  });

  Request.belongsTo(Book, {
    as: 'book',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Request must have Book' },
        notEmpty: { msg: 'Request must have Book' },
      },
    },
  });

  connection.sync({ alter: true });
  return { Genre, User, Book, Favourite, Request };
};

module.exports = setupDatabase();
