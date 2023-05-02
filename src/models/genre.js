module.exports = (sequelize, DataTypes) => {
  const schema = {
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'genre must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'genre must not be empty',
        },
      },
    },
  };

  return sequelize.define('Genre', schema);
};
