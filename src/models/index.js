const Sequelize = require('sequelize');
const GenreModel = require('./genre');
const UserModel = require('./user');
const BookModel = require('./book');
const FavouriteModel = require('./favourite');
const OrderModel = require('./order');

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
  const Order = OrderModel(connection, Sequelize);

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
    as: 'donator',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Book must have Donator' },
        notEmpty: { msg: 'Book must have Donator' },
      },
    },
  });

  Book.belongsTo(User, {
    as: 'owner',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Book must have Owner' },
        notEmpty: { msg: 'Book must have Owner' },
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

  Order.belongsTo(User, {
    as: 'user',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Order must have User' },
        notEmpty: { msg: 'Order must have User' },
      },
    },
  });

  Order.belongsTo(Book, {
    as: 'book',
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Order must have Book' },
        notEmpty: { msg: 'Order must have Book' },
      },
    },
  });

  connection.sync({ alter: true });
  return { Genre, User, Book, Favourite, Order };
};

module.exports = setupDatabase();
