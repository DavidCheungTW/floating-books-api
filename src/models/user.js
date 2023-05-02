module.exports = (sequelize, DataTypes) => {
  const schema = {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'first name must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'first name must not be empty',
        },
      },
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'last name must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'last name must not be empty',
        },
      },
    },
    userName: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: 'email must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'email must not be empty',
        },
      },
    },
    emailVerified: DataTypes.BOOLEAN,
    postalAddress: DataTypes.STRING,
  };

  return sequelize.define('User', schema);
};
