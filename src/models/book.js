module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: [true],
          msg: 'title must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'title must not be empty',
        },
      },
    },
    ISBN: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: [true],
          msg: 'ISBN must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'ISBN must not be empty',
        },
      },
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: [true],
          msg: 'author must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'author must not be empty',
        },
      },
    },
    releaseDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: {
          args: [true],
          msg: 'release date must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'release date must not be empty',
        },
      },
    },
    image: DataTypes.STRING,
    donatorcomment: DataTypes.STRING,
    donateDate: DataTypes.DATEONLY,
  };

  return sequelize.define('Book', schema);
};
