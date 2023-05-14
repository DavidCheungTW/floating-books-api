module.exports = (sequelize, DataTypes) => {
  const schema = {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
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
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'user name must be unique',
      },
      validate: {
        notNull: {
          args: [true],
          msg: 'user name must be existed',
        },
        notEmpty: {
          args: [true],
          msg: 'user name must not be empty',
        },
      },
    },
    postalAddress: DataTypes.STRING,
    verifyCode: DataTypes.STRING,
    emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  };

  return sequelize.define('User', schema);
};
